'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { usePlayer } from '@/lib/usePlayer'
import { supabase } from '@/lib/supabaseClient'
import useUser from '@/lib/useUser'
import { Play } from 'lucide-react'

export default function MusicCard({ song }: { song: Record<string, string> }) {
  const setSong = usePlayer((s) => s.setSong)
  const user = useUser()

  const handlePlay = async () => {
    console.log('--- Playing Song:', song.title, '---')
    try {
      // Jika lagu berasal dari YouTube, kita perlu ambil stream URL aslinya
      if (song.source === 'youtube' || !song.url || song.url === '#') {
        const res = await fetch(`/api/v1/stream?v=${song.id}`)
        const data = await res.json()
        
        if (data.url) {
          console.log('Stream URL obtained successfully')
          setSong({ ...song, url: data.url })
        } else {
          console.error('Stream error:', data.error)
          alert(data.error || 'Gagal memutar lagu ini. YouTube membatasi akses.')
          return
        }
      } else {
        setSong(song)
      }

      if (user) {
        await supabase.from('activities').insert({
          user_id: user.id,
          song_id: song.id,
          action: 'play',
        })
      }
    } catch (err) {
      console.error('Frontend Error playing song:', err)
    }
  }

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={handlePlay}
    >
      <div className="relative bg-white/5 border border-white/5 p-4 rounded-2xl transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-white/10 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-xl">
          <Image 
            src={song.cover || 'https://via.placeholder.com/300'} 
            alt={song.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110" 
            unoptimized
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play fill="currentColor" size={24} className="ml-1" />
            </div>
          </div>
        </div>

        <h3 className="text-white font-bold text-base md:text-lg truncate tracking-tight mb-1">{song.title}</h3>
        <p className="text-(--muted) text-xs md:text-sm font-medium tracking-wide uppercase opacity-70 truncate">{song.artist}</p>
      </div>
    </motion.div>
  )
}

