'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'DISCOVER', icon: 'explore', path: '/discover' },
    { name: 'LIBRARY', icon: 'library_music', path: '#' },
    { name: 'PLAYER', icon: 'graphic_eq', path: '/player' },
    { name: 'SEARCH', icon: 'search', path: '#' },
    { name: 'PROFILE', icon: 'person', path: '#' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-6 py-4 max-w-2xl mx-auto rounded-[24px] border border-white/10 m-6 mb-10 shadow-[0_0_30px_rgba(163,230,53,0.15)] bg-[#1A1A1A]/60 backdrop-blur-[40px] md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.path || (item.path === '/discover' && pathname === '/');
        
        return (
          <Link 
            key={item.name}
            href={item.path}
            className={`flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
              isActive 
                ? 'text-tertiary neon-glow-active scale-110 drop-shadow-[0_0_8px_rgba(0,226,147,0.8)]' 
                : 'text-white/40 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
              {item.icon}
            </span>
            <span className="font-h1 text-[10px] uppercase font-bold tracking-widest">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
