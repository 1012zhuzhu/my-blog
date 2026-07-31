import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import BackgroundEffects from "../components/BackgroundEffects";
import { siteConfig } from "../siteConfig";
import BackgroundSlider from "@/components/BackgroundSlider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full" suppressHydrationWarning>
      <body className="w-full overflow-x-hidden min-h-dvh flex flex-col relative bg-slate-50 dark:bg-slate-950 transition-colors duration-1000">
        <ThemeProvider>
          {/* 背景层 */}
          <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {!siteConfig.useGradient ? <BackgroundSlider /> : null}

            <div className="absolute inset-0 z-[-9] bg-white/30 dark:bg-slate-900/40 backdrop-blur-md" />

            <div
              className="absolute inset-0 z-[-8] opacity-60 dark:opacity-20"
              style={{
                background: `linear-gradient(-45deg, ${siteConfig.themeColors.join(", ")})`,
                backgroundSize: "400% 400%",
                animation: "gradientMove 15s ease infinite",
              }}
            />

            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/40 dark:bg-indigo-900/20 blur-[100px] rounded-full z-[-7]" />

            <div className="hidden md:block absolute inset-0 w-full h-full">
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
