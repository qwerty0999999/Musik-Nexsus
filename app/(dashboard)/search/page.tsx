'use client'

import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Container from '@/components/ui/Container'
import MobileNav from '@/components/layout/MobileNav'
import Player from '@/components/music/Player'
import ActivityFeed from '@/components/social/ActivityFeed'
import MusicCard from '@/components/music/MusicCard'
import { motion } from 'framer-motion'
import { Music2, Radio, Mic2, Disc, Guitar, Piano, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { name: 'Pop', color: 'bg-pink-500', icon: <Music2 /> },
    { name: 'Hip-Hop', color: 'bg-orange-500', icon: <Mic2 /> },
    { name: 'Rock', color: 'bg-red-600', icon: <Guitar /> },
    { name: 'Classical', color: 'bg-yellow-600', icon: <Piano /> },
    { name: 'Electronic', color: 'bg-blue-500', icon: <Radio /> },
    { name: 'Jazz', color: 'bg-indigo-500', icon: <Disc /> },
    { name: 'Indie', color: 'bg-green-500', icon: <Music2 /> },
    { name: 'R&B', color: 'bg-purple-600', icon: <Mic2 /> },
  ]

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/v1/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      if (data.data) {
        setResults(data.data)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        handleSearch(query)
      } else {
        setResults([])
      }
    }, 800) // Jeda 800ms agar lebih santai

    return () => clearTimeout(timer)
  }, [query])

  return (
    <Container>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {query ? (
          <>
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-8">
              Hasil Pencarian: <span className="text-(--primary)">"{query}"</span>
            </h1>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-(--primary) mb-4" size={40} />
                <p className="text-gray-400">Mencari lagu terbaik untukmu...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {results.map((song) => (
                  <MusicCard key={song.id} song={song} />
                ))}
              </div>
            )}
            
            {!isLoading && results.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">Tidak ada hasil yang ditemukan.</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-white text-3xl font-bold mb-8">Jelajahi Genre</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${cat.color} p-6 rounded-2xl h-40 relative overflow-hidden cursor-pointer shadow-lg shadow-black/20`}
                >
                  <span className="text-xl font-bold text-white relative z-10">{cat.name}</span>
                  <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 scale-150">
                    {cat.icon}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </Container>
  )
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-32">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin text-(--primary)" size={40} /></div>}>
          <SearchContent />
        </Suspense>
      </main>
      <ActivityFeed />
      <MobileNav />
      <Player />
    </div>
  )
}
