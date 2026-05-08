'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import React from 'react'

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ 
  children, 
  onClick, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-spotify-green text-black hover:scale-105 active:scale-95',
    secondary: 'bg-white text-black hover:scale-105 active:scale-95',
    outline: 'bg-transparent border border-border-gray text-white hover:border-white',
    ghost: 'bg-transparent text-silver hover:text-white'
  }

  const sizes = {
    sm: 'px-4 py-1.5 text-[12px] font-bold',
    md: 'px-8 py-3 text-[14px] font-bold',
    lg: 'px-10 py-4 text-[16px] font-bold'
  }

  return (
    <motion.button
      onClick={onClick}
      className={`
        rounded-full 
        uppercase 
        tracking-[1.4px] 
        transition-all 
        duration-200
        flex items-center justify-center
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}
