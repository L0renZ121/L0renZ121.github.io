'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  hue: number
  life: number
}

interface ClickEffect {
  x: number
  y: number
  particles: {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    life: number
    hue: number
  }[]
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 80
    const mouse = { x: 0, y: 0, radius: 150 }
    const clickEffects: ClickEffect[] = []

    // Theme colors (purple to pink gradient)
    const colors = [
      { h: 280, s: 70, l: 60 }, // Purple
      { h: 300, s: 70, l: 60 }, // Purple-pink
      { h: 320, s: 70, l: 60 }, // Pink
      { h: 340, s: 70, l: 60 }, // Hot pink
    ]

    // Initialize particles with theme colors
    for (let i = 0; i < particleCount; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length)
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2.5 + 1,
        hue: colors[colorIndex].h,
        life: 1,
      })
    }

    // Mouse move handler - attract particles
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    // Click handler - create explosion effect
    const handleClick = (e: MouseEvent) => {
      const explosionParticles = []
      const particleNum = 30
      
      for (let i = 0; i < particleNum; i++) {
        const angle = (Math.PI * 2 * i) / particleNum
        const velocity = 3 + Math.random() * 4
        const colorIndex = Math.floor(Math.random() * colors.length)
        
        explosionParticles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * 3 + 2,
          life: 1,
          hue: colors[colorIndex].h,
        })
      }
      
      clickEffects.push({
        x: e.clientX,
        y: e.clientY,
        particles: explosionParticles,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      
      // Fade effect instead of clear for trail
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Mouse interaction - attract or repel
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * force * 0.1
          particle.vy += Math.sin(angle) * force * 0.1
        }

        // Apply velocity with damping
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        )
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, 0.8)`)
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 60%, 0.4)`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`)
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 120) {
              const opacity = (1 - distance / 120) * 0.5
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        })
      })

      // Update and draw click effects
      clickEffects.forEach((effect, effectIndex) => {
        effect.particles.forEach((p, pIndex) => {
          p.x += p.vx
          p.y += p.vy
          p.vy += 0.1 // Gravity
          p.vx *= 0.98
          p.vy *= 0.98
          p.life -= 0.015

          if (p.life > 0) {
            const gradient = ctx.createRadialGradient(
              p.x, p.y, 0,
              p.x, p.y, p.size * 2
            )
            gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${p.life})`)
            gradient.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`)
            
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()
          }
        })

        // Remove dead particles
        effect.particles = effect.particles.filter(p => p.life > 0)
        
        // Remove effect if all particles are dead
        if (effect.particles.length === 0) {
          clickEffects.splice(effectIndex, 1)
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-40" />
}
