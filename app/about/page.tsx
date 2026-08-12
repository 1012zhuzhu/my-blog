import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm'; // 🌟 引入 GFM 以支持 ~~删除线~~
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

// 引入高亮主题
import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';

import Navbar from '../../components/Navbar';
import PageTransition from '../../components/PageTransition';
import { Children, Suspense } from 'react';
import AboutClient from '@/components/AboutClient';

function getDirActivties(dirname: string,typeLabel: '文章'| '杂谈' | '说说', linkPrefix: string){
    const getPath = path.join(process.cwd(), dirname);
    if (!fs.existsSync(getPath)) return []
    const files = fs.readdirSync(getPath).filter(file => file.endsWith('.md'))

    return files.map(file => {
        const content = fs.readFileSync(path.join(getPath,file) ,'utf8');
        const {data} = matter(content);

        return {
            id: `${dirname}-${file}`,
            type: typeLabel,
            title : data.title ||  file.replace('.md', ''),
            date: data.data ? new Date(data.date).toISOString() : '1970-01-01T00:00:00Z',
            url: `/${linkPrefix}/${file.replace('.md', '')}`
        }
    })
}

export default async function AboutPage(){
    const allPath = path.join(process.cwd(),'app','about','about.md');
    let contentHtml = '博主要努力上进了'
    let converImage = "/images/preview.gif"

    try{
        const fileContents =fs.readFileSync(allPath,'utf8')
        let { data, content} = matter(fileContents)
        if(data.cover) converImage = data.cover

        content = content.replace(/^```\s*$/gm,'```cpp');

        content = content.replace(/^(\s*\d+)\.([^ \n])/gm, '$1. $2');

        content = content.replace(/\r\n/g, '\n').replace(/^[ \t]+$/gm, '');

        const blocks = content.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g);
        content = blocks.map((block, index) => {
            if(index%2 === 1) return block;
            return block.replace(/\n{3,}/g,(match) => {
                const brCount = match.length-2;
                return '\n\n' + '<br>'.repeat(brCount) + '\n\n'
            });
        }).join('');

        const processedContent = await unified()
            .use(remarkParse)
            .use(remarkGfm) // 🌟 挂载 GFM 解析
            .use(remarkMath)
            .use(remarkRehype, { allowDangerousHtml: true })
            // 🌟 核心修复：开启自动语言侦测，并限制语言白名单！
            .use(rehypeHighlight, {
                detect: true,
                ignoreMissing: true,
                subset: ['cpp', 'c', 'python', 'java', 'javascript', 'typescript', 'go', 'rust', 'bash', 'json', 'html', 'css', 'sql', 'xml']
            })
            .use(rehypeKatex)
            .use(rehypeStringify, { allowDangerousHtml: true })
            .process(content);

            contentHtml = processedContent.toString();
        } catch (e) {
            console.error("读取 about.md 失败", e);
        }

        const posts = getDirActivties('posts', '文章', 'posts');
        const chatters = getDirActivties('chatters', '杂谈', 'chatter');
        const moments = getDirActivties('moments', '说说', 'moments');

        const allActivities = [...posts, ...chatters, ...moments].sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return (
            <div className='min-h-screen relative pb-20'>
                <Navbar/>
                <PageTransition>
                    <main className='w-[95%] md:w-[90%] max-w-4xl mx-auto mt-24 md:mt-28 relative z-10'>

                    <Suspense
                        fallback={
                            <div className="h-96 flex items-center justify-center text-slate-500 font-bold animate-pulse">
                            正在载入档案...
                            </div>
                        }
                    >
                        {/* ✅ 核心改动：包一层 prose-jelly */}
                        <article className="prose prose-jelly dark:prose-invert max-w-none">
                             <AboutClient
                                contentHtml={contentHtml}
                                coverImage={converImage}
                                activities={[]}
                                />
                        </article>
                    </Suspense>

                    </main>
                </PageTransition>
            </div>
        )
}