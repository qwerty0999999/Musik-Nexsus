'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMusic } from '@/context/MusicContext';

export default function Player() {
  const { 
    currentTrack, isPlaying, togglePlay, playNext, playPrevious, 
    currentTime, duration, seekTo, isShuffle, setIsShuffle, 
    repeatMode, setRepeatMode, volume, setVolume 
  } = useMusic();

  const [showVolume, setShowVolume] = useState(false);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100 || 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seekTo(time);
  };

  const toggleRepeat = () => {
    if (repeatMode === 'none') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('none');
  };

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
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 filter blur-[80px] scale-110 transition-all duration-1000"
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
        <div className="relative">
          <button 
            onClick={() => setShowVolume(!showVolume)}
            aria-label="Volume" 
            className={`w-12 h-12 flex items-center justify-center rounded-full glass-panel transition-colors ${showVolume ? 'text-tertiary' : 'text-white/70 hover:text-tertiary'}`}
          >
            <span className="material-symbols-outlined">{volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}</span>
          </button>
          {showVolume && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="absolute top-14 right-0 glass-panel p-4 rounded-2xl w-10 h-32 flex flex-col items-center"
            >
              <input 
                type="range" min="0" max="1" step="0.01" value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 -rotate-90 origin-center absolute top-12 accent-tertiary cursor-pointer"
              />
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 pt-20 pb-48">
        <div className="relative group">
          <motion.div 
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/5 shadow-2xl mb-12"
          >
            <Image src={currentTrack.thumbnail} alt={currentTrack.title} fill priority sizes="(max-width: 768px) 256px, 320px" className="object-cover" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
          <div className="absolute inset-0 m-auto w-12 h-12 bg-background/80 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center z-20">
            <div className={`w-3 h-3 bg-tertiary rounded-full ${isPlaying ? 'animate-pulse shadow-[0_0_15px_rgba(0,226,147,0.8)]' : 'opacity-50'}`}></div>
          </div>
        </div>

        <div className="text-center mb-8 flex flex-col items-center max-w-lg w-full px-4">
          <motion.h1 
            key={currentTrack.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-on-surface mb-2 truncate w-full font-h2 text-3xl md:text-5xl"
          >
            {currentTrack.title}
          </motion.h1>
          <motion.h2 
            key={`${currentTrack.id}-artist`} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className="font-body-lg text-on-surface-variant text-lg md:text-xl"
          >
            {currentTrack.artist}
          </motion.h2>
        </div>
      </main>

      {/* Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-panel rounded-t-[40px] md:rounded-[40px] md:m-6 md:mb-10 px-6 py-8 flex flex-col items-center max-w-4xl mx-auto border-t md:border border-white/10 shadow-2xl">
        {/* Progress Bar */}
        <div className="w-full flex flex-col gap-2 mb-6 px-4">
          <div className="relative w-full h-1.5 bg-white/10 rounded-full group">
            <input 
              type="range" min="0" max={duration || 100} value={currentTime} onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
            />
            <motion.div 
              initial={false} animate={{ width: `${progress}%` }}
              className="absolute left-0 top-0 h-full bg-tertiary rounded-full shadow-[0_0_10px_rgba(0,226,147,0.5)] z-10"
            />
            <div className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ left: `calc(${progress}% - 8px)` }} />
          </div>
          <div className="flex justify-between w-full">
            <span className="font-mono text-xs text-on-surface-variant">{formatTime(currentTime)}</span>
            <span className="font-mono text-xs text-on-surface-variant">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Buttons */}
        <div className="flex items-center justify-between w-full max-w-md px-4">
          <button 
            onClick={() => setIsShuffle(!isShuffle)} 
            className={`transition-colors ${isShuffle ? 'text-tertiary' : 'text-white/40 hover:text-white'}`}
            title="Shuffle"
          >
            <span className="material-symbols-outlined text-2xl">shuffle</span>
          </button>

          <button onClick={playPrevious} aria-label="Previous track" className="text-white/70 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>skip_previous</span>
          </button>
          
          <button onClick={togglePlay} aria-label="Play/Pause" className="w-20 h-20 rounded-full bg-tertiary text-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95">
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          <button onClick={playNext} aria-label="Next track" className="text-white/70 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>skip_next</span>
          </button>

          <button 
            onClick={toggleRepeat} 
            className={`transition-colors relative ${repeatMode !== 'none' ? 'text-tertiary' : 'text-white/40 hover:text-white'}`}
            title={`Repeat ${repeatMode}`}
          >
            <span className="material-symbols-outlined text-2xl">
              {repeatMode === 'one' ? 'repeat_one' : 'repeat'}
            </span>
            {repeatMode !== 'none' && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-tertiary rounded-full" />}
          </button>
        </div>
      </div>
    </div>
  );
}
