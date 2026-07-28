"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ 
  isDark: true, 
  toggleTheme: () => {} 
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  //解决水合不匹配问题，避免引入mounted引发联级渲染
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("blog-theme") !== "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("blog-theme", newDark ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);