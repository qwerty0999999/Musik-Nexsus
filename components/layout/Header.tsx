'use client'

import { Search, Bell } from 'lucide-react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 py-4 mb-8 sticky top-0 bg-[#030303]/80 backdrop-blur-md z-40">
      <form onSubmit={handleSearch} className="relative w-full md:w-[600px] mx-auto">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
           <Search size={20} strokeWidth={2.5} />
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari lagu, artis, podcast..."
          className="w-full bg-[#1d1d1d] border border-white/5 px-14 py-3 rounded-xl outline-none text-white focus:bg-[#2a2a2a] focus:border-white/10 transition-all text-sm md:text-base font-medium placeholder:text-gray-500 shadow-inner"
        />
      </form>

      <div className="flex gap-4 items-center hidden md:flex">
        <button className="p-2.5 hover:bg-white/10 rounded-full transition text-white">
          <Bell size={22} />
        </button>
        <div className="w-9 h-9 bg-linear-to-tr from-orange-400 to-rose-500 rounded-full cursor-pointer hover:scale-105 transition active:scale-95" />
      </div>
    </div>
  )
}


