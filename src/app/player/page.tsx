'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMusic } from '@/context/MusicContext';

export default function Player() {
  const { currentTrack, isPlaying, togglePlay, playNext, playPrevious, currentTime, duration } = useMusic();

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100 || 0;

  if (!currentTrack) {
    return (
      <div className="bg-background text-on-background h-screen w-screen flex flex-col items-center justify-center p-6 text-center">
        <span className="material-symbols-outlined text-8xl text-white/10 mb-6">music_note</span>
        <h1 className="text-2xl font-bold mb-4">No track selected</h1>
        <Link href="/">
          <button className="px-8 py-3 rounded-full bg-tertiary text-black font-bold">Go to Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background h-screen w-screen overflow-hidden relative font-body-md text-body-md">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 filter blur-[80px] scale-110"
        style={{ backgroundImage: `url('${currentTrack.thumbnail}')` }}
      />
      <div className="absolute inset-0 z-0 bg-background/60"></div>

      {/* Top Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-10 h-20 w-full">
        <Link href="/">
          <button aria-label="Collapse player" className="w-12 h-12 flex items-center justify-center rounded-full glass-panel text-white/70 hover:text-tertiary transition-colors">
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </Link>
        <div className="font-h3 text-[24px] md:text-[32px] font-black text-white tracking-tighter uppercase">PULSE</div>
        <button aria-label="More options" className="w-12 h-12 flex items-center justify-center rounded-full glass-panel text-white/70 hover:text-tertiary transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 pt-20 pb-40">
        <motion.div 
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl mb-12"
        >
          <Image src={currentTrack.thumbnail} alt={currentTrack.title} fill priority sizes="(max-width: 768px) 256px, 320px" className="object-cover" />
          <div className="absolute inset-0 m-auto w-12 h-12 bg-surface rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-3 h-3 bg-tertiary rounded-full shadow-[0_0_10px_rgba(0,226,147,0.8)]"></div>
          </div>
        </motion.div>

        <div className="text-center mb-8 flex flex-col items-center max-w-lg w-full">
          <h1 className="text-on-surface mb-2 truncate w-full font-h2 text-3xl md:text-5xl">{currentTrack.title}</h1>
          <h2 className="font-body-lg text-on-surface-variant text-lg md:text-xl">{currentTrack.artist}</h2>
        </div>
      </main>

      {/* Bottom: Playback Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-panel rounded-t-[32px] md:rounded-[32px] md:m-6 md:mb-10 px-6 py-8 flex flex-col items-center max-w-4xl mx-auto border-t md:border border-white/10 shadow-2xl">
        <div className="w-full flex items-center gap-4 mb-8 px-4">
          <span className="font-mono text-xs text-on-surface-variant w-10 text-right">{formatTime(currentTime)}</span>
          <div className="grow h-1.5 bg-white/10 rounded-full relative overflow-hidden">
            <motion.div 
              initial={false}
              animate={{ width: `${progress}%` }}
              className="absolute left-0 top-0 h-full bg-tertiary rounded-full shadow-[0_0_10px_rgba(0,226,147,0.5)]"
            />
          </div>
          <span className="font-mono text-xs text-on-surface-variant w-10 text-left">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-between w-full max-w-sm px-4">
          <button onClick={playPrevious} aria-label="Previous track" className="text-white/70 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>skip_previous</span>
          </button>
          
          <button onClick={togglePlay} aria-label="Play/Pause" className="w-20 h-20 rounded-full bg-tertiary text-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          <button onClick={playNext} aria-label="Next track" className="text-white/70 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>skip_next</span>
          </button>
        </div>
      </div>
    </div>
  );
}
