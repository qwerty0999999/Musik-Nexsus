'use client'

import { Home, Compass, Library, PlaySquare, LogIn } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useUser from '@/lib/useUser'

export default function Sidebar() {
  const pathname = usePathname()
  const user = useUser()

  const menuItems = [
    { icon: <Home size={22} />, label: 'Beranda', href: '/' },
    { icon: <Compass size={22} />, label: 'Eksplorasi', href: '/search' },
    { icon: <Library size={22} />, label: 'Koleksi', href: '/library' },
  ]

  return (
    <div className="hidden md:flex w-60 h-screen bg-[#030303] border-r border-white/5 p-4 text-white flex-col sticky top-0">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Nexsus Music</h1>
      </div>

      <nav className="space-y-1 flex-1">
        {menuItems.map((item, i) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={i} 
              href={item.href}
              className={`flex items-center gap-6 px-3 py-3 rounded-xl transition ${isActive ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <span className={isActive ? 'text-white' : ''}>
                {item.icon}
              </span>
              <span className="text-[15px] tracking-wide">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/5 space-y-2">
        {user ? (
          <Link 
            href="/profile"
            className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 transition"
          >
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold">
              {user.email?.substring(0, 1).toUpperCase()}
            </div>
            <span className="text-sm font-medium truncate">{user.email?.split('@')[0]}</span>
          </Link>
        ) : (
          <Link 
            href="/login"
            className="flex items-center gap-4 px-4 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            <LogIn size={20} />
            <span className="font-bold text-sm">Masuk</span>
          </Link>
        )}
      </div>
    </div>
  )
}

