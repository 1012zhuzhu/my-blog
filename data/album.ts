export interface Photo { url: string; caption?: string; }
export interface Album { id: string; title: string; description: string; cover: string; date: string; photos: Photo[]; }

export const albums: Album[] = [
  {
    id: "album-1",
    title: "旅行相册",
    description: "记录每一次出发与抵达",
    cover: "https://cravatar.cn/avatar/b05fd41fd0da7f046b0e2a5188247696?s=200",
    date: "2025.10",
    photos: [
      { url: "https://cravatar.cn/avatar/b05fd41fd0da7f046b0e2a5188247696?s=200", caption: "风景 1" },
      { url: "https://cravatar.cn/avatar/b05fd41fd0da7f046b0e2a5188247696?s=200", caption: "风景 2" },
    ]
  }
];