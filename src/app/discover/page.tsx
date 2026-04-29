'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Discover() {
  const moods = [
    {
      title: "Chill",
      desc: "Ambient frequencies & downtempo rhythms.",
      icon: "water_drop",
      color: "secondary-fixed-dim",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvTeWGPB67-VbUFCHmhsnjq8WGwg3D1Wm7K2mME-gHTwRqwkbt_dTb_z1BfvlTL7KamVFLxIikBCHinKSyt-_RsZuCvbkH8aQO4sqIBBhnGOb88VXm_YXowDX6F-TOwbZr6mz2S79DJpGhX0h5g6PyGPH6ZVdxSZIBOvIkmiF0WovIWekV5zzqueAaL2Zh4LYrtQ5u8f7QHm19vnHBptr0-EHjrLlDHp807p-fFrBOOv0RaLq284ogYSIh3lGGIufMq6IvU5UFFYu_"
    },
    {
      title: "Energy",
      desc: "High-BPM sequences & driving basslines.",
      icon: "bolt",
      color: "error",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNyk0eJmFCg04K-kqH7ZtwN0Mgr4D1HiWAm15XJ62zqT7QlCubFbepPl4NKBnMmaNbFOWCPWPogzIs5qqSGlsY4XGDq1HZAWG5aWHD0Xv18hRuVXphlR-OKt0y3pCkMFVbEJcI60w7EeGncIbsNxRZhpbdMvvfNFCms9CwKCjv__mOUJb-97dTKeXFwxs_PotqgrMjEyEsbLWDVc40f8VI5KcMywUbSUJL-qh5Zl0OokitShaJ6U7gljU3oABoQxihZy8sAzznNGpA"
    },
    {
      title: "Focus",
      desc: "Minimalist patterns & lo-fi textures.",
      icon: "center_focus_strong",
      color: "tertiary-fixed-dim",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuATaMFd1ba2Yd7u8NnS21YgU_Sg_3eqJJTh_l8h7SPzez9LDLXggljVqoFI4GC-IKqhcTZCnk1vNkrUtx8-qGAD5o7i6SqY0AccmzvcTTvlb0wK0KLybaJRj2XjQvSe1vv50VXjByXYFUNm4l4lX_4vJTzP_ySGHsrEAbasCpRFWwVqWCaa-aE6X4CwwMZL3G8TAmuHO8ITkIw9-73GTm0_-aXLTHFTI3Ag5maHK89wqWgWoLtYZIlH9vK1IuYmaVpbXDnguC5NM2yw"
    }
  ];

  const sequences = [
    { title: "NEON VOID", artist: "Synthwave Anthology", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLNpDrKY4zdObcA-Gqjuy40knuCsKG26u4v1XLhcMESa-XklEk4J_P7ms_PIaabMVeySYE38wyKNQHmENYC9zKqV7er_uY7IH9cg2g7-tQzQw7SJGX5uUEm_McNyTVsOPRowj8dKJ-FzuKbIrv-UGZlJBurcB1uSdsuivVm3PdMqSApWXmoQ-0xjIvIuQ5NwJlh7NTjfN6PPwWhV83v86UWVuJSWLhHsNXLBEJn9Q9-WOjk3sqpuMgKwr5Bys_AidM50R1QW2zv7_e" },
    { title: "FRACTAL BEATS", artist: "Deep Tech House", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHNB7LeUCNZ4fUrBJ80PZ6Ldu3Et9DGnQk062TcM8rYf3isihzWE3dpT1jKmlH4iE7teF-sTsNcfawdzXUMG1Td9fyraKOgpmtTKuYpTnFaj3Siqbj7nMd_JiCjvqEbjdiPYcDlgqaes9ijhiGUEEPaLDPJ3MluHcWqX6MWUXuUGa05DaLZhq1mxVv_wSl_TRx1hYMbclWuq7R8B8NPSVg_zic9u8Ss7GGSANcej11O5ibKzeZTNrKoflsJ_THvAK2ESDPhOg8LnIU" },
    { title: "LIQUID STATE", artist: "Ethereal D&B", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8zrZRRg2inaVuwE7epzAwZD6EpiESF87G-BRedV-bimJ3qQMPQlPIjp0odzCStPzLJLQeYct1FJQpXC0IioRSYb3P8xoQcVdHHTUoe271jL3plqfQqDLZSnsw4FkdMyeqvucKpI8iqvEtoSIG2wwhPt5dgENK1rs7DXXeH5jU4KEmXNfdYOwOweg-t3OewWwweWoDUIy5rof_NDxTF0VP8W8i-ChVw3aJEvWVlLDOP6UPwoFxWhyxS3SWyYFkIWWL_qUEAfWz8Xry" }
  ];

  return (
    <div className="bg-void text-on-surface font-body-md min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-10 h-20 bg-[#1A1A1A]/60 backdrop-blur-[20px] border-b border-white/10 text-white/70">
        <div className="flex items-center gap-4 text-tertiary">
          <span className="material-symbols-outlined hover:text-white transition-colors duration-300 cursor-pointer">menu</span>
        </div>
        <div className="text-2xl font-black text-white tracking-[0.2em] uppercase font-h1">
          PULSE
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 relative">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Ws5bf_qnTf_MB6YQWfiN9wBbeH45Tu3ZPr2FM59GeS5iJDMTt-ciaDlkbtVfKGdaeuA349q1y0rZDVPJo8oQssxsXQFQsihhf_qQjrVWToQCv1X4wjDLCe-iiK8_MwDe9IvIVB--mooyHM8yO9pmMMYJAa80_dA9ZAwvWsaOerWehdrkM6KFv-op0-1BRWkkO1JXiyh9M7vAj0rlJXQ_h1IIxoJEq5vzcUEOJw6Gimcm4C9-l366jdJV1ZB_S6uLwtackW6dn1zb"
            alt="User Profile"
            fill
            className="object-cover"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 px-4 md:px-10 max-w-7xl mx-auto space-y-16">
        {/* Hero Mood Selection */}
        <section className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-on-surface"
          >
            Curated Realms
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-body-lg text-on-surface-variant max-w-2xl"
          >
            Step into sonic environments designed to elevate your current state of being. Choose your atmosphere.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moods.map((mood, i) => (
              <motion.div 
                key={mood.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                whileHover={{ scale: 1.02 }}
                className="relative h-[400px] rounded-[24px] overflow-hidden group cursor-pointer border border-white/10 hover-glow transition-all duration-500"
              >
                <Image 
                  src={mood.img}
                  alt={mood.title}
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="glass-card rounded-xl p-4 inline-block self-start mb-4">
                    <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1", color: `var(--color-${mood.color})` }}>
                      {mood.icon}
                    </span>
                  </div>
                  <h2 className="text-white mb-2">{mood.title}</h2>
                  <p className="font-body-md text-on-surface-variant">{mood.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending Sequences Slider */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="text-on-surface font-h3">Trending Sequences</h3>
            <button className="font-label-caps text-[12px] tracking-widest font-semibold text-secondary-fixed-dim hover:text-white transition-colors">VIEW ALL</button>
          </div>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 pt-4">
            {sequences.map((seq, i) => (
              <motion.div 
                key={seq.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -8 }}
                className="min-w-[280px] glass-card rounded-[24px] p-4 group cursor-pointer transition-all duration-300 hover:shadow-[0_10px_30px_rgba(223,183,255,0.1)]"
              >
                <div className="relative w-full aspect-square rounded-[16px] overflow-hidden mb-4">
                  <Image 
                    src={seq.img}
                    alt={seq.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="w-12 h-12 rounded-full bg-tertiary text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,226,147,0.5)]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </button>
                  </div>
                </div>
                <h4 className="font-label-caps text-[12px] tracking-widest font-bold text-white mb-1">{seq.title}</h4>
                <p className="font-body-md text-sm text-on-surface-variant">{seq.artist}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-6 py-4 max-w-2xl mx-auto rounded-[24px] border border-white/10 m-6 mb-10 shadow-[0_0_30px_rgba(163,230,53,0.15)] bg-[#1A1A1A]/60 backdrop-blur-[40px]">
        <Link className="flex flex-col items-center justify-center text-tertiary neon-glow-active scale-110 cursor-pointer" href="/discover">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          <span className="font-h1 text-[10px] uppercase font-bold tracking-widest">DISCOVER</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-white/40 hover:text-white transition-all duration-300 cursor-pointer" href="#">
          <span className="material-symbols-outlined mb-1">library_music</span>
          <span className="font-h1 text-[10px] uppercase font-bold tracking-widest">LIBRARY</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-white/40 hover:text-white transition-all duration-300 cursor-pointer" href="/player">
          <span className="material-symbols-outlined mb-1">graphic_eq</span>
          <span className="font-h1 text-[10px] uppercase font-bold tracking-widest">PLAYER</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-white/40 hover:text-white transition-all duration-300 cursor-pointer" href="#">
          <span className="material-symbols-outlined mb-1">search</span>
          <span className="font-h1 text-[10px] uppercase font-bold tracking-widest">SEARCH</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-white/40 hover:text-white transition-all duration-300 cursor-pointer" href="#">
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="font-h1 text-[10px] uppercase font-bold tracking-widest">PROFILE</span>
        </Link>
      </nav>
    </div>
  );
}
