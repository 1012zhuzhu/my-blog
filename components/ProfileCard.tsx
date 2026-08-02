"use client";
import { useRouter } from 'next/navigation';
import { siteConfig } from '../siteConfig';

export default function ProfileCard({ postCount }: {postCount : number}) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push('/about')}
            className="rounded-3xl bg-white/40 dark:bg-slate-800/50
                backdrop-blur-md border border-white/40 dark:border-white/10
                shadow-xl p-6 md:p-8 flex flex-col justify-between
                transition-all duration-700 hover:scale-[1.01] cursor-pointer
                group relative overflow-hidden h-full min-h-[280px]"
        >
            <div className="flex items-center gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl
                    bg-linear-to-tr from-indigo-500 to-purple-500 p-1 shadow-lg">
                    <img src={siteConfig.avatarUrl}
                        className="w-full h-full rounded-xl object-cover bg-white" />
                </div>
                <div>
                    <h1 className='text-2xl md:text-3xl font-bold text-slate-900 dark:text-white'>
                        {siteConfig.authorName}
                    </h1>
                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300">
                        {siteConfig.bio}
                    </p>
                </div>
            </div>

            <div className="flex gap-6 mt-8">
                <div className='text-center'>
                    <div className='text-2xl font-black text-indigo-600 dark:text-indigo-400'>
                        {postCount}
                    </div>
                    <div className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
                        文章
                    </div>
                </div>
            </div>
        </div>
    )
}