'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [showVideo, setShowVideo] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const videoTimer = setTimeout(() => {
      setIsFading(true)
    }, 8000) // Start fade after 8 seconds

    const hideTimer = setTimeout(() => {
      setShowVideo(false)
    }, 9000) // Hide after fade completes (1 second fade)

    return () => {
      clearTimeout(videoTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  const handleVideoEnd = () => {
    setIsFading(true)
    setTimeout(() => setShowVideo(false), 1000)
  }

  return (
    <AnimatePresence mode="wait">
      {showVideo && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isFading ? 0 : 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          <video 
            autoPlay 
            muted 
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
          >
            <source src="/videos/16-9_1.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
