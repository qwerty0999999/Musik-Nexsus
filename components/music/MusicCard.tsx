'use client'

import { motion } from 'framer-motion'
import Card from '../ui/Card'
import { usePlayer } from '@/lib/usePlayer'
import { supabase } from '@/lib/supabaseClient'
import useUser from '@/lib/useUser'
import { Play } from 'lucide-react'

export default function MusicCard({ song }: any) {
  const setSong = usePlayer((s: any) => s.setSong)
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
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="group"
    >
      <Card className="relative overflow-hidden p-3! md:p-4!">
        <div className="relative aspect-square mb-3 overflow-hidden rounded-lg md:rounded-xl">
          <img 
            src={song.cover || 'https://via.placeholder.com/300'} 
            alt={song.title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
          />
          {/* Play button overlay - visible on hover (desktop) or always visible slightly (mobile) if preferred, but for now let's make it a clean tap */}
          <div className="absolute inset-0 bg-black/20 md:bg-black/40 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
              onClick={handlePlay}
              className="w-10 h-10 md:w-12 md:h-12 bg-(--primary) rounded-full flex items-center justify-center text-white shadow-xl md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300"
            >
              <Play fill="currentColor" size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        <h3 className="text-white font-semibold text-sm md:text-base truncate">{song.title}</h3>
        <p className="text-(--muted) text-[11px] md:text-sm truncate">{song.artist}</p>
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-br from-(--primary)/10 to-(--accent)/10 pointer-events-none" />
      </Card>
    </motion.div>
  )
}
