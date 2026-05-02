'use client'

import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Container from '@/components/ui/Container'
import MobileNav from '@/components/layout/MobileNav'
import Player from '@/components/music/Player'
import ActivityFeed from '@/components/social/ActivityFeed'
import useUser from '@/lib/useUser'
import { motion } from 'framer-motion'
import { Settings, LogOut, Camera, Edit2, User } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function ProfilePage() {
  const user = useUser()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh() // Paksa refresh untuk update state user
  }

  if (user === null) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-transparent pb-32">
           <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-500">
              <User size={48} />
           </div>
           <h1 className="text-white text-3xl font-bold mb-2">Profil Pengguna</h1>
           <p className="text-gray-400 text-center max-w-sm mb-8">Daftar atau masuk ke akun kamu untuk melihat profil, statistik musik, dan mengatur pengalaman mendengarmu.</p>
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* ... (rest of the profile UI remains the same) */}
            <div className="relative h-64 bg-linear-to-r from-(--primary) to-(--accent) rounded-3xl mb-12 overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-black/20" />
               <div className="absolute bottom-[-50px] left-8 flex items-end gap-6">
                  <div className="relative group">
                    <div className="w-40 h-40 bg-gray-800 rounded-full border-8 border-[#0B0F1A] overflow-hidden shadow-xl">
                       <img src={user?.user_metadata?.avatar_url || 'https://via.placeholder.com/150'} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button className="absolute bottom-2 right-2 bg-(--primary) p-2 rounded-full text-white border-4 border-[#0B0F1A] opacity-0 group-hover:opacity-100 transition">
                      <Camera size={20} />
                    </button>
                  </div>
                  <div className="mb-14">
                    <h1 className="text-white text-4xl font-bold mb-2">{user?.email?.split('@')[0] || 'User Nexsus'}</h1>
                    <p className="text-white/70">Pengguna Sejak Mei 2026 • 24 Playlist</p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-white font-bold text-xl">Informasi Akun</h3>
                      <button className="text-(--primary) hover:underline flex items-center gap-1 text-sm font-medium">
                        <Edit2 size={14} /> Edit
                      </button>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between border-b border-white/5 pb-4">
                        <span className="text-gray-400">Email</span>
                        <span className="text-white">{user?.email || '-'}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-4">
                        <span className="text-gray-400">Username</span>
                        <span className="text-white">@{user?.email?.split('@')[0] || 'usernexus'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tipe Akun</span>
                        <span className="text-(--accent) font-semibold">Premium Member</span>
                      </div>
                   </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                   <h3 className="text-white font-bold text-xl mb-6">Statistik Musik</h3>
                   <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-2xl font-bold text-white">1.2k</p>
                        <p className="text-xs text-gray-500 uppercase">Menit</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-2xl font-bold text-white">342</p>
                        <p className="text-xs text-gray-500 uppercase">Lagu</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-2xl font-bold text-white">12</p>
                        <p className="text-xs text-gray-500 uppercase">Artis</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 text-white hover:bg-white/10 rounded-xl transition">
                    <Settings size={20} /> <span>Pengaturan</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition"
                  >
                    <LogOut size={20} /> <span>Keluar Akun</span>
                  </button>
                </div>

                <div className="bg-linear-to-br from-(--primary)/20 to-(--accent)/20 border border-white/10 rounded-2xl p-6 text-center">
                   <h4 className="text-white font-bold mb-2">Undang Teman</h4>
                   <p className="text-xs text-gray-400 mb-4">Dapatkan 1 bulan Premium Gratis dengan mengundang temanmu!</p>
                   <button className="w-full py-2 bg-white text-black font-bold rounded-lg hover:scale-105 transition">Salin Link</button>
                </div>
              </div>
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

