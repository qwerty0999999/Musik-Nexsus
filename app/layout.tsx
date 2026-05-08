import '@/app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nexsus Music',
  description: 'Spotify Inspired Music Platform',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="dark">
      <body className="bg-near-black text-white selection:bg-spotify-green selection:text-black antialiased">
        {children}
      </body>
    </html>
  )
}
