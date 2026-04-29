'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-x-hidden selection:bg-tertiary/30 selection:text-tertiary pb-32">
      {/* The Void (Base) Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary-container/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-tertiary-container/10 rounded-full blur-[150px]"
        />
      </div>

      {/* TopAppBar (Web Only) */}
      <header className="hidden md:flex fixed top-0 w-full z-50 justify-between items-center px-10 h-20 bg-[#1A1A1A]/60 backdrop-blur-[20px] border-b border-white/10">
        <div className="flex items-center gap-4">
          <button className="text-white/70 hover:text-tertiary transition-colors duration-300">
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        </div>
        <div className="text-2xl font-black text-white tracking-[0.2em] uppercase font-h1">
          PULSE
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-white/10 relative">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw4py_YGhYrVXs4gLI4dREgczXVW5nnTUApD6ca10-JSjO0a6wC6jvAdExDjVopcO7ZYMs4NROdqh9E68Zlqnux9slh8fgIzTr5o1QgkPykpwtkY_pkddzFzu9_5Jrj5Y9nJrzKP-Ox9SyF2Iu4-5lS-Aa4fgWNe2YXQGHHLxLUAa6kp0_pgyuLHaPPW9h5iOLsiKIgxxesBuRMJ9AZV5j7NQfpTmWCvVWSgdCGUCdcKImSsry-GB-KmaEaya95J5OFcD3WnEbdFuW"
              alt="User Profile"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1440px] mx-auto px-10 pt-6 md:pt-[100px] flex flex-col gap-12">
        {/* Hero Section */}
        <section className="relative w-full rounded-[32px] overflow-hidden bg-[#1A1A1A]/60 backdrop-blur-[20px] border border-white/10 p-12 flex flex-col md:flex-row items-center justify-between gap-20 min-h-[500px]">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-start z-10"
          >
            <div className="px-3 py-1 rounded-full border border-tertiary/30 bg-tertiary/10 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_10px_rgba(0,226,147,0.8)]"></span>
              <span className="font-label-caps text-[12px] text-tertiary tracking-widest font-semibold">LIVE NOW</span>
            </div>
            <h1 className="text-on-surface mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              TRENDING WORLD HITS
            </h1>
            <p className="font-body-lg text-on-surface-variant mb-12 max-w-[400px]">
              Feel the beat of the future. Dive into the most immersive audio experiences curated just for you.
            </p>
            <button className="px-20 py-6 rounded-full bg-surface-container/60 backdrop-blur-md border border-tertiary text-tertiary font-label-caps text-[12px] tracking-widest font-semibold shadow-[0_0_30px_rgba(0,226,147,0.3)] hover:shadow-[0_0_40px_rgba(0,226,147,0.5)] transition-all duration-300 flex items-center gap-3 group">
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">play_arrow</span>
              PLAY NOW
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative w-full flex justify-center items-center z-10 h-full"
          >
            <div className="absolute w-[80%] aspect-square bg-secondary/20 rounded-full blur-[80px] -z-10"></div>
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-[24px] overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-[-2deg] hover:rotate-0 transition-transform duration-500 relative">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGjoQXmgoT-RBSeFm0FNnLORuRLNyYdj5JS0UVrE8LyeXmXz3161NEaAx7mCCq12OtEvcayho_ue-ikJkQ62uLq9eZSI25uBrbb1Sm9si1DW0juvF22Lxq4mRJPbJdQwUeYldVMP-th88qzSiPcrVw851vHgtV8xS5VPq_3NFKo7P-lsL6ECDqMfFw0HsaRKCtw9H6l_-YiKVh5baXsJVCiiHiWE7A1pQGsNrsctoln20JBaW4Ov5yTYccq8qy1gWBUMzUJHjKuLJ7"
                alt="Hero Album Cover"
                fill
                className="object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
            </div>
          </motion.div>
        </section>

        {/* Recommended Slider */}
        <section className="flex flex-col gap-6">
          <h2 className="text-[32px] text-on-surface flex items-center gap-3 font-h3">
            <span className="material-symbols-outlined text-secondary">recommend</span>
            Recommended For You
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
            {[
              { title: "Neon Nights", artist: "Synthwave Collective", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp343hviZbbNFe9JS7bXersVcMWJpagar2pWSqUKelxr_Dt-4ZQYWqrjjeyuYo0Yj5Ax8qj7RcmI6WyUhoSfRE1rZHEfnqMpmMJDaXAuBvn3a6hcS9iBsZKKaR_53KT3T212kMtGpdCYxWDpBe5AX71um4uOoys5UA4iwtNvif_PslCSoM69SUhHNpInwcVA-t4K6AvlRqu0MTME6ek0PTniWTDQPenSfo4yY53p9HYjCf_QUpgA1ExJO-2hnpD4ilBVCSzJ_MGOIL" },
              { title: "Midnight Echoes", artist: "The Void Walkers", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVp28JKZHZiF3Dpc7V_RxEk53kEvAVLltYT0W35ueEHuOPXN7A4vnHqfD4xWtwWMlqT5dtm-xzfgP0wp6jIXC9xGkfB7oHBikXB0GBduXnlf9lk_8iAKPqnHQzMIkb-pzXISd3gCstoa9-Hcn4zs94TnY2MJIGo57yIqsVf9zwSBw22CHlnwhHWZ-INLe8EjhwuwZBNyFmZgRojZQzeEaullHJOgLOmnuVCt7UASRWxgsmVfLFVejJ1_iMj2e7SxQu3JYrLbsg4ceg" },
              { title: "Deep Bass Therapy", artist: "Subsonic Focus", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-EBFm6aCshar8QXrXkXdUj0GXj6cWq8JEcNtOznOccO6SuczeUYu03ZbZrwUwEmjYZ6uMXa9JAgl51kMrPbGqMdjIj1lIc49DqskS7ItIDtTG55nrs5dX6rSV2Pqukw5aCDaEQzTzk1at044h4EBGMNGQNDFKcHzVb31OCRhHZXWrcb3c5UAARfe4eRXFTT1OfTLsvij4vfvXHpHTg4Bso1yG2RcGqBAkQq-XVxjEB0vJ2so2LdC2dyq7MfQSW_8lFwh0gBLDEdRM" },
            ].map((track, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="min-w-[280px] w-[280px] snap-start group cursor-pointer"
              >
                <div className="w-full aspect-square rounded-[24px] overflow-hidden relative mb-3 bg-[#1A1A1A]/60 backdrop-blur-[20px] border border-white/10">
                  <Image 
                    src={track.img}
                    alt={track.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <button className="w-12 h-12 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-[0_0_20px_rgba(0,226,147,0.5)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </button>
                  </div>
                </div>
                <h3 className="font-body-lg text-on-surface truncate">{track.title}</h3>
                <p className="font-body-md text-on-surface-variant truncate">{track.artist}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Based on Your Mood */}
        <section className="flex flex-col gap-6 pb-[120px]">
          <h2 className="text-[32px] text-on-surface flex items-center gap-3 font-h3">
            <span className="material-symbols-outlined text-secondary">mood</span>
            Based on Your Mood
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Chill", icon: "self_improvement", color: "secondary" },
              { label: "Focus", icon: "bolt", color: "tertiary" },
              { label: "Energy", icon: "local_fire_department", color: "error" },
            ].map((mood, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="h-[160px] rounded-[24px] bg-[#1A1A1A]/60 backdrop-blur-[20px] border border-white/10 p-6 flex flex-col justify-end relative overflow-hidden group cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-shadow"
              >
                <div className={`absolute inset-0 bg-gradient-to-tr from-${mood.color}/20 to-transparent z-0`} />
                <span className={`material-symbols-outlined absolute top-6 right-6 text-${mood.color}/50 text-[40px] group-hover:scale-110 transition-transform`}>
                  {mood.icon}
                </span>
                <h3 className="text-[48px] text-on-surface z-10">{mood.label}</h3>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Mini Player Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-[90px] md:bottom-6 left-0 right-0 z-40 px-6 max-w-[1000px] mx-auto"
      >
        <Link href="/player">
          <div className="bg-[#1A1A1A]/80 backdrop-blur-[40px] border border-white/10 rounded-[24px] p-3 flex flex-col gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.8)] cursor-pointer hover:bg-[#252525]/80 transition-colors">
            <div className="w-full h-1 bg-surface-bright rounded-full overflow-hidden">
              <div className="h-full bg-tertiary w-[45%] rounded-full shadow-[0_0_10px_rgba(0,226,147,0.8)]"></div>
            </div>
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden relative">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjKT06x7JRZDT9dcLdk0iEerQiP37pusW7Lg_ww6hQQnM-FAD-vOLlmL_UQv2vo3W41uPOZy3klrtqudbF7BD1j7_UkvX1GDovuwGBOzlBcJGgT3oPPhVGDA0sw9RVF7gt79-Zdro2L2-6Oe3TIj6WtDyObJL8B1l2L6SG0NbvWQSXsmkwbiRPnra5pI5SSGW48xjZdTjGCE2nUEVavHEdXnnjb-myt6n45XOddAPXkttnd7Vh5tizNSjjL-YP3-CIknXjDkwB4qUG"
                    alt="Current Track"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-body-lg text-on-surface text-[14px]">Neon Nights (Extended Mix)</span>
                  <span className="font-body-md text-on-surface-variant text-[12px]">Synthwave Collective</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-on-surface">
                <button className="hover:text-tertiary transition-colors"><span className="material-symbols-outlined">skip_previous</span></button>
                <button className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-[0_0_15px_rgba(0,226,147,0.5)] hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>pause</span>
                </button>
                <button className="hover:text-tertiary transition-colors"><span className="material-symbols-outlined">skip_next</span></button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-6 py-4 max-w-2xl mx-auto rounded-[24px] border border-white/10 m-6 mb-10 bg-[#1A1A1A]/60 backdrop-blur-[40px] shadow-[0_0_30px_rgba(163,230,53,0.15)]">
        <Link className="flex flex-col items-center justify-center text-tertiary drop-shadow-[0_0_8px_rgba(0,226,147,0.8)] scale-110 font-h1 text-[10px] uppercase font-bold tracking-widest" href="/discover">
          <span className="material-symbols-outlined mb-1">explore</span>
          DISCOVER
        </Link>
        <Link className="flex flex-col items-center justify-center text-white/40 hover:text-white transition-all duration-300 font-h1 text-[10px] uppercase font-bold tracking-widest" href="#">
          <span className="material-symbols-outlined mb-1">library_music</span>
          LIBRARY
        </Link>
        <Link className="flex flex-col items-center justify-center text-white/40 hover:text-white transition-all duration-300 font-h1 text-[10px] uppercase font-bold tracking-widest" href="/player">
          <span className="material-symbols-outlined mb-1">graphic_eq</span>
          PLAYER
        </Link>
        <Link className="flex flex-col items-center justify-center text-white/40 hover:text-white transition-all duration-300 font-h1 text-[10px] uppercase font-bold tracking-widest" href="#">
          <span className="material-symbols-outlined mb-1">search</span>
          SEARCH
        </Link>
        <Link className="flex flex-col items-center justify-center text-white/40 hover:text-white transition-all duration-300 font-h1 text-[10px] uppercase font-bold tracking-widest" href="#">
          <span className="material-symbols-outlined mb-1">person</span>
          PROFILE
        </Link>
      </nav>
    </div>
  );
}
