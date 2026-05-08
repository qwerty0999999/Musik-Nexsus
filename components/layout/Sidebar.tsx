'use client'

import { LogIn, Home, Search, Library } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useUser from '@/lib/useUser'

export default function Sidebar() {
  const pathname = usePathname()
  const user = useUser()

  const menuItems = [
    { 
      icon: <Home size={24} />, 
      label: 'Beranda', 
      href: '/' 
    },
    { 
      icon: <Search size={24} />, 
      label: 'Cari', 
      href: '/search' 
    },
    { 
      icon: <Library size={24} />, 
      label: 'Koleksi Kamu', 
      href: '/library' 
    },
  ]

  return (
    <div className="hidden md:flex w-64 h-screen bg-near-black p-6 text-white flex-col sticky top-0">
      <div className="flex items-center gap-2 mb-8 px-2 group cursor-pointer">
        <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center text-black">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">Nexsus</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item, i) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={i} 
              href={item.href}
              className={`flex items-center gap-4 py-2 px-1 transition-colors duration-200 ${isActive ? 'text-white' : 'text-silver hover:text-white'}`}
            >
              <span className={isActive ? 'text-white' : 'text-silver'}>
                {item.icon}
              </span>
              <span className={`text-[14px] ${isActive ? 'font-bold' : 'font-semibold'}`}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
        {user ? (
          <Link 
            href="/profile"
            className="flex items-center gap-4 py-2 px-1 text-silver hover:text-white transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-dark-card flex items-center justify-center text-[10px] font-bold border border-white/10">
              {user.email?.substring(0, 1).toUpperCase()}
            </div>
            <span className="text-sm font-semibold truncate">{user.email?.split('@')[0]}</span>
          </Link>
        ) : (
          <Link 
            href="/login"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-full hover:scale-105 transition active:scale-95"
          >
            <span className="font-bold text-sm uppercase tracking-wider">Masuk</span>
          </Link>
        )}
      </div>
    </div>
  )
}

