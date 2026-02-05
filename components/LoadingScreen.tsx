'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [durationMs, setDurationMs] = useState<number | null>(null)

  useEffect(() => {
    if (!durationMs) return

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, durationMs)

    return () => clearTimeout(timer)
  }, [durationMs])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden intro-overlay">
      <video 
        autoPlay 
        muted 
        playsInline
        className="w-full h-full object-cover"
        onLoadedMetadata={(e) => {
          const seconds = e.currentTarget.duration
          if (Number.isFinite(seconds) && seconds > 0) {
            setDurationMs(seconds * 1000)
          }
        }}
        onEnded={() => setIsVisible(false)}
      >
        <source src="/videos/16-9_1.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
