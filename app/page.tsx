import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import ProfileCard from "../components/ProfileCard";
import CloudPlayer from "../components/CloudPlayer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative pb-10">
      <Navbar />
      <PageTransition>
        <div className="w-full max-w-6xl mx-auto mt-28 px-4 lg:px-10">
          {/* 第一行：个人信息 + 播放器 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <ProfileCard postCount={0} />
            </div>
            <div className="lg:col-span-5">
              <CloudPlayer />
            </div>
          </div>

          {/* 第二行：文章列表 + 照片墙预览 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 h-full min-h-[300px] flex items-center justify-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm">文章列表区域（后续接入 Markdown 文章）</p>
              </div>
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
