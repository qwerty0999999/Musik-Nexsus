'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Card from '../ui/Card'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Record<string, unknown>[]>([])

  useEffect(() => {
    const fetchInitial = async () => {
      const { data } = await supabase
        .from('activities')
        .select('*, songs(title, artist)')
        .order('created_at', { ascending: false })
        .limit(10)

      setActivities(data || [])
    }

    fetchInitial()

    const channel = supabase
      .channel('realtime-activity')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activities',
        },
        (payload) => {
          setActivities((prev) => [payload.new, ...prev].slice(0, 10))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="w-80 h-screen border-l border-white/5 p-6 hidden xl:flex flex-col gap-6 sticky top-0">
      <div className="flex items-center gap-2 text-white font-bold text-lg">
        <Zap size={20} className="text-(--accent)" />
        <h3>Live Activity</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {activities.length > 0 ? activities.map((a, i) => (
            <motion.div
              key={a.id || i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="p-3! bg-white/5! hover:bg-white/10! transition group">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-(--primary)/20 flex items-center justify-center text-(--primary) text-xs font-bold">
                    {a.user_id?.substring(0, 2).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">
                      User <span className="text-(--accent)">#{a.user_id?.substring(0, 4)}</span>
                    </p>
                    <p className="text-(--muted) text-[11px] mt-0.5">
                      {a.action === 'play' ? 'Sedang memutar' : 'Menyukai'}
                    </p>
                    <p className="text-white text-[11px] font-semibold truncate mt-1 group-hover:text-(--primary) transition">
                      {a.songs?.title || 'Unknown Track'}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )) : (
            <p className="text-gray-500 text-sm text-center mt-10">Belum ada aktivitas...</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
