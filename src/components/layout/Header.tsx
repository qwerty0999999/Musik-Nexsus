'use client'

import { Search, Bell } from 'lucide-react'

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-6 md:mb-8">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input
          placeholder="Cari lagu, artis..."
          className="w-full bg-white/5 border border-white/10 px-10 py-2 md:py-2.5 rounded-full outline-none text-white focus:border-(--primary) transition text-xs md:text-base"
        />
      </div>

      <div className="flex gap-3 items-center self-end md:self-auto">
        <button className="hidden sm:block p-2.5 bg-white/5 rounded-full hover:bg-white/10 transition text-gray-400 hover:text-white">
          <Bell size={18} />
        </button>
        <div className="w-8 h-8 md:w-10 md:h-10 bg-(--primary) rounded-full border-2 border-white/10 cursor-pointer shadow-lg shadow-purple-500/20" />
      </div>
    </div>
  )
}

