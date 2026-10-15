import Link from "next/link";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";

export default function NotFound() {
  return (
    <div className="min-h-screen relative pb-20">
      <Navbar />
      <PageTransition>
        <main className="w-[90%] max-w-2xl mx-auto mt-32 md:mt-40 text-center relative z-10">
          <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-white/10 p-10 md:p-16">
            <h1 className="text-6xl md:text-8xl font-black text-indigo-500 mb-4 tracking-tighter">404</h1>
            <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2">
              页面不存在
            </p>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-8">
              你好像迷路了... 这里什么都没有哦
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-full bg-indigo-500 text-white font-bold text-sm shadow-lg hover:bg-indigo-600 transition-all duration-300 hover:scale-105"
            >
              返回首页
            </Link>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
