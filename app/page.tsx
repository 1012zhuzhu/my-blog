import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import PageTransition from '@/components/PageTransition';
import CloudPlayer from '@/components/CloudPlayer';
import LatestPostsCarousel from '@/components/LatestPostsCarousel';
import BackgroundSlider from '@/components/BackgroundSlider';
import { siteConfig } from '../siteConfig';


export default function Home() {
  // 1. 读取 posts 目录下的所有 Markdown 文件
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));
  
  const allPosts = fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName);
    const { data } = matter(fs.readFileSync(fullPath, 'utf8'));
    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title,
      description: data.description,
      date: data.date,
      cover: data.cover || siteConfig.defaultPostCover,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen relative pb-10">
      <Navbar />
      
      {/* 页面过渡动画包裹 */}
      <PageTransition>
        <div className="w-full max-w-6xl mx-auto mt-28 px-4 lg:px-10">
          
          {/* 第一行：个人信息 + 播放器 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <ProfileCard postCount={allPosts.length} />
            </div>
            <div className="lg:col-span-5">
              <CloudPlayer />
            </div>
          </div>
          
          {/* 第二行：文章轮播 + 照片墙 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-4">
              <LatestPostsCarousel posts={allPosts.slice(0, 5)} />
            </div>
            <div className="lg:col-span-8">
              {/* 照片墙海报 */}
              <Link href="/photowall" className="...毛玻璃卡片样式...">
                <img src={siteConfig.photoWallImage} className="..." />
              </Link>
            </div>
          </div>
          
        </div>
      </PageTransition>
    </div>
  );
}