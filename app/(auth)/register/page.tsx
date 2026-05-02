'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) router.push('/')
    }
    checkUser()
  }, [router])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccess(false)

    try {
      if (password.length < 6) {
        throw new Error('Password minimal harus 6 karakter.')
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      })

      if (error) throw error

      if (data.user && data.user.identities?.length === 0) {
        throw new Error('Email ini sudah terdaftar. Silakan login.')
      }

      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (error: any) {
      setErrorMsg(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error: any) {
      setErrorMsg(error.message || 'Gagal login dengan Google.')
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
          <div className="w-16 h-16 bg-(--accent) rounded-2xl flex items-center justify-center text-black mb-4 shadow-xl shadow-cyan-400/20">
            <UserPlus size={32} />
          </div>
          <h2 className="text-white text-3xl font-bold">Daftar Akun</h2>
          <p className="text-(--muted) mt-2 text-center text-sm px-4">Bergabunglah dan mulai dengarkan koleksi lagu terbaik kami!</p>
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

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400 text-sm"
          >
            <CheckCircle2 size={18} />
            <span>Pendaftaran berhasil! Cek email untuk verifikasi (atau langsung login jika auto-confirm aktif).</span>
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block font-bold uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              placeholder="nama@email.com"
              className="w-full p-3.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-(--accent) transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1.5 block font-bold uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              placeholder="Min. 6 karakter"
              className="w-full p-3.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-(--accent) transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button 
            className="w-full py-4 font-bold text-lg mt-2 !bg-(--accent) !text-black !shadow-cyan-400/20" 
            disabled={loading || success}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Mendaftarkan...</span>
              </div>
            ) : 'Buat Akun Sekarang'}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0B0F1A] px-2 text-gray-500">Atau daftar dengan</span></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition shadow-lg active:scale-95"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          <span>Google</span>
        </button>

        <p className="text-center text-gray-400 mt-8 text-sm">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-(--accent) font-bold hover:underline">
            Login di sini
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

