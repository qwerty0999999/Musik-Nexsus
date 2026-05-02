'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { Music2 } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#0B0F1A] px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 border border-white/10 p-8 rounded-3xl w-full max-w-md backdrop-blur-xl"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-(--primary) rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl shadow-purple-500/20">
            <Music2 size={32} />
          </div>
          <h2 className="text-white text-3xl font-bold">Selamat Datang</h2>
          <p className="text-(--muted) mt-2 text-center">Masuk ke akun RF Music kamu dan mulai dengerin lagu favorit!</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
            <input
              type="email"
              placeholder="nama@email.com"
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-(--primary) transition"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-(--primary) transition"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button className="w-full py-4 font-bold text-lg mt-4" onClick={() => {}}>
            {loading ? 'Masuk...' : 'Masuk Sekarang'}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-8 text-sm">
          Belum punya akun?{' '}
          <Link href="/register" className="text-(--primary) font-semibold hover:underline">
            Daftar Gratis
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

