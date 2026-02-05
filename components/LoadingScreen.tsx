'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [showFallback, setShowFallback] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Fallback timer: Always hide after 8 seconds max
    const fallbackTimer = setTimeout(() => {
      setIsVisible(false)
    }, 8000)

    // Show fallback text if video doesn't load in 1 second
    const fallbackTextTimer = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 2) {
        setShowFallback(true)
      }
    }, 1000)

    // Try to play video manually for mobile
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play()
        } catch (error) {
          console.log('Video autoplay failed, showing fallback')
          setShowFallback(true)
        }
      }
    }
    playVideo()

    return () => {
      clearTimeout(fallbackTimer)
      clearTimeout(fallbackTextTimer)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleVideoEnded = () => {
    setIsVisible(false)
  }

  const handleVideoError = () => {
    setShowFallback(true)
    // Hide after 3 seconds if video fails
    setTimeout(() => setIsVisible(false), 3000)
  }

  const handleCanPlay = () => {
    setShowFallback(false)
    const videoElement = videoRef.current
    if (videoElement && videoElement.duration > 0) {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
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
          className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 z-50 flex items-center justify-center overflow-hidden"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
            x5-playsinline="true"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
              opacity: showFallback ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}
            onCanPlay={handleCanPlay}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            onLoadedData={() => setShowFallback(false)}
          >
            <source src="/videos/16-9_1.mp4" type="video/mp4" />
          </video>
          
          {/* Fallback content for when video doesn't load */}
          {showFallback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center z-10"
            >
              <h1 className="text-7xl md:text-9xl font-black font-display tracking-tight mb-4 text-gradient-video">
                ABHI
              </h1>
              <p className="text-xl md:text-2xl text-gray-400">Loading...</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
