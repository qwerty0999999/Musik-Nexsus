'use client'

import { Home, Search, Library, Heart, User, PlusSquare, LogIn } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useUser from '@/lib/useUser'

export default function Sidebar() {
  const pathname = usePathname()
  const user = useUser()

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', href: '/' },
    { icon: <Search size={20} />, label: 'Search', href: '/search' },
    { icon: <Library size={20} />, label: 'Library', href: '/library' },
    { icon: <Heart size={20} />, label: 'Liked', href: '/liked' },
  ]

  return (
    <div className="hidden md:flex w-64 h-screen bg-[#0B0F1A] border-r border-white/5 p-6 text-white flex-col sticky top-0">
      <h1 className="text-2xl font-bold mb-10 text-(--primary)">Musik Nexsus</h1>

      <nav className="space-y-6 flex-1">
        {menuItems.map((item, i) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={i} 
              href={item.href}
              className={`flex items-center gap-4 transition group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <span className={`${isActive ? 'text-(--primary)' : 'group-hover:text-(--primary)'} transition`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <button className="flex items-center gap-4 text-gray-400 hover:text-white transition w-full">
          <PlusSquare size={20} />
          <span className="font-medium">Create Playlist</span>
        </button>

        {user ? (
          <Link 
            href="/profile"
            className={`flex items-center gap-4 transition ${pathname === '/profile' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <div className="w-6 h-6 rounded-full bg-(--primary) flex items-center justify-center text-[10px] font-bold">
              {user.email?.substring(0, 1).toUpperCase()}
            </div>
            <span className="font-medium truncate">{user.email?.split('@')[0]}</span>
          </Link>
        ) : (
          <Link 
            href="/login"
            className="flex items-center gap-4 text-(--primary) hover:brightness-125 transition"
          >
            <LogIn size={20} />
            <span className="font-bold">Sign In</span>
          </Link>
        )}
      </div>
    </div>
  )
}

