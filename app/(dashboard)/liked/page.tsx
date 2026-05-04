'use client'

import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Container from '@/components/ui/Container'
import MobileNav from '@/components/layout/MobileNav'
import Player from '@/components/music/Player'
import ActivityFeed from '@/components/social/ActivityFeed'
import useUser from '@/lib/useUser'
import { motion } from 'framer-motion'
import { Heart, Play, Clock, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function LikedSongsPage() {
  const user = useUser()
  
  const songs = [
    { id: 1, title: 'Summer Memories', artist: 'Sunny Day', duration: '3:45', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop' },
    { id: 2, title: 'Neon Lights', artist: 'Cyber City', duration: '4:12', cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&h=100&fit=crop' },
    { id: 3, title: 'Forest Rain', artist: 'Zen Nature', duration: '5:30', cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop' },
  ]

  if (user === null) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-transparent pb-32">
           <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-(--primary)">
              <Heart size={48} fill="currentColor" />
           </div>
           <h1 className="text-white text-3xl font-bold mb-2">Lagu Disukai</h1>
           <p className="text-gray-400 text-center max-w-sm mb-8">Masuk untuk melihat semua lagu yang pernah kamu beri tanda suka.</p>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col md:flex-row items-end gap-8 mb-12">
               <div className="w-64 h-64 bg-linear-to-br from-indigo-600 to-purple-800 rounded-2xl shadow-2xl flex items-center justify-center">
                  <Heart fill="white" size={120} className="text-white" />
               </div>
               <div className="flex-1">
                  <p className="text-white text-sm font-bold uppercase tracking-wider mb-2">Playlist</p>
                  <h1 className="text-white text-5xl md:text-7xl font-bold mb-6">Lagu Disukai</h1>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="font-bold text-white">{user?.email?.split('@')[0]}</span>
                    <span>• 124 Lagu</span>
                    <span>• 6 jam 45 menit</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
               <button className="w-14 h-14 bg-(--primary) rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition active:scale-95">
                  <Play fill="currentColor" size={28} className="ml-1" />
               </button>
               <Heart size={32} className="text-(--primary) cursor-pointer" fill="currentColor" />
               <MoreHorizontal size={32} className="text-gray-500 cursor-pointer hover:text-white transition" />
            </div>

            <div className="w-full">
               <div className="grid grid-cols-[16px_1fr_120px_40px] gap-4 px-4 py-2 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-white/5 mb-4">
                  <span>#</span>
                  <span>Judul</span>
                  <span>Durasi</span>
                  <span className="flex justify-center"><Clock size={16} /></span>
               </div>

               {songs.map((song, i) => (
                  <div key={song.id} className="grid grid-cols-[16px_1fr_120px_40px] gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition group cursor-pointer items-center">
                    <span className="text-gray-500 text-sm group-hover:hidden">{i + 1}</span>
                    <Play size={14} className="text-white hidden group-hover:block" fill="currentColor" />
                    <div className="flex items-center gap-3">
                       <img src={song.cover} alt="" className="w-10 h-10 rounded shadow-md" />
                       <div>
                          <p className="text-white font-medium text-sm truncate">{song.title}</p>
                          <p className="text-gray-500 text-xs truncate">{song.artist}</p>
                       </div>
                    </div>
                    <span className="text-gray-500 text-sm">{song.duration}</span>
                    <div className="flex justify-center">
                       <Heart size={16} className="text-(--primary)" fill="currentColor" />
                    </div>
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

