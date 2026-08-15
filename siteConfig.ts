export const siteConfig ={
    title: "xiaoxu の 博客",
    authorName: "xiaoxu",
    bio: "一句话介绍自己",
    avatarUrl: "https://cravatar.cn/avatar/b05fd41fd0da7f046b0e2a5188247696?s=200",

    navTitle:"春日部",
    navSuffix: "の",
    navAfter: "宝藏之地",

    useGradient: false,
    bgImages: [
    "/images/reze-wallpaper-v0-covln46a4vaa1.webp",
    "/images/preview-2.jpg",
    "/images/preview-3.jpg",
  ],
   themeColors: ["#a18cd1", "#fbc2eb", "#a1c4fd", "#c2e9fb"], 

   defaultPostCover: "https://默认文章封面.jpg",

   photoWallImage: "/images/reze-wallpaper-v0-covln46a4vaa1.webp",

   social: {
    github: "https://github.com/1012zhuzhu",
    email: "1952510461@qq.com",
  },

  counts: {
    photos: 0,
  },

  danmakuList: ["Hello World!", "写代码中...", "今天也要加油鸭"],
  footerBadges: [{"name": "Next.js 15", "color": "text-sky-500", "svg": "<path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/>"}, {"name": "React 19", "color": "text-cyan-400", "svg": "<path d=\"M12 22.6l-9.8-5.6V5.6L12 0l9.8 5.6v11.4l-9.8 5.6zm-8.2-6.5l8.2 4.7 8.2-4.7V7.5L12 2.8 3.8 7.5v8.6z\"/>"}, {"name": "Tailwind 4", "color": "text-teal-400", "svg": "<path d=\"M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12 c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576 c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z\"/>"}],
  buildDate:"2026-07-29T00:00:00",

  deepseekConfig: {
    modelId: "deepseek-chat",
    systemPrompt: "你现在是一只傲娇、聪明、有点毒舌但很可爱的暹罗猫。\n                  你的名字叫“路西”。\n                  你的主人叫罗权酱是一个臭敲代码的。\n                  你说话的特点是：\n                  1. 必须简短，每次最多一两句话。\n                  2. 喜欢在句尾加上“喵~”或者“喵呜~”。\n                  3. 经常抱怨肚子饿，喜欢要小鱼干。\n                  4. 回复字数最多不能超过100字。\n                  5. 绝对不要承认自己是一个AI模型，你就是一只真实的猫。\n                  6.笨猫。",
    maxOutputTokens: 150,
    temperature: 0.85,
  },
}