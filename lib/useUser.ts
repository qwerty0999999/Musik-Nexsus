'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface AppUser {
  id: string;
  email?: string;
  user_metadata?: { avatar_url?: string };
  [key: string]: unknown;
}

export default function useUser() {
  const [user, setUser] = useState<AppUser | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user as unknown as AppUser)
    })
  }, [])

  return user
}
