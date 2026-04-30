'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import BottomNavBar from '@/components/BottomNavBar';
import { useMusic } from '@/context/MusicContext';

export default function Home() {
  const { currentTrack, isPlaying, togglePlay, playTrack } = useMusic();

  const handleHeroPlay = () => {
    // Play a default trending track if nothing is playing
    const trendingTrack = {
      id: "trending_hero",
      title: "Neon Nights",
      artist: "Synthwave Collective",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp343hviZbbNFe9JS7bXersVcMWJpagar2pWSqUKelxr_Dt-4ZQYWqrjjeyuYo0Yj5Ax8qj7RcmI6WyUhoSfRE1rZHEfnqMpmMJDaXAuBvn3a6hcS9iBsZKKaR_53KT3T212kMtGpdCYxWDpBe5AX71um4uOoys5UA4iwtNvif_PslCSoM69SUhHNpInwcVA-t4K6AvlRqu0MTME6ek0PTniWTDQPenSfo4yY53p9HYjCf_QUpgA1ExJO-2hnpD4ilBVCSzJ_MGOIL",
      url: "https://www.youtube.com/watch?v=3nQNiWdeH2Q" // NCS Classic as example
    };
    playTrack(trendingTrack);
  };

  const recommendedTracks = [
    { title: "Neon Nights", artist: "Synthwave Collective", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp343hviZbbNFe9JS7bXersVcMWJpagar2pWSqUKelxr_Dt-4ZQYWqrjjeyuYo0Yj5Ax8qj7RcmI6WyUhoSfRE1rZHEfnqMpmMJDaXAuBvn3a6hcS9iBsZKKaR_53KT3T212kMtGpdCYxWDpBe5AX71um4uOoys5UA4iwtNvif_PslCSoM69SUhHNpInwcVA-t4K6AvlRqu0MTME6ek0PTniWTDQPenSfo4yY53p9HYjCf_QUpgA1ExJO-2hnpD4ilBVCSzJ_MGOIL", url: "https://www.youtube.com/watch?v=3nQNiWdeH2Q" },
    { title: "Midnight Echoes", artist: "The Void Walkers", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVp28JKZHZiF3Dpc7V_RxEk53kEvAVLltYT0W35ueEHuOPXN7A4vnHqfD4xWtwWMlqT5dtm-xzfgP0wp6jIXC9xGkfB7oHBikXB0GBduXnlf9lk_8iAKPqnHQzMIkb-pzXISd3gCstoa9-Hcn4zs94TnY2MJIGo57yIqsVf9zwSBw22CHlnwhHWZ-INLe8EjhwuwZBNyFmZgRojZQzeEaullHJOgLOmnuVCt7UASRWxgsmVfLFVejJ1_iMj2e7SxQu3JYrLbsg4ceg", url: "https://www.youtube.com/watch?v=yJg-Y5byMMw" },
    { title: "Deep Bass Therapy", artist: "Subsonic Focus", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-EBFm6aCshar8QXrXkXdUj0GXj6cWq8JEcNtOznOccO6SuczeUYu03ZbZrwUwEmjYZ6uMXa9JAgl51kMrPbGqMdjIj1lIc49DqskS7ItIDtTG55nrs5dX6rSV2Pqukw5aCDaEQzTzk1at044h4EBGMNGQNDFKcHzVb31OCRhHZXWrcb3c5UAARfe4eRXFTT1OfTLsvij4vfvXHpHTg4Bso1yG2RcGqBAkQq-XVxjEB0vJ2so2LdC2dyq7MfQSW_8lFwh0gBLDEdRM", url: "https://www.youtube.com/watch?v=L7kF4MXXCoA" },
  ];

  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-x-hidden selection:bg-tertiary/30 selection:text-tertiary pb-32">
      {/* The Void (Base) Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary-container/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-tertiary-container/10 rounded-full blur-[150px]"
        />
      </div>

      {/* TopAppBar */}
      <header className="hidden md:flex fixed top-0 w-full z-50 justify-between items-center px-10 h-20 bg-[#1A1A1A]/60 backdrop-blur-[20px] border-b border-white/10">
        <div className="flex items-center gap-4">
          <button aria-label="Open menu" className="text-white/70 hover:text-tertiary transition-colors duration-300">
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        </div>
        <div className="text-2xl font-black text-white tracking-[0.2em] uppercase font-h1">PULSE</div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-white/10 relative">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw4py_YGhYrVXs4gLI4dREgczXVW5nnTUApD6ca10-JSjO0a6wC6jvAdExDjVopcO7ZYMs4NROdqh9E68Zlqnux9slh8fgIzTr5o1QgkPykpwtkY_pkddzFzu9_5Jrj5Y9nJrzKP-Ox9SyF2Iu4-5lS-Aa4fgWNe2YXQGHHLxLUAa6kp0_pgyuLHaPPW9h5iOLsiKIgxxesBuRMJ9AZV5j7NQfpTmWCvVWSgdCGUCdcKImSsry-GB-KmaEaya95J5OFcD3WnEbdFuW"
              alt="User Profile" fill priority sizes="40px" className="object-cover"
            />
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1440px] mx-auto px-6 md:px-10 pt-6 md:pt-[100px] flex flex-col gap-12">
        {/* Hero Section */}
        <section className="relative w-full rounded-[32px] overflow-hidden bg-[#1A1A1A]/60 backdrop-blur-[20px] border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 min-h-[400px] md:min-h-[500px]">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col items-start z-10"
          >
            <div className="px-3 py-1 rounded-full border border-tertiary/30 bg-tertiary/10 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_10px_rgba(0,226,147,0.8)]"></span>
              <span className="font-label-caps text-[12px] text-tertiary tracking-widest font-semibold">LIVE NOW</span>
            </div>
            <h1 className="text-on-surface mb-3 text-4xl md:text-6xl font-black uppercase">TRENDING WORLD HITS</h1>
            <p className="font-body-lg text-on-surface-variant mb-8 md:mb-12 max-w-[400px]">
              Feel the beat of the future. Dive into the most immersive audio experiences curated just for you.
            </p>
            <button 
              onClick={handleHeroPlay}
              className="w-full md:w-auto px-12 py-5 rounded-full bg-tertiary text-black font-bold tracking-widest shadow-[0_0_30px_rgba(0,226,147,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-[24px]">play_arrow</span>
              PLAY NOW
            </button>
          </motion.div>
          
          <div className="flex-1 relative w-full flex justify-center items-center z-10">
            <div className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-[24px] overflow-hidden border border-white/20 shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 relative">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGjoQXmgoT-RBSeFm0FNnLORuRLNyYdj5JS0UVrE8LyeXmXz3161NEaAx7mCCq12OtEvcayho_ue-ikJkQ62uLq9eZSI25uBrbb1Sm9si1DW0juvF22Lxq4mRJPbJdQwUeYldVMP-th88qzSiPcrVw851vHgtV8xS5VPq_3NFKo7P-lsL6ECDqMfFw0HsaRKCtw9H6l_-YiKVh5baXsJVCiiHiWE7A1pQGsNrsctoln20JBaW4Ov5yTYccq8qy1gWBUMzUJHjKuLJ7"
                alt="Hero Album Cover" fill priority sizes="(max-width: 768px) 300px, 400px" className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Recommended Slider */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl md:text-[32px] text-on-surface flex items-center gap-3 font-h3">
            <span className="material-symbols-outlined text-secondary">recommend</span>
            Recommended For You
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-hide">
            {recommendedTracks.map((track, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="min-w-[240px] md:min-w-[280px] snap-start group cursor-pointer"
                onClick={() => playTrack({ id: `rec_${i}`, ...track } as any)}
              >
                <div className="w-full aspect-square rounded-[24px] overflow-hidden relative mb-3 bg-[#1A1A1A]/60 backdrop-blur-2xl border border-white/10">
                  <Image src={track.img} alt={track.title} fill sizes="280px" className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="w-14 h-14 rounded-full bg-tertiary text-black flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {currentTrack?.title === track.title && isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-on-surface truncate">{track.title}</h3>
                <p className="text-on-surface-variant truncate">{track.artist}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mood Section */}
        <section className="flex flex-col gap-6 pb-20">
          <h2 className="text-2xl md:text-[32px] text-on-surface flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">mood</span>
            Based on Your Mood
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Chill", icon: "self_improvement", color: "secondary", q: "chill lofi music" },
              { label: "Focus", icon: "bolt", color: "tertiary", q: "deep focus ambient" },
              { label: "Energy", icon: "local_fire_department", color: "error", q: "high energy edm" },
            ].map((mood, i) => (
              <Link key={i} href={`/discover?q=${encodeURIComponent(mood.q)}`}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="h-[120px] md:h-[160px] rounded-[24px] bg-[#1A1A1A]/60 backdrop-blur-2xl border border-white/10 p-6 flex flex-col justify-end relative overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-tr from-${mood.color}/20 to-transparent`} />
                  <span className={`material-symbols-outlined absolute top-6 right-6 text-${mood.color}/50 text-[40px] group-hover:scale-110 transition-transform`}>
                    {mood.icon}
                  </span>
                  <h3 className="text-3xl md:text-[48px] text-on-surface z-10">{mood.label}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Mini Player Bar */}
      {currentTrack && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-[90px] md:bottom-6 left-0 right-0 z-40 px-6 max-w-[1000px] mx-auto">
          <div className="bg-[#1A1A1A]/90 backdrop-blur-2xl border border-white/10 rounded-[24px] p-3 flex flex-col gap-2 shadow-2xl">
            <div className="flex items-center justify-between px-1">
              <Link href="/player" className="flex items-center gap-3 flex-1 overflow-hidden">
                <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0">
                  <Image src={currentTrack.thumbnail} alt={currentTrack.title} fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-bold text-on-surface text-sm truncate">{currentTrack.title}</span>
                  <span className="text-on-surface-variant text-xs truncate">{currentTrack.artist}</span>
                </div>
              </Link>
              <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="w-11 h-11 rounded-full bg-tertiary text-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <BottomNavBar />
    </div>
  );
}
