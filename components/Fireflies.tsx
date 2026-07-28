"use client"
import { useEffect,useState } from "react";

interface Firefly {
    id: number;
    top: string; 
    left: string;
    size: number;
    breatheDuration: number;
    floatDuration: number;
    floatPath: string;
}

export default function Fireflies(){
    const [flies,setFlies] = useState<Firefly[]>([]);

    useEffect(() => {
    const generated: Firefly[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 3 + Math.random() * 4,
      breatheDuration: 3 + Math.random() * 5,   // 呼吸闪烁周期
      floatDuration: 15 + Math.random() * 20,   // 漂浮周期
      floatPath: `float${Math.floor(Math.random() * 4) + 1}`,
    }));
    setFlies(generated);
  }, []);


       
    
    return(
        <div className="fixed inset-0 w-full h-full pointer-events-none z-10 mis-blend-screen">
            <style>{
                `
                @keyframes fireflyBreathe {
                0%, 100% { opacity: 0; transform: scale(0.3); }
                50% { opacity: 1; transform: scale(1.2); 
                    box-shadow: 0 0 10px 3px rgba(100, 255, 150, 0.8); }
                }
                @keyframes float1 {
                0%, 100% { transform: translate(0, 0); }
                33% { transform: translate(10vw, -15vh); }
                66% { transform: translate(-5vw, -20vh); }
                }
                /* float2, float3, float4 类似... */
            `}
            </style>

            {flies.map(fly => (
                <div key={fly.id} className="absolute"
                style={{
                    top: fly.top,
                    left: fly.left,
                    animation: `${fly.floatPath} ${fly.floatDuration}s ease-in-out infinite`,
                }}>
                <div className="rounded-full"
                    style={{
                        width: fly.size,
                        height: fly.size,
                        backgroundColor: 'rgba(200, 255, 200, 0.9)',
                        animation: `fireflyBreathe ${fly.breatheDuration}s ease-in-out infinite`,
                    }} />
                </div>
                ))}
        </div>
    )
}