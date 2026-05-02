'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { Music2, AlertCircle } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  // Cek jika sudah login, lempar ke home
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) router.push('/')
    }
    checkUser()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      if (data.user) {
        router.push('/')
        router.refresh()
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Gagal login. Periksa kembali email dan password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#0B0F1A] px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 border border-white/10 p-8 rounded-3xl w-full max-w-md backdrop-blur-xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-(--primary) rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl shadow-purple-500/20">
            <Music2 size={32} />
          </div>
          <h2 className="text-white text-3xl font-bold">Selamat Datang</h2>
          <p className="text-(--muted) mt-2 text-center text-sm px-4">Masuk ke akun Musik Nexsus kamu untuk mulai streaming!</p>
        </div>

        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm"
          >
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block font-bold uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              placeholder="nama@email.com"
              className="w-full p-3.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-(--primary) transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1.5 block font-bold uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-(--primary) transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-(--primary) hover:underline font-semibold">Lupa Password?</button>
          </div>

          <Button 
            className="w-full py-4 font-bold text-lg mt-2 shadow-purple-500/30" 
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Memproses...</span>
              </div>
            ) : 'Masuk Sekarang'}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-8 text-sm">
          Belum punya akun?{' '}
          <Link href="/register" className="text-(--primary) font-bold hover:underline">
            Daftar Gratis
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
