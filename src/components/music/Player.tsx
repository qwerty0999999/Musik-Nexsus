'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePlayer } from '@/hooks/usePlayer'
import { useRef, useEffect, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from 'lucide-react'

export default function Player() {
  const { currentSong } = usePlayer() as any
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isFullPlayer, setIsFullPlayer] = useState(false)

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [currentSong])

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100
      setProgress(percent)
    }
  }

  if (!currentSong) return null

  return (
    <>
      <AnimatePresence>
        {isFullPlayer && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-[#0B0F1A] z-[100] p-6 md:p-12 flex flex-col items-center justify-center gap-8 md:gap-12"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFullPlayer(false); }}
              className="absolute top-6 md:top-8 right-6 md:right-8 text-gray-500 hover:text-white transition p-2"
            >
              <SkipBack size={28} className="rotate-[-90deg] md:w-8 md:h-8" />
            </button>

            <div className="absolute inset-0 -z-10 opacity-40 blur-[120px] scale-150">
               <img src={currentSong.cover} className="w-full h-full object-cover" alt="" />
            </div>

            <motion.div 
              className="w-full max-w-[280px] md:max-w-sm aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              animate={isPlaying ? { scale: [1, 1.03, 1] } : {}}
              transition={{ repeat: Infinity, duration: 8 }}
            >
              <img src={currentSong.cover} className="w-full h-full object-cover" alt="" />
            </motion.div>

            <div className="w-full max-w-xl text-center md:text-left">
               <h1 className="text-white text-3xl md:text-6xl font-bold mb-1 md:mb-2 truncate">{currentSong.title}</h1>
               <p className="text-(--primary) text-lg md:text-2xl mb-8 md:mb-12 font-medium truncate">{currentSong.artist}</p>

               <div className="space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <div className="w-full h-1.5 md:h-2 bg-white/10 rounded-full relative overflow-hidden">
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-linear-to-r from-(--primary) to-(--accent)"
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-gray-500 text-[10px] md:text-sm font-medium">
                      <span>0:00</span>
                      <span>3:45</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-8 md:gap-12 text-white">
                    <Shuffle size={24} className="text-gray-500 hover:text-(--primary) cursor-pointer hidden sm:block" />
                    <SkipBack size={32} className="cursor-pointer hover:text-(--primary) md:w-12 md:h-12" />
                    <button 
                      onClick={togglePlay}
                      className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition shadow-2xl active:scale-95"
                    >
                      {isPlaying ? <Pause fill="currentColor" size={28} className="md:w-10 md:h-10" /> : <Play fill="currentColor" size={28} className="md:w-10 md:h-10 ml-1" />}
                    </button>
                    <SkipForward size={32} className="cursor-pointer hover:text-(--primary) md:w-12 md:h-12" />
                    <Repeat size={24} className="text-gray-500 hover:text-(--primary) cursor-pointer hidden sm:block" />
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        onClick={() => setIsFullPlayer(true)}
        className="fixed bottom-[72px] md:bottom-0 left-0 right-0 bg-[#0B0F1A]/90 backdrop-blur-xl border-t border-white/5 px-4 md:px-6 py-3 md:py-4 z-50 cursor-pointer group"
      >
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center gap-4 md:gap-8">
          {/* Song Info */}
          <div className="flex gap-3 md:gap-4 items-center w-1/2 md:w-1/4">
            <motion.div 
              className="w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden border border-white/10 shrink-0"
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
            >
              <img src={currentSong.cover} className="w-full h-full object-cover" alt="" />
            </motion.div>
            <div className="overflow-hidden">
              <p className="text-white text-sm md:text-base font-semibold truncate group-hover:text-(--primary) transition">{currentSong.title}</p>
              <p className="text-(--muted) text-xs md:text-sm truncate">{currentSong.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-1 md:gap-2 flex-1 md:max-w-2xl">
            <div className="flex items-center gap-4 md:gap-6 text-gray-400">
              <Shuffle size={18} className="hidden md:block cursor-pointer hover:text-(--primary) transition" />
              <SkipBack size={20} className="cursor-pointer hover:text-white transition" />
              <button 
                onClick={togglePlay}
                className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition active:scale-95"
              >
                {isPlaying ? <Pause fill="currentColor" size={18} /> : <Play fill="currentColor" size={18} className="ml-1" />}
              </button>
              <SkipForward size={20} className="cursor-pointer hover:text-white transition" />
              <Repeat size={18} className="hidden md:block cursor-pointer hover:text-(--primary) transition" />
            </div>

            <div className="w-full hidden md:flex items-center gap-3">
              <span className="text-[10px] text-gray-500 w-8 text-right">0:00</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden group/progress cursor-pointer relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-(--primary) group-hover/progress:bg-(--accent) transition-colors"
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-500 w-8">3:45</span>
            </div>
          </div>

          {/* Volume & Extras (Desktop only) */}
          <div className="hidden md:flex items-center gap-4 w-1/4 justify-end">
            <div className="flex gap-1 h-4 items-end">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-(--primary) rounded-full"
                  animate={isPlaying ? { height: [4, 16, 8, 12, 4] } : { height: 4 }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Volume2 size={18} className="text-gray-400" />
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Progress Bar (Mini) */}
        <div className="md:hidden absolute top-0 left-0 right-0 h-[2px] bg-white/5">
          <motion.div 
            className="h-full bg-(--primary)"
            animate={{ width: `${progress}%` }}
          />
        </div>
        
        <audio 
          ref={audioRef} 
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      </motion.div>
    </>
  )
}

