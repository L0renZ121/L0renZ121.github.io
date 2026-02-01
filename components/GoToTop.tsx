'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function GoToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full glass group hover:shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Go to top"
        >
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 360]
            }}
            transition={{
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }
            }}
          >
            <Image
              src="/up-arrow.png"
              alt="Go to top"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
