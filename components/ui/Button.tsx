'use client'

import { motion, HTMLMotionProps } from 'framer-motion'

import React from 'react'

export default function Button({ children, onClick, className, ...props }: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl bg-(--primary) text-white shadow-lg shadow-purple-500/20 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}


