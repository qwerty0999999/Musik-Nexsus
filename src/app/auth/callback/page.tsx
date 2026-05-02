'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { error } = await supabase.auth.getSession()
      if (!error) {
        router.push('/')
        router.refresh()
      } else {
        router.push('/login?error=auth-failed')
      }
    }
    handleAuth()
  }, [router])

  return (
    <div className="h-screen flex items-center justify-center bg-[#0B0F1A]">
      <div className="flex flex-col items-center gap-4 text-white">
        <div className="w-12 h-12 border-4 border-(--primary)/30 border-t-(--primary) rounded-full animate-spin" />
        <p className="font-bold text-lg animate-pulse">Menghubungkan Akun...</p>
      </div>
    </div>
  )
}
