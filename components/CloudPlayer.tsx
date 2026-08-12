"use client"
import { useEffect,useRef,useState } from "react"

const formatTime = (time: number) =>{
    if (!time || isNaN(time)) return "00:00"
    const m = Math.floor(time / 60).toString().padStart(2,'0');
    const s = Math.floor(time % 60).toString().padStart(2,'0');
    return `${m}:${s}`;
};

export default function CloudPlayer(){
    const playlist = [
        { title: "Die For You", artist: "Grabbitz", cover: "/images/preview-6.jpg", src: "https://music.163.com/song/media/outer/url?id=1974630461.mp3" },
        { title: "One Last Kiss", artist: "Sawako碎花 / Sawako碎花", cover: "/images/preview-4.jpg", src: "https://music.163.com/song/media/outer/url?id=1835122771.mp3" },
        { title: "Fallin' Out", artist: "TiTi", cover: "/images/preview-7.jpg", src: "https://music.163.com/song/media/outer/url?id=2616242025.mp3" },
        { title: "阳光下的星星", artist: "金海心", cover: "/images/preview-8.jpg", src: "https://music.163.com/song/media/outer/url?id=1353159923.mp3" },
    ];

    const [currentIndex,setCurrentIndex] = useState(0);
    const [isPlaying,setIsPlaying] = useState(false);
    const [currentTime,setCurrentTime] = useState(0);
    const [duration,setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentSong = playlist[currentIndex];
    const progress = duration ? (currentTime / duration) * 100 : 0 ;

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => setDuration(audio.duration);
        audio.addEventListener('timeupdate',updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        return () =>{
            audio.removeEventListener('timeupdate',updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        }
    },[currentIndex])

    const togglePlay = () =>{
        const audio = audioRef.current;
        if(!audio) return;
        if (isPlaying) audio.pause()
        else audio.play()
        setIsPlaying(!isPlaying)
    };

    const nextSong = () => setCurrentIndex((prev) => (prev + 1) % playlist.length);
    const prevSong = () => setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if(!audio || !duration) return;
        audio.currentTime = (Number(e.target.value) / 100) * duration;
    };
    
return(
      <>
        <audio src={currentSong.src}  ref={audioRef} onEnded={nextSong}
        />
        <style>
            {`input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: #6366f1; cursor: pointer;}`
            }</style>
              <div className="h-full w-full rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 flex flex-col justify-between transition-all duration-700 hover:scale-[1.02] relative overflow-hidden">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-20 h-20 rounded-full border-2 border-white/50 shadow-lg flex-shrink-0 overflow-hidden"
                    style={{ animation: isPlaying ? 'spin 6s linear infinite' : 'none' }}>
                    <img src={currentSong.cover} alt="cover" className="w-full h-full object-cover" />
                  </div>
                  <div className="overflow-hidden">
                  <span className="text-[10px] font-black text-indigo-500 tracking-widest uppercase">Cloud Music</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">{currentSong.title}</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{currentSong.artist}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-bold mb-3">
                <span className="w-10 text-right">{formatTime(currentTime)}</span>
                <input type="range" min="0" max="100" value={progress} onChange={handleSeek}
                  className="flex-1 h-1.5 bg-white/40 dark:bg-slate-700/50 rounded-full appearance-none outline-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #818cf8 ${progress}%, rgba(148,163,184,0.4) ${progress}%)` }}
                />
                <span className="w-10">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-center gap-6">
                <button onClick={prevSong} className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                </button>
                <button onClick={togglePlay} className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-600 hover:scale-110 transition-all">
                  {isPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
                <button onClick={nextSong} className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                </button>
              </div>
            </div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  )
}