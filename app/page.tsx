'use client'

import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Container from '@/components/ui/Container'
import MusicCard from '@/components/music/MusicCard'
import Player from '@/components/music/Player'
import ActivityFeed from '@/components/social/ActivityFeed'
import MobileNav from '@/components/layout/MobileNav'
import { useEffect, useState, Suspense } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'
import useUser from '@/lib/useUser'
import { ChevronRight } from 'lucide-react'

export default function Home() {
  const [songs, setSongs] = useState<Record<string, unknown>[]>([])
  const [recommended, setRecommended] = useState<Record<string, unknown>[]>([])
  const user = useUser()

  useEffect(() => {
    const fetchSongs = async () => {
      const { data } = await supabase.from('songs').select('*')
      
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

    fetchSongs()
  }, [])

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-transparent overflow-y-auto pb-32 md:pb-8">
        <Container className="px-4 md:px-8">
          <Suspense fallback={null}>
            <Header />
          </Suspense>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                  </svg>
                  <span className="text-gray-400 font-bold text-[11px] uppercase tracking-[0.2em]">Pilihan Terbaik</span>
                </div>
                <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
                  {user ? `Untuk ${user.email?.split('@')[0]}` : 'Untuk Kamu'}
                </h2>
              </div>
              <button className="flex items-center gap-1 text-(--primary) text-sm font-bold hover:gap-2 transition-all">
                Lihat Semua <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
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
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                  <span className="text-gray-400 font-bold text-[11px] uppercase tracking-[0.2em]">Eksplorasi</span>
                </div>
                <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">Sedang Tren</h2>
              </div>
              <button className="flex items-center gap-1 text-(--primary) text-sm font-bold hover:gap-2 transition-all">
                Lihat Semua <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
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
