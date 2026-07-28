import { ThemeProvider } from "../components/ThemeProvider";
import BackgroundEffects from "../components/BackgroundEffects";
import { siteConfig } from "../siteConfig";
import BackgroundSlider from "@/components/BackgroundSlider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="w-screen overflow-x-hidden min-h-full flex flex-col relative
        bg-slate-50 dark:bg-slate-950 transition-colors duration-1000">
        <ThemeProvider>
          {/* 背景层：fixed 定位，z-index 最低 */}
          <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {/* 背景图片轮播（见下文组件） */}
            {!siteConfig.useGradient && <BackgroundSlider />}
            
            {/* 全局毛玻璃遮罩 */}
            <div className="absolute inset-0 z-[-9] 
              bg-white/30 dark:bg-slate-900/40 backdrop-blur-md" />
            
            {/* 呼吸渐变层 */}
            <div className="absolute inset-0 z-[-8] opacity-60 dark:opacity-20"
              style={{
                background: `linear-gradient(-45deg, ${siteConfig.themeColors.join(', ')})`,
                backgroundSize: '400% 400%',
                animation: 'gradientMove 15s ease infinite'
              }} />
            
            {/* 光晕效果 */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] 
              bg-white/40 dark:bg-indigo-900/20 blur-[100px] rounded-full z-[-7]" />
            
            {/* 粒子特效（PC端显示） */}
            <div className="hidden md:block">
              <BackgroundEffects />
            </div>
          </div>

          {/* 页面内容 */}
          <div className="relative z-10 flex-1 flex flex-col">
            {children}
          </div>
        </ThemeProvider>
        
        <style>{`
          @keyframes gradientMove { 
            0% { background-position: 0% 50%; } 
            50% { background-position: 100% 50%; } 
            100% { background-position: 0% 50%; } 
          }
        `}</style>
      </body>
    </html>
  );
}