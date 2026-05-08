import React from 'react'

export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-dark-surface hover:bg-mid-dark transition-colors duration-300 rounded-lg p-4 group ${className}`}>
      {children}
    </div>
  )
}
