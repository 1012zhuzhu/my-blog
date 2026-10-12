"use client";
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import PageTransition from '../../components/PageTransition';
import { albums, Album, Photo } from '../../data/albums';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Image as ImageIcon } from 'lucide-react';

export default function PhotoWall() {
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative pb-32">
      <Navbar />
      <PageTransition>
        <div className="w-full max-w-7xl mx-auto mt-28 px-4 sm:px-10 relative z-10">
          {!currentAlbum && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-widest mb-2">光影画廊</h1>
                  <p className="text-slate-600 dark:text-slate-400 font-medium tracking-wider">定格时间，封存每一次心跳</p>
                </div>
                <div className="relative w-full md:w-80">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text" placeholder="搜索相册..."
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-full text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mt-10">
                {filteredAlbums.map((album) => (
                  <div key={album.id} className="group cursor-pointer flex flex-col items-center" onClick={() => setCurrentAlbum(album)}>
                    <div className="relative w-[85%] aspect-[4/3] mb-8">
                      <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 rounded-[4px] shadow-md transform rotate-6 translate-x-4 translate-y-2 group-hover:rotate-12 transition-all duration-500 border-[6px] border-white dark:border-slate-200 overflow-hidden opacity-60">
                        {album.photos[2] && <img src={album.photos[2].url} className="w-full h-full object-cover grayscale blur-[2px]" alt="" />}
                      </div>
                      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-600 rounded-[4px] shadow-lg transform -rotate-3 -translate-x-2 -translate-y-1 group-hover:-rotate-6 transition-all duration-500 border-[6px] border-white dark:border-slate-200 overflow-hidden opacity-80 z-10">
                        {album.photos[1] && <img src={album.photos[1].url} className="w-full h-full object-cover grayscale-[50%]" alt="" />}
                      </div>
                      <div className="absolute inset-0 bg-white dark:bg-slate-200 rounded-[4px] shadow-2xl border-[6px] border-white dark:border-slate-200 overflow-hidden z-20 transform group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500">
                        <img src={album.cover} alt={album.title} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="text-center px-4 w-full">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{album.title}</h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">{album.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentAlbum && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 border-b border-slate-300/50 dark:border-slate-700/50 pb-6">
                <div>
                  <button onClick={() => setCurrentAlbum(null)} className="group flex items-center gap-1.5 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-500 mb-4 transition-colors">
                    <div className="bg-white/40 dark:bg-slate-800/50 p-1.5 rounded-lg border border-white/50 shadow-sm"><X size={16} /></div> 返回画廊
                  </button>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-wider mb-2">{currentAlbum.title}</h1>
                </div>
              </div>

              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                {currentAlbum.photos.map((photo, index) => (
                  <div key={index} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-lg bg-white/20 dark:bg-slate-800/20 border border-white/30 dark:border-white/10 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                    onClick={() => setSelectedImage(photo)}
                  >
                    <img src={photo.url} alt="" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" />
                    {photo.caption && <div className="p-4 bg-white/30 dark:bg-black/20 backdrop-blur-sm text-xs font-bold dark:text-slate-200">{photo.caption}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PageTransition>

      {/* 全屏灯箱 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-10 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"><X size={24} /></button>
            <img src={selectedImage.url} alt="全屏照片" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
            {selectedImage.caption && <div className="absolute bottom-10 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white text-sm font-medium tracking-wide">{selectedImage.caption}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}