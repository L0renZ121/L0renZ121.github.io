'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center overflow-hidden"
    >
      {/* Background animated orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        {/* Main Loading Text with flowing animation */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-24 flex items-center justify-center overflow-hidden">
            {/* Flowing gradient text from left to right */}
            <motion.div
              className="relative"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="text-6xl md:text-7xl font-bold">
                <span className="text-gradient animate-gradient">AK</span>
              </h1>

              {/* Flowing line animation from left to right */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{
                  width: { duration: 1.4, delay: 0.2, ease: 'easeOut' },
                  opacity: { duration: 0.6, delay: 0.2 },
                }}
              />
            </motion.div>
          </div>

          {/* Subtitle with staggered animation */}
          <motion.p
            className="text-gray-400 text-lg md:text-xl mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Crafting Digital Excellence
          </motion.p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="w-full max-w-xs mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
            {/* Primary animated bar flowing left to right */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              initial={{ x: '-100%', width: '40%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 2,
                ease: 'linear',
                repeat: Infinity,
              }}
            />

            {/* Secondary shimmer effect */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent"
              initial={{ x: '-100%', width: '30%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 2.5,
                ease: 'linear',
                repeat: Infinity,
                delay: 0.3,
              }}
            />
          </div>

          {/* Loading percentage text */}
          <motion.p
            className="text-center text-gray-500 text-sm mt-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.p>
        </motion.div>

        {/* Floating dots animation */}
        <motion.div
          className="flex gap-2 justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Status messages with typing animation */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-500 text-sm">
            {['Initializing...', 'Loading portfolio...', 'Preparing experience...'].map(
              (text, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.8,
                    delay: 0.8 + idx * 0.6,
                    times: [0, 0.5, 1],
                  }}
                  className="block"
                >
                  {text}
                </motion.span>
              )
            )}
          </p>
        </motion.div>
      </div>

      {/* Corner accent elements */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-40 border-2 border-purple-500/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 border-2 border-pink-500/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  )
}
