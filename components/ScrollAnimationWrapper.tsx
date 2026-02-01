'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollAnimationWrapperProps {
  children: ReactNode
  delay?: number
  duration?: number
  variant?: 'fadeInUp' | 'fadeInDown' | 'slideInLeft' | 'slideInRight' | 'zoomIn' | 'rotateIn'
  className?: string
}

const variants = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -60 },
    whileInView: { opacity: 1, y: 0 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    whileInView: { opacity: 1, x: 0 },
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -10, scale: 0.9 },
    whileInView: { opacity: 1, rotate: 0, scale: 1 },
  },
}

export default function ScrollAnimationWrapper({
  children,
  delay = 0,
  duration = 0.8,
  variant = 'fadeInUp',
  className = '',
}: ScrollAnimationWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const selectedVariant = variants[variant]

  return (
    <motion.div
      ref={ref}
      initial={selectedVariant.initial}
      animate={isInView ? selectedVariant.whileInView : selectedVariant.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
