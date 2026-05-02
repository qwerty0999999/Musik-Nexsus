'use client'

import { Home, Search, Library, Heart, User, PlusSquare } from 'lucide-react'
import Link from 'next/link'

export default function Sidebar() {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', href: '/' },
    { icon: <Search size={20} />, label: 'Search', href: '/search' },
    { icon: <Library size={20} />, label: 'Library', href: '/library' },
    { icon: <Heart size={20} />, label: 'Liked', href: '/liked' },
    { icon: <User size={20} />, label: 'Profile', href: '/profile' },
  ]

  return (
    <div className="hidden md:flex w-64 h-screen bg-[#0B0F1A] border-r border-white/5 p-6 text-white flex-col sticky top-0">
      <h1 className="text-2xl font-bold mb-10 text-(--primary)">Musik Nexsus</h1>

      <nav className="space-y-6 flex-1">
        {menuItems.map((item, i) => (
          <Link 
            key={i} 
            href={item.href}
            className="flex items-center gap-4 text-gray-400 hover:text-white transition group"
          >
            <span className="group-hover:text-(--primary) transition">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <button className="flex items-center gap-4 text-gray-400 hover:text-white transition mt-auto">
        <PlusSquare size={20} />
        <span className="font-medium">Create Playlist</span>
      </button>
    </div>
  )
}

