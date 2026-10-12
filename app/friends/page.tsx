import Navbar from '../../components/Navbar';
import PageTransition from '../../components/PageTransition';
import { friends } from '../../data/friends';

export default function FriendsPage() {
  return (
    <div className="min-h-screen relative pb-20">
      <Navbar />
      <PageTransition>
        <div className="w-full max-w-6xl mx-auto mt-28 px-4">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-12 text-center">友情链接</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <a key={friend.link} href={friend.link} target="_blank" rel="noopener noreferrer"
                className="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 flex items-center gap-4 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                <img src={friend.avatar} alt={friend.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{friend.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{friend.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </PageTransition>
    </div>
  );
}