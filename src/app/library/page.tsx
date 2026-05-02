'use client'

import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Container from '@/components/ui/Container'
import MobileNav from '@/components/layout/MobileNav'
import Player from '@/components/music/Player'
import ActivityFeed from '@/components/social/ActivityFeed'
import useUser from '@/hooks/useUser'
import { motion } from 'framer-motion'
import { Plus, Heart, ListMusic, LogIn, Library } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function LibraryPage() {
  const user = useUser()
  
  const playlists = [
    { name: 'Santai Sore', count: 45, type: 'Playlist' },
    { name: 'Fokus Kerja', count: 28, type: 'Playlist' },
    { name: 'Workout Power', count: 15, type: 'Playlist' },
  ]

  if (user === null) {
    // Tampilan jika belum login (Guest Mode)
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-transparent pb-32">
           <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-500">
              <Library size={48} />
           </div>
           <h1 className="text-white text-3xl font-bold mb-2">Perpustakaan Kamu</h1>
           <p className="text-gray-400 text-center max-w-sm mb-8">Masuk untuk melihat lagu yang kamu sukai, playlist yang kamu buat, dan riwayat musikmu.</p>
           <Link href="/login">
              <Button className="px-10 py-4 font-bold">Masuk Sekarang</Button>
           </Link>
        </main>
        <MobileNav />
        <Player />
      </div>
    )
  }

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
                <CardLibrary title="Lagu Disukai" count={124} isLiked />
              </Link>
              
              {playlists.map((p, i) => (
                <CardLibrary key={i} title={p.name} count={p.count} />
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

function CardLibrary({ title, count, isLiked }: any) {
  return (
    <div className={`h-64 flex flex-col justify-end p-6 rounded-2xl transition cursor-pointer group ${isLiked ? 'bg-linear-to-br from-indigo-700 to-purple-800 border-none' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition duration-300 ${isLiked ? 'bg-transparent' : 'bg-white/5 group-hover:bg-(--primary)'}`}>
        {isLiked ? <Heart fill="white" size={40} className="text-white group-hover:scale-110 transition" /> : <ListMusic className="text-white" size={32} />}
      </div>
      <h2 className={`font-bold truncate ${isLiked ? 'text-2xl text-white' : 'text-xl text-white'}`}>{title}</h2>
      <p className={isLiked ? 'text-white/60' : 'text-gray-400'}>{count} Lagu</p>
    </div>
  )
}
