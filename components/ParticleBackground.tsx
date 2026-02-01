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
  ripples: {
    radius: number
    opacity: number
  }[]
}

interface HoverEffect {
  x: number
  y: number
  radius: number
  opacity: number
  hue: number
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
    const particleCount = 100
    const mouse = { x: 0, y: 0, radius: 200, isMoving: false }
    const clickEffects: ClickEffect[] = []
    const hoverEffects: HoverEffect[] = []
    let lastMouseTime = Date.now()

    // Theme colors (purple to pink to cyan gradient)
    const colors = [
      { h: 280, s: 80, l: 65 }, // Purple
      { h: 300, s: 80, l: 65 }, // Purple-pink
      { h: 320, s: 80, l: 65 }, // Pink
      { h: 340, s: 80, l: 65 }, // Hot pink
      { h: 190, s: 80, l: 60 }, // Cyan
    ]

    // Initialize particles with theme colors
    for (let i = 0; i < particleCount; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length)
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 3 + 1,
        hue: colors[colorIndex].h,
        life: 1,
      })
    }

    // Mouse move handler - attract particles with trail effect
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.isMoving = true
      
      // Create hover trail effect
      if (now - lastMouseTime > 30) {
        const colorIndex = Math.floor(Math.random() * colors.length)
        hoverEffects.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          opacity: 0.6,
          hue: colors[colorIndex].h,
        })
        lastMouseTime = now
      }
    }

    // Click handler - create spectacular explosion with shockwave
    const handleClick = (e: MouseEvent) => {
      const explosionParticles = []
      const particleNum = 50
      
      // Create burst particles
      for (let i = 0; i < particleNum; i++) {
        const angle = (Math.PI * 2 * i) / particleNum + (Math.random() - 0.5) * 0.5
        const velocity = 4 + Math.random() * 6
        const colorIndex = Math.floor(Math.random() * colors.length)
        
        explosionParticles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * 4 + 2,
          life: 1,
          hue: colors[colorIndex].h,
        })
      }
      
      // Create concentric ripples
      const ripples = []
      for (let i = 0; i < 3; i++) {
        ripples.push({
          radius: 0,
          opacity: 0.8,
        })
      }
      
      clickEffects.push({
        x: e.clientX,
        y: e.clientY,
        particles: explosionParticles,
        ripples: ripples,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      
      // Fade effect for smooth trails
      ctx.fillStyle = 'rgba(15, 23, 42, 0.12)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw hover effects
      hoverEffects.forEach((effect, index) => {
        effect.radius += 3
        effect.opacity -= 0.02
        
        if (effect.opacity > 0) {
          // Outer glow ring
          const gradient = ctx.createRadialGradient(
            effect.x, effect.y, effect.radius * 0.5,
            effect.x, effect.y, effect.radius
          )
          gradient.addColorStop(0, `hsla(${effect.hue}, 90%, 70%, ${effect.opacity * 0.3})`)
          gradient.addColorStop(0.7, `hsla(${effect.hue}, 90%, 70%, ${effect.opacity * 0.5})`)
          gradient.addColorStop(1, `hsla(${effect.hue}, 90%, 70%, 0)`)
          
          ctx.beginPath()
          ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
          
          // Inner bright core
          ctx.beginPath()
          ctx.arc(effect.x, effect.y, effect.radius * 0.3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${effect.hue}, 100%, 80%, ${effect.opacity * 0.4})`
          ctx.fill()
        } else {
          hoverEffects.splice(index, 1)
        }
      })

      // Update and draw particles with enhanced effects
      particles.forEach((particle, i) => {
        // Mouse interaction - magnetic attraction with push-pull effect
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < mouse.radius && mouse.isMoving) {
          const force = (mouse.radius - distance) / mouse.radius
          const angle = Math.atan2(dy, dx)
          
          // Attract close to mouse, repel at very close distance
          if (distance < 50) {
            particle.vx -= Math.cos(angle) * force * 0.3
            particle.vy -= Math.sin(angle) * force * 0.3
          } else {
            particle.vx += Math.cos(angle) * force * 0.15
            particle.vy += Math.sin(angle) * force * 0.15
          }
          
          // Pulse effect near mouse
          particle.size = Math.min(particle.size * 1.02, 5)
        } else {
          // Return to original size
          particle.size = Math.max(particle.size * 0.98, 2)
        }

        // Apply velocity with damping
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.97
        particle.vy *= 0.97

        // Bounce off walls with energy retention
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.9
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.9
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Draw particle with enhanced glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        )
        gradient.addColorStop(0, `hsla(${particle.hue}, 90%, 70%, 1)`)
        gradient.addColorStop(0.3, `hsla(${particle.hue}, 90%, 70%, 0.6)`)
        gradient.addColorStop(0.7, `hsla(${particle.hue}, 90%, 70%, 0.3)`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 90%, 70%, 0)`)
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core bright center
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 85%, 0.9)`
        ctx.fill()

        // Draw enhanced connections
        particles.forEach((otherParticle, j) => {
          if (i < j) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              const opacity = (1 - distance / 150) * 0.6
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y,
                otherParticle.x, otherParticle.y
              )
              gradient.addColorStop(0, `hsla(${particle.hue}, 90%, 70%, ${opacity})`)
              gradient.addColorStop(1, `hsla(${otherParticle.hue}, 90%, 70%, ${opacity})`)
              
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = gradient
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        })
      })

      // Update and draw click effects with shockwaves
      clickEffects.forEach((effect, effectIndex) => {
        // Draw ripples
        effect.ripples.forEach((ripple, rippleIndex) => {
          ripple.radius += 8 + rippleIndex * 2
          ripple.opacity -= 0.012
          
          if (ripple.opacity > 0) {
            // Shockwave ring
            ctx.beginPath()
            ctx.arc(effect.x, effect.y, ripple.radius, 0, Math.PI * 2)
            ctx.strokeStyle = `hsla(280, 90%, 70%, ${ripple.opacity})`
            ctx.lineWidth = 3
            ctx.stroke()
            
            // Outer glow
            ctx.beginPath()
            ctx.arc(effect.x, effect.y, ripple.radius, 0, Math.PI * 2)
            ctx.strokeStyle = `hsla(320, 90%, 70%, ${ripple.opacity * 0.5})`
            ctx.lineWidth = 6
            ctx.stroke()
          }
        })
        
        // Update explosion particles
        effect.particles.forEach((p, pIndex) => {
          p.x += p.vx
          p.y += p.vy
          p.vy += 0.08 // Gravity
          p.vx *= 0.99
          p.vy *= 0.99
          p.life -= 0.01

          if (p.life > 0) {
            // Particle trail
            const gradient = ctx.createRadialGradient(
              p.x, p.y, 0,
              p.x, p.y, p.size * 3
            )
            gradient.addColorStop(0, `hsla(${p.hue}, 90%, 75%, ${p.life})`)
            gradient.addColorStop(0.5, `hsla(${p.hue}, 90%, 75%, ${p.life * 0.5})`)
            gradient.addColorStop(1, `hsla(${p.hue}, 90%, 75%, 0)`)
            
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()
            
            // Bright core
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${p.life})`
            ctx.fill()
          }
        })

        // Remove dead particles and ripples
        effect.particles = effect.particles.filter(p => p.life > 0)
        effect.ripples = effect.ripples.filter(r => r.opacity > 0)
        
        // Remove effect if all elements are dead
        if (effect.particles.length === 0 && effect.ripples.length === 0) {
          clickEffects.splice(effectIndex, 1)
        }
      })

      // Reset mouse moving state
      setTimeout(() => { mouse.isMoving = false }, 100)

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

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-50" />
}
