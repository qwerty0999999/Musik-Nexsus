'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { usePlayer } from '@/lib/usePlayer'
import { useRef, useEffect, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Maximize2, ListMusic } from 'lucide-react'

export default function Player() {
  const { currentSong } = usePlayer() as { currentSong: { url: string, cover: string, title: string, artist: string, duration?: string } | null }
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
            className="fixed inset-0 bg-near-black z-100 p-8 flex flex-col"
          >
             <button 
              onClick={(e) => { e.stopPropagation(); setIsFullPlayer(false); }}
              className="absolute top-8 left-8 text-silver hover:text-white transition"
            >
              <SkipBack size={24} className="-rotate-90" />
            </button>

            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto w-full">
              <div className="w-full max-w-[400px] aspect-square relative shadow-2xl">
                 <Image src={currentSong.cover} fill className="object-cover rounded-lg" alt="" unoptimized />
              </div>

              <div className="flex-1 w-full space-y-8">
                 <div className="space-y-2">
                    <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tighter">{currentSong.title}</h1>
                    <p className="text-silver text-2xl font-semibold">{currentSong.artist}</p>
                 </div>

                 <div className="space-y-4">
                    <div className="w-full h-1 bg-white/10 rounded-full relative group cursor-pointer">
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-white group-hover:bg-spotify-green"
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-silver text-xs font-bold uppercase tracking-widest">
                      <span>0:00</span>
                      <span>3:45</span>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                       <Shuffle size={24} className="text-silver hover:text-white cursor-pointer" />
                       <div className="flex items-center gap-8">
                          <SkipBack size={32} className="text-white hover:text-spotify-green cursor-pointer" />
                          <button 
                            onClick={togglePlay}
                            className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition active:scale-95"
                          >
                            {isPlaying ? <Pause fill="currentColor" size={32} /> : <Play fill="currentColor" size={32} className="ml-1" />}
                          </button>
                          <SkipForward size={32} className="text-white hover:text-spotify-green cursor-pointer" />
                       </div>
                       <Repeat size={24} className="text-silver hover:text-white cursor-pointer" />
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/5 px-4 h-24 z-50 flex items-center"
      >
        <div className="w-full flex justify-between items-center max-w-[100vw]">
          {/* Song Info */}
          <div className="flex gap-4 items-center w-[30%]">
            <div 
              className="w-14 h-14 relative rounded-md overflow-hidden cursor-pointer group"
              onClick={() => setIsFullPlayer(true)}
            >
              <Image src={currentSong.cover} fill className="object-cover" alt="" unoptimized />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Maximize2 size={18} className="text-white" />
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-bold truncate hover:underline cursor-pointer">{currentSong.title}</p>
              <p className="text-silver text-xs hover:underline cursor-pointer truncate">{currentSong.artist}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[40%]">
            <div className="flex items-center gap-6 text-silver">
              <Shuffle size={16} className="hover:text-white cursor-pointer transition" />
              <SkipBack size={20} className="hover:text-white cursor-pointer transition" />
              <button 
                onClick={togglePlay}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition active:scale-95"
              >
                {isPlaying ? <Pause fill="currentColor" size={16} /> : <Play fill="currentColor" size={16} className="ml-1" />}
              </button>
              <SkipForward size={20} className="hover:text-white cursor-pointer transition" />
              <Repeat size={16} className="hover:text-white cursor-pointer transition" />
            </div>

            <div className="w-full flex items-center gap-2">
              <span className="text-[11px] text-silver w-8 text-right font-medium">0:00</span>
              <div className="flex-1 h-1 bg-white/10 rounded-full group cursor-pointer relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white group-hover:bg-spotify-green"
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[11px] text-silver w-8 font-medium">3:45</span>
            </div>
          </div>

          {/* Volume & Extra */}
          <div className="flex items-center gap-4 w-[30%] justify-end text-silver">
             <ListMusic size={18} className="hover:text-white cursor-pointer" />
             <div className="flex items-center gap-2 w-32">
                <Volume2 size={18} />
                <div className="flex-1 h-1 bg-white/10 rounded-full group cursor-pointer relative overflow-hidden">
                   <div className="w-2/3 h-full bg-white group-hover:bg-spotify-green" />
                </div>
             </div>
             <Maximize2 
              size={18} 
              className="hover:text-white cursor-pointer" 
              onClick={() => setIsFullPlayer(true)}
            />
          </div>
        </div>
        
        <audio 
          ref={audioRef} 
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </>
  )
}
