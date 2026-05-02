'use client'

import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Container from '@/components/ui/Container'
import MobileNav from '@/components/layout/MobileNav'
import Player from '@/components/music/Player'
import ActivityFeed from '@/components/social/ActivityFeed'
import { motion } from 'framer-motion'
import { Music2, Radio, Mic2, Disc, Guitar, Piano } from 'lucide-react'

export default function SearchPage() {
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

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-32">
        <Container>
          <Header />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
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
          </motion.div>
        </Container>
      </main>
      <ActivityFeed />
      <MobileNav />
      <Player />
    </div>
  )
}


