import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import ProfileCard from "../components/ProfileCard";
import CloudPlayer from "../components/CloudPlayer";
import path from "path"; 
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { siteConfig } from "@/siteConfig";
import  LatestPostsCarousel  from "@/components/LatestPostsCarousel";
import { title } from "process";

function formatUpdateTime(date:string){
  if (!date || date==='1970-01-01') return "处于更新中"
  try{
    const d = new Date(date)
    if(isNaN(d.getTime())) return date
    const year = d.getFullYear()
    const month = String(d.getMonth()).padStart(2,"0")
    const day = String(d.getDate()).padStart(2,"0")
    const hour = String(d.getHours()).padStart(2,"0")
    const min = String(d.getMinutes()).padStart(2,"0")
    if (hour==="0"&&min==="0") return `${year}-${month}-${day}`
    else return `${year}-${month}-${day}-${hour}-${min}`
  }catch(err:unknown){
    console.log("时间错误",(err as Error).message);
    
  }
}

export default function Home() {
  const postDirectory = path.join(process.cwd(),'posts');
  let allPosts : unknown[] = []

  try{
    if (fs.existsSync(postDirectory)) {
      const posts = fs.readdirSync(postDirectory).filter(file => file.endsWith('.md'))
      allPosts = posts.map(post =>{
        const fullPath = path.join(postDirectory,post);
        const {data,content} = matter(fs.readFileSync(fullPath,"utf-8"))
        const rawDate = data.date || '1970-01-01';
        return{
          slug:post.replace(/\.md$/, ''),
          ...data,
          title: data.title||'',
          date: rawDate,
          description: data.description || '',
          content: content||'',
          formatdate: formatUpdateTime(rawDate),
        }
      }).sort((a, b) => {
        const Datea = new Date(a.date).getTime();
        const Dateb = new Date(b.date).getTime();
        if (Datea !== Dateb) return Dateb-Datea;
        else return b.slug.localeCompare(a.slug);
      })
    }
  }catch (err:unknown){
    console.log("捕捉文章出现了问题",(err as Error).message);
  }
  
  const rightPosts = allPosts.length > 0 ? allPosts.slice(0, 5) : [{ slug: 'none', title: '出问题了哦', description: '快去写第一篇吧！', cover: siteConfig.defaultPostCover, date: '', formattedDate: '' }];


  return (
    <div className="min-h-screen relative pb-10">
      <Navbar />
      <PageTransition>
        <div className="w-full max-w-6xl mx-auto mt-28 px-4 lg:px-10">
          {/* 第一行：个人信息 + 播放器 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <ProfileCard postCount={2} />
            </div>
            <div className="lg:col-span-5">
              <CloudPlayer />
            </div>
          </div>

          {/* 第二行：文章列表 + 照片墙预览 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">

          <div className="col-span-1 lg:col-span-4 flex flex-col min-h-[300px]">
            <LatestPostsCarousel posts={rightPosts} />
          </div>  

            <div className="lg:col-span-8">
              <Link
                href="/photowall"
                className="block w-full h-full min-h-[300px] rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden transition-all duration-700 hover:scale-[1.02] relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">照片墙</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">点击查看相册 →</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
