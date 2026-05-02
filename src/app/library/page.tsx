'use client'

import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Container from '@/components/ui/Container'
import MobileNav from '@/components/layout/MobileNav'
import Player from '@/components/music/Player'
import ActivityFeed from '@/components/social/ActivityFeed'
import Card from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { Plus, Heart, Music, ListMusic } from 'lucide-react'
import Link from 'next/link'

export default function LibraryPage() {
  const playlists = [
    { name: 'Koleksi Favorit', count: 124, type: 'Liked Songs' },
    { name: 'Santai Sore', count: 45, type: 'Playlist' },
    { name: 'Fokus Kerja', count: 28, type: 'Playlist' },
    { name: 'Workout Power', count: 15, type: 'Playlist' },
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
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-white text-3xl font-bold">Perpustakaan Kamu</h1>
              <button className="flex items-center gap-2 bg-(--primary) px-4 py-2 rounded-xl text-white font-semibold hover:scale-105 transition active:scale-95">
                <Plus size={20} />
                <span>Buat Playlist</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Link href="/liked">
                <Card className="h-64 flex flex-col justify-end p-6 bg-linear-to-br from-indigo-700 to-purple-800 border-none cursor-pointer group">
                  <Heart fill="white" size={40} className="mb-4 text-white group-hover:scale-110 transition duration-300" />
                  <h2 className="text-2xl font-bold text-white">Lagu Disukai</h2>
                  <p className="text-white/60">124 Lagu</p>
                </Card>
              </Link>
              
              {playlists.slice(1).map((p, i) => (
                <Card key={i} className="h-64 flex flex-col justify-end p-6 hover:bg-white/10 transition cursor-pointer group">
                  <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-(--primary) transition duration-300">
                    <ListMusic className="text-white" size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-white truncate">{p.name}</h2>
                  <p className="text-gray-400">{p.count} Lagu</p>
                </Card>
              ))}
            </div>

            <h2 className="text-white text-xl font-bold mb-6">Baru Saja Diputar</h2>
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden">
                       <img src={`https://images.unsplash.com/photo-${1500000000000 + item}?w=100&h=100&fit=crop`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Judul Lagu {item}</h4>
                      <p className="text-gray-400 text-xs">Nama Artis</p>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">2 jam yang lalu</span>
                </div>
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

