'use client'

import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Container from '@/components/ui/Container'
import MusicCard from '@/components/music/MusicCard'
import Player from '@/components/music/Player'
import ActivityFeed from '@/components/social/ActivityFeed'
import MobileNav from '@/components/layout/MobileNav'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'

export default function Home() {
  const [songs, setSongs] = useState<any[]>([])
  const [recommended, setRecommended] = useState<any[]>([])

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async () => {
    // Simulasi data jika database kosong
    const { data, error } = await supabase.from('songs').select('*')
    
    const mockSongs = [
      { id: '1', title: 'Lofi Vibes', artist: 'Chill Master', cover: 'https://images.unsplash.com/photo-1459749411177-042180ce673b?q=80&w=300&h=300&auto=format&fit=crop', url: '#' },
      { id: '2', title: 'Midnight City', artist: 'Synth Wave', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&h=300&auto=format&fit=crop', url: '#' },
      { id: '3', title: 'Ocean Breeze', artist: 'Nature Sounds', cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=300&h=300&auto=format&fit=crop', url: '#' },
      { id: '4', title: 'Future Bass', artist: 'Electric Soul', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&h=300&auto=format&fit=crop', url: '#' },
      { id: '5', title: 'Acoustic Morning', artist: 'Guitar Hero', cover: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=300&h=300&auto=format&fit=crop', url: '#' },
    ]

    const finalSongs = data && data.length > 0 ? data : mockSongs
    setSongs(finalSongs)
    setRecommended(finalSongs.slice(0, 4))
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-transparent overflow-y-auto pb-32 md:pb-8">
        <Container className="px-4 md:px-8">
          <Header />

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-[var(--accent)] font-medium text-xs md:text-sm mb-1 uppercase tracking-wider">Pilihan Terbaik</h2>
                <h2 className="text-white text-2xl md:text-3xl font-bold">🎯 Untuk Kamu</h2>
              </div>
              <button className="text-[var(--primary)] text-sm font-semibold hover:underline">Lihat Semua</button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {recommended.map((song) => (
                <MusicCard key={song.id} song={song} />
              ))}
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-24"
          >
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-[var(--muted)] font-medium text-xs md:text-sm mb-1 uppercase tracking-wider">Eksplorasi</h2>
                <h2 className="text-white text-2xl md:text-3xl font-bold">🔥 Sedang Tren</h2>
              </div>
              <button className="text-[var(--primary)] text-sm font-semibold hover:underline">Lihat Semua</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {songs.map((song) => (
                <MusicCard key={song.id} song={song} />
              ))}
            </div>
          </motion.section>
        </Container>
      </main>

      <ActivityFeed />

      <MobileNav />
      <Player />
    </div>
  )
}
