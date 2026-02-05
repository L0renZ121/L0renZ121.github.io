'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [showVideo, setShowVideo] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Set a timeout to start fading after 7 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 7000)

    // Set a timeout to completely hide after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowVideo(false)
    }, 8000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  const handleVideoEnd = () => {
    // If video ends before 8 seconds, fade out and hide immediately
    setIsFading(true)
    const timer = setTimeout(() => setShowVideo(false), 500)
    return () => clearTimeout(timer)
  }

  return (
    <AnimatePresence mode="wait">
      {showVideo && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isFading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
        >
          <video 
            autoPlay 
            muted 
            playsInline
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
            style={{ display: 'block' }}
          >
            <source src="/videos/16-9_1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
