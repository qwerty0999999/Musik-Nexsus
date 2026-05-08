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
    try {
      if (song.source === 'youtube' || !song.url || song.url === '#') {
        const res = await fetch(`/api/v1/stream?v=${song.id}`)
        const data = await res.json()
        
        if (data.url) {
          setSong({ ...song, url: data.url })
        } else {
          alert(data.error || 'Gagal memutar lagu ini.')
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
    <div 
      className="group bg-dark-surface hover:bg-mid-dark p-4 rounded-lg transition-all duration-300 cursor-pointer relative"
      onClick={handlePlay}
    >
      <div className="relative aspect-square mb-4 shadow-lg">
        <Image 
          src={song.cover || 'https://via.placeholder.com/300'} 
          alt={song.title}
          fill
          className="object-cover rounded-md" 
          unoptimized
        />
        {/* Play button overlay */}
        <div className="absolute right-2 bottom-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <div className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 transition active:scale-95">
            <Play fill="currentColor" size={24} className="ml-1" />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-white font-bold text-[16px] truncate tracking-tight">{song.title}</h3>
        <p className="text-silver text-[14px] font-semibold truncate">{song.artist}</p>
      </div>
    </div>
  )
}

