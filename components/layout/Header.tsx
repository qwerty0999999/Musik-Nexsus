'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Bell, User } from 'lucide-react'

export default function Header() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4 mb-8 sticky top-0 bg-background/80 backdrop-blur-md z-40 px-4 md:px-0">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <form onSubmit={handleSearch} className="relative w-full md:w-[400px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-silver group-focus-within:text-white transition-colors">
            <Search size={20} />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Apa yang ingin kamu dengar?"
            className="w-full bg-mid-dark border-none px-12 py-3 rounded-full outline-none text-white focus:ring-1 focus:ring-white transition-all text-[14px] font-medium placeholder:text-silver"
          />
        </form>
      </div>

      <div className="flex gap-4 items-center hidden md:flex">
        <button className="p-2 text-silver hover:text-white transition-colors">
          <Bell size={20} />
        </button>
        <div className="w-8 h-8 bg-mid-dark rounded-full flex items-center justify-center text-silver hover:text-white cursor-pointer hover:scale-105 transition active:scale-95 border border-white/10">
          <User size={18} />
        </div>
      </div>
    </div>
  )
}


