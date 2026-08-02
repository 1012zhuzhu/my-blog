"use client"
import { useTheme } from "./ThemeProvider";
import Fireflies from "./Fireflies";
import Sakura from "./Sakura";
import { useState , useEffect } from "react";

export default function BackgroundEffects(){
    const {isDark} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
    return (
        <>
            <div className="transition-opacity duration-1000 opacity-100">
            <Fireflies />
            </div>
            <div className="transition-opacity duration-1000 opacity-0" />
        </>
        );
    }
    return(
        <>
            <div className={`transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'} `}>
                <Fireflies/>
            </div>
            <div className={`transition-opacity duration-1000 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
                <Sakura/>
            </div>
        </>
    )
}