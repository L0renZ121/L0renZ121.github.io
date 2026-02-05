'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide after 6 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <video 
        autoPlay 
        muted 
        playsInline
        className="w-full h-full object-cover"
        onEnded={() => setIsVisible(false)}
      >
        <source src="/videos/16-9_1.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
