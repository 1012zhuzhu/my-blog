import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'highlight.js/styles/atom-one-dark.css';

// 1. 生成所有可能的路由参数（SSG 需要）
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames
    .filter(name => name.endsWith('.md'))
    .map(name => ({ slug: name.replace(/\.md$/, '') }));
}

// 2. 解析 Markdown 为 HTML
async function getPostData(slug: string) {
  const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)        // Markdown → AST
    .use(remarkGfm)          // 支持表格、删除线等 GitHub 风格
    .use(remarkMath)         // 支持 LaTeX 公式
    .use(remarkRehype, { allowDangerousHtml: true })  // AST → HTML AST
    .use(rehypeHighlight, {  // 代码高亮
      detect: true,
      ignoreMissing: true,
      subset: ['javascript', 'typescript', 'python', 'cpp', 'bash']
    })
    .use(rehypeKatex)        // 渲染数学公式
    .use(rehypeStringify, { allowDangerousHtml: true })  // HTML AST → 字符串
    .process(content);

  return {
    slug,
    contentHtml: processedContent.toString(),
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    cover: data.cover,
  };
}

// 3. 页面组件
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <div className="min-h-screen relative pb-20">
      <Navbar />
      <PageTransition>
        <main className="w-[90%] max-w-6xl mx-auto mt-28 flex flex-col lg:flex-row gap-8">
          
          {/* 文章主体 */}
          <article className="flex-1 bg-white/60 dark:bg-slate-800/50 
            backdrop-blur-xl rounded-3xl shadow-2xl 
            border border-white/40 dark:border-white/10">
            
            {/* 封面图 */}
            <div className="w-full aspect-video relative overflow-hidden rounded-t-3xl">
              <img src={postData.cover} className="w-full h-full object-cover" />
            </div>
            
            {/* 文章内容 */}
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {postData.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700">
                  {postData.date}
                </span>
                {postData.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-700">
                    #{tag}
                  </span>
                ))}
              </div>
              
              {/* 核心：dangerouslySetInnerHTML 渲染 Markdown HTML */}
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
              />
            </div>
          </article>
          
          {/* 右侧目录（可选） */}
          <aside className="hidden lg:block w-64">
            <div className="sticky top-28 ...毛玻璃卡片样式...">
              <h3 className="font-bold mb-4">目录</h3>
              {/* TOC 内容 */}
            </div>
          </aside>
          
        </main>
      </PageTransition>
    </div>
  );
}