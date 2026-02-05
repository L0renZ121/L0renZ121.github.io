'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Fallback timer: Always hide after 10 seconds max
    const fallbackTimer = setTimeout(() => {
      setIsVisible(false)
    }, 10000)

    return () => clearTimeout(fallbackTimer)
  }, [])

  const handleVideoEnded = () => {
    setIsVisible(false)
  }

  const handleVideoError = () => {
    // If video fails to load, hide immediately
    setIsVisible(false)
  }

  const handleCanPlay = () => {
    // Video is ready to play - this helps with timing
    const videoElement = document.querySelector('video') as HTMLVideoElement
    if (videoElement && videoElement.duration > 0) {
      // Schedule hide based on actual video duration
      setTimeout(() => {
        setIsVisible(false)
      }, (videoElement.duration * 1000) + 500)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
        >
          <video 
            autoPlay 
            muted 
            playsInline
            preload="metadata"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover'
            }}
            onCanPlay={handleCanPlay}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
          >
            <source src="/videos/16-9_1.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
