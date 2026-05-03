'use client'

import { Home, Compass, Library, PlaySquare, LogIn } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useUser from '@/lib/useUser'

export default function Sidebar() {
  const pathname = usePathname()
  const user = useUser()

  const menuItems = [
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 10V21H9V15H15V21H20V10L12 3L4 10Z" />
        </svg>
      ), 
      label: 'Beranda', 
      href: '/' 
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      ), 
      label: 'Eksplorasi', 
      href: '/search' 
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6Z" />
        </svg>
      ), 
      label: 'Koleksi', 
      href: '/library' 
    },
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

