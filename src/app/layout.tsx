import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Musik Nexsus',
  description: 'Futuristic Music Streaming Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0B0F1A] text-white selection:bg-[var(--primary)] selection:text-white`}>
        {/* Animated Background Gradients */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute w-[800px] h-[800px] bg-[var(--primary)] opacity-[0.15] blur-[150px] rounded-full -top-1/4 -left-1/4 animate-pulse" />
          <div className="absolute w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.1] blur-[120px] rounded-full -bottom-1/4 -right-1/4 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {children}
      </body>
    </html>
  )
}
