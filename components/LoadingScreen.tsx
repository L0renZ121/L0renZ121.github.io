'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [hideAfterMs, setHideAfterMs] = useState(8000)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, hideAfterMs)

    return () => clearTimeout(timer)
  }, [hideAfterMs])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <video 
        autoPlay 
        muted 
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        onLoadedMetadata={(e) => {
          const seconds = e.currentTarget.duration
          if (Number.isFinite(seconds) && seconds > 0) {
            setHideAfterMs(seconds * 1000)
          }
        }}
        onEnded={() => setIsVisible(false)}
        onError={() => setIsVisible(false)}
      >
        <source src="/videos/16-9_1.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
