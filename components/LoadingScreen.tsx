'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [zoomPhase, setZoomPhase] = useState(false)

  useEffect(() => {
    // Scroll to top and prevent hash-based navigation during loading
    window.scrollTo(0, 0)
    
    // Disable hash-based scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Start zoom phase after initial animation
    const zoomTimer = setTimeout(() => {
      setZoomPhase(true)
    }, 2000)

    // Complete loading
    const completeTimer = setTimeout(() => {
      setIsLoading(false)
      // Re-enable scroll restoration after loading
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
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
                  initial={{ x: -300, opacity: 0, scale: 1, letterSpacing: '0.1em' }}
                  animate={{ 
                    x: 0, 
                    opacity: zoomPhase ? 0 : 1,
                    scale: zoomPhase ? 30 : 1,
                    z: zoomPhase ? 1500 : 0,
                    letterSpacing: zoomPhase ? '2em' : '0.1em',
                  }}
                  transition={{ 
                    x: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                    opacity: { duration: zoomPhase ? 0.6 : 0.6 },
                    scale: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] },
                    z: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] },
                    letterSpacing: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <h1 className="text-6xl md:text-7xl font-bold">
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
                Abhi Khatiwada
              </motion.p>
            </motion.div>

            {/* Removed Loading Bar */}
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
            {/* White light glow from the gap */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-white via-purple-500/50 to-transparent"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: zoomPhase ? [0, 0.4, 1] : 0,
                scale: zoomPhase ? [0.5, 1, 2] : 0.5,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            
            {/* Dark vignette edges */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: zoomPhase ? 0.8 : 0,
              }}
              transition={{ duration: 0.8 }}
              style={{
                maskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
              }}
            />
            
            {/* Expanding tunnel rings */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-4 border-purple-400/40"
                initial={{ 
                  width: 30 + (i * 40), 
                  height: 30 + (i * 40), 
                  opacity: 0 
                }}
                animate={{ 
                  width: zoomPhase ? 3000 : 30 + (i * 40), 
                  height: zoomPhase ? 3000 : 30 + (i * 40), 
                  opacity: zoomPhase ? [0, 0.6, 0] : 0 
                }}
                transition={{ 
                  duration: 1.3,
                  delay: i * 0.08,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              />
            ))}
            
            {/* Speed lines effect */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const startX = Math.cos(angle) * 100;
              const startY = Math.sin(angle) * 100;
              
              return (
                <motion.div
                  key={`line-${i}`}
                  className="absolute w-1 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
                  style={{
                    height: '200px',
                    left: `calc(50% + ${startX}px)`,
                    top: `calc(50% + ${startY}px)`,
                    transform: `rotate(${i * 30}deg)`,
                    transformOrigin: 'center',
                  }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: zoomPhase ? [0, 0.8, 0] : 0,
                    scaleY: zoomPhase ? [0, 2, 4] : 0,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2 + (i * 0.03),
                    ease: 'easeOut'
                  }}
                />
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
