'use client'

import { motion } from 'framer-motion'
import Card from '../ui/Card'
import { usePlayer } from '@/hooks/usePlayer'
import { supabase } from '@/lib/supabaseClient'
import useUser from '@/hooks/useUser'
import { Play } from 'lucide-react'

export default function MusicCard({ song }: any) {
  const setSong = usePlayer((s: any) => s.setSong)
  const user = useUser()

  const handlePlay = async () => {
    setSong(song)

    if (user) {
      await supabase.from('activities').insert({
        user_id: user.id,
        song_id: song.id,
        action: 'play',
      })
    }
  }

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="relative overflow-hidden">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-xl">
          <img 
            src={song.cover || 'https://via.placeholder.com/300'} 
            alt={song.title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
              onClick={handlePlay}
              className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <Play fill="currentColor" size={24} />
            </button>
          </div>
        </div>

        <h3 className="text-white font-semibold truncate">{song.title}</h3>
        <p className="text-[var(--muted)] text-sm truncate">{song.artist}</p>
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 pointer-events-none" />
      </Card>
    </motion.div>
  )
}
