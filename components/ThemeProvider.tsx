"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<{
  isDark: boolean | undefined;
  toggleTheme: () => void;
}>({ isDark: undefined, toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem("blog-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(stored === "dark" || (!stored && systemDark));
  }, []);

  useEffect(() => {
    if (isDark === undefined) return;
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("blog-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);