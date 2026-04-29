'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Player() {
  return (
    <div className="bg-background text-on-background h-screen w-screen overflow-hidden relative font-body-md text-body-md">
      {/* Blurred Background (Album Art representation) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-screen filter blur-[80px] scale-110 transition-all duration-1000"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYtnRwKOTpO1Ol9UV1SIUcmcWG5a8V-CYNiITw1tP_bUxOCXK9cB04HV434vxH4X3IJ35aw7mgDiO2UMLt7VViZV2k1ePGd9cHiYMXkjntkbuWK-n40vbN2UpxwIvUGTg3TfWiMT6ovPR85D4yYk3j-zpSv6kWoxFyUxjtGW34zADUITulVSYmu34d0TcL42Tr_sqEThsPhuYGbBgUvKWU2G0DlJndp6sNcmafXgNvFPmdEV-WMqE3l8NDpweYK7Dmjylzx4AGQLb5')" }}
      />
      
      {/* Base Void overlay for depth */}
      <div className="absolute inset-0 z-0 bg-background/60"></div>

      {/* Top Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-10 h-20 w-full">
        <Link href="/">
          <button aria-label="Collapse player" className="w-12 h-12 flex items-center justify-center rounded-full glass-panel text-white/70 hover:text-tertiary transition-colors">
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </Link>
        <div className="font-h3 text-[32px] font-black text-white tracking-tighter uppercase font-h1">PULSE</div>
        <button aria-label="More options" className="w-12 h-12 flex items-center justify-center rounded-full glass-panel text-white/70 hover:text-tertiary transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 pt-20 pb-40">
        {/* Center: Album Art */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(0,226,147,0.1)] mb-12"
        >
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD23FmwLI372G9UPR9sYayBYMQ8wzFRpPmDe301K39Ly6LR-noPODO1TYQ0mM6-gxluqdo-IB_SHCoLj7gJSsWjKlnaTJlfOjZ1juOyJXxOKOe4IzF6c4DYRbxxe1as0Ef7_kf30P4AQmpncuOU6BjHZNygKbBevsfaShcILj6igOgc7gyibTbyGJscHgicUmTd4uwPUyGmqlwYwAMVF_uKnOgCnJa8PwZkz7SvMf0qP3mvsRzVhTHXv3vMziD-GAVMOAKgHR1GFfeZ"
            alt="Album Cover"
            fill
            className="object-cover"
          />
          {/* Center Hole for vinyl look */}
          <div className="absolute inset-0 m-auto w-16 h-16 bg-surface rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-4 h-4 bg-tertiary rounded-full glow-effect"></div>
          </div>
        </motion.div>

        {/* Track Info */}
        <div className="text-center mb-8 flex flex-col items-center max-w-lg w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-caps text-[12px] tracking-widest font-semibold border border-tertiary/20">ELECTRONIC</span>
            <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-caps text-[12px] tracking-widest font-semibold border border-secondary/20">SYNTHWAVE</span>
          </div>
          <h1 className="text-on-surface mb-2 truncate w-full font-h2 text-[48px]">Neon Horizon</h1>
          <h2 className="font-body-lg text-on-surface-variant text-[18px]">Midnight Syndicate</h2>
        </div>

        {/* Lyrics Snippet */}
        <div className="text-center w-full max-w-md h-24 overflow-hidden mask-image-gradient relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/0 to-background/80 z-10 pointer-events-none"></div>
          <motion.div 
            animate={{ y: [0, -40, -80] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="space-y-4 pt-4"
          >
            <p className="font-body-md text-white/40">Drifting through the synthetic night,</p>
            <p className="font-body-md text-tertiary">Chasing the pulse of the neon light,</p>
            <p className="font-body-md text-white/20">Everything fades into the void...</p>
          </motion.div>
        </div>
      </main>

      {/* Bottom: Playback Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-panel rounded-t-[32px] md:rounded-[32px] md:m-6 md:mb-10 px-6 py-8 flex flex-col items-center max-w-4xl mx-auto border-t md:border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-4 mb-8 px-4">
          <span className="font-label-caps text-[12px] tracking-widest font-semibold text-on-surface-variant w-10 text-right">2:14</span>
          <div className="flex-grow h-1.5 bg-white/10 rounded-full relative cursor-pointer group">
            {/* Buffered */}
            <div className="absolute left-0 top-0 h-full w-3/4 bg-white/20 rounded-full"></div>
            {/* Played */}
            <div className="absolute left-0 top-0 h-full w-1/2 bg-tertiary rounded-full glow-effect relative">
              {/* Playhead */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-tertiary rounded-full shadow-[0_0_10px_rgba(0,226,147,0.8)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <span className="font-label-caps text-[12px] tracking-widest font-semibold text-on-surface-variant w-10 text-left">4:05</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between w-full max-w-sm px-4">
          <button aria-label="Shuffle" className="text-white/40 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shuffle</span>
          </button>
          <button aria-label="Previous track" className="text-white/70 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>skip_previous</span>
          </button>
          
          {/* Play/Pause FAB */}
          <button aria-label="Play/Pause" className="w-20 h-20 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary glow-effect-heavy hover:scale-105 transition-transform border border-tertiary/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-tertiary/20 to-transparent rounded-full pointer-events-none"></div>
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>pause</span>
          </button>
          
          <button aria-label="Next track" className="text-white/70 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>skip_next</span>
          </button>
          <button aria-label="Repeat" className="text-tertiary hover:text-tertiary-fixed transition-colors">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>repeat</span>
          </button>
        </div>

        {/* Visualizer Fake Elements */}
        <div className="w-full flex justify-center items-end h-8 gap-1 mt-6 opacity-30">
          {[3, 6, 4, 8, 5, 2, 7, 4].map((h, i) => (
            <motion.div 
              key={i}
              animate={{ height: [h*4, h*8, h*4] }}
              transition={{ duration: 0.5 + i*0.1, repeat: Infinity, ease: "easeInOut" }}
              className={`w-1.5 bg-tertiary rounded-t-sm ${i === 3 ? 'glow-effect' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
