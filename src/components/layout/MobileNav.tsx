'use client'

import { Home, Search, Library, Heart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
  const pathname = usePathname()
  
  const navItems = [
    { icon: <Home size={22} />, label: 'Home', href: '/' },
    { icon: <Search size={22} />, label: 'Search', href: '/search' },
    { icon: <Library size={22} />, label: 'Library', href: '/library' },
    { icon: <Heart size={22} />, label: 'Liked', href: '/liked' },
    { icon: <User size={22} />, label: 'Profile', href: '/profile' },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B0F1A]/90 backdrop-blur-xl border-t border-white/5 px-6 py-3 z-[60] flex justify-between items-center">
      {navItems.map((item, i) => {
        const isActive = pathname === item.href
        return (
          <Link 
            key={i} 
            href={item.href}
            className={`flex flex-col items-center gap-1 transition ${isActive ? 'text-[var(--primary)]' : 'text-gray-500'}`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
