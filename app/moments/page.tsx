import Navbar from "../../components/Navbar";
import PageTransition from "../../components/PageTransition";
import { MessageCircleMore } from "lucide-react";

export const metadata = {
  title: "说说",
};

export default function MomentsPage() {
  return (
    <div className="min-h-screen relative pb-20">
      <Navbar />
      <PageTransition>
        <main className="w-[90%] max-w-4xl mx-auto mt-28 md:mt-32 relative z-10">
          <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-white/10 p-10 md:p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
              <MessageCircleMore size={36} className="text-teal-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
              生活说说
            </h1>
            <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              随手记录的生活碎片正在收集，敬请期待...
            </p>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
