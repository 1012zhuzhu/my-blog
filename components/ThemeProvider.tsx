"use client"
import { createContext,useContext,useEffect,useState } from "react";

const ThemeContext = createContext({
    isDark:true,
    toggleTheme: () => {}
});

export function ThemeProvider({children}:{children:React.ReactNode}) {
    const [isDark,setIsDark] = useState(true);
    const [mounted,setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
        const saveTheme = localStorage.getItem('blog-theme');
        const isDarkMode = saveTheme !== 'light';
        setIsDark(isDarkMode)

        const root = document.documentElement;
        if (isDarkMode) root.classList.add('dark');
    },[])
    
    useEffect(()=>{
        if (!mounted)return;
        const root = document.documentElement;
        if (isDark) root.classList.add('dark');
        else root.classList.remove('dark');
    },[isDark,mounted]);

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        localStorage.setItem('blog-theme',newDark ? 'dark' : 'light');
    };
    if (!mounted) return <div className="invisible">{children}</div>;
    return(
        <Themecontext.Provider value={{isDark,toggleTheme}}>
             {{children}}
        </Themecontext>
    )
}
export const useThemeContext = useContext(Themecontext)