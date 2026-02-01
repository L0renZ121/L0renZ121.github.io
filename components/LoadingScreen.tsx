'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [zoomPhase, setZoomPhase] = useState(false)

  useEffect(() => {
    // Start zoom phase after initial animation
    const zoomTimer = setTimeout(() => {
      setZoomPhase(true)
    }, 2000)

    // Complete loading
    const completeTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => {
      clearTimeout(zoomTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
          }}
          transition={{ 
            duration: 0.6,
            ease: 'easeInOut'
          }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center overflow-hidden"
        >
          {/* Background animated orbs */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
            animate={{ 
              y: [0, 30, 0], 
              x: [0, 20, 0],
              opacity: zoomPhase ? 0 : 0.15
            }}
            transition={{ 
              y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 0.5 }
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
            animate={{ 
              y: [0, -30, 0], 
              x: [0, -20, 0],
              opacity: zoomPhase ? 0 : 0.15
            }}
            transition={{ 
              y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 0.5 }
            }}
          />

          <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
            {/* Main Loading Text with zoom-through animation */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: zoomPhase ? 0 : 1,
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-24 flex items-center justify-center overflow-hidden perspective-1000">
                {/* AK Text with camera zoom effect */}
                <motion.div
                  className="relative"
                  initial={{ x: -300, opacity: 0, scale: 1 }}
                  animate={{ 
                    x: 0, 
                    opacity: zoomPhase ? 0 : 1,
                    scale: zoomPhase ? 20 : 1,
                    z: zoomPhase ? 1000 : 0,
                  }}
                  transition={{ 
                    x: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                    opacity: { duration: zoomPhase ? 0.5 : 0.6 },
                    scale: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] },
                    z: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <h1 className="text-6xl md:text-7xl font-bold tracking-wider">
                    <span className="text-gradient animate-gradient">AK</span>
                  </h1>

                  {/* Flowing line animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                      width: zoomPhase ? 0 : '100%', 
                      opacity: zoomPhase ? 0 : 1 
                    }}
                    transition={{
                      width: { duration: 1.4, delay: 0.2, ease: 'easeOut' },
                      opacity: { duration: 0.6, delay: zoomPhase ? 0 : 0.2 },
                    }}
                  />
                </motion.div>
              </div>

              {/* Subtitle */}
              <motion.p
                className="text-gray-400 text-lg md:text-xl mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: zoomPhase ? 0 : 1, 
                  y: zoomPhase ? -20 : 0 
                }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Crafting Digital Excellence
              </motion.p>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              className="w-full max-w-xs mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: zoomPhase ? 0 : 1, 
                y: 0 
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                  initial={{ width: '0%' }}
                  animate={{ width: zoomPhase ? '100%' : '75%' }}
                  transition={{ 
                    duration: 2.0, 
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Zoom tunnel effect - creates the illusion of entering the gap */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: zoomPhase ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Radial blur effect */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: zoomPhase ? 0.6 : 0,
              }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Tunnel rings */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-4 border-purple-500/30"
                initial={{ 
                  width: 50 + (i * 50), 
                  height: 50 + (i * 50), 
                  opacity: 0 
                }}
                animate={{ 
                  width: zoomPhase ? 2000 : 50 + (i * 50), 
                  height: zoomPhase ? 2000 : 50 + (i * 50), 
                  opacity: zoomPhase ? [0, 0.5, 0] : 0 
                }}
                transition={{ 
                  duration: 1.2,
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
