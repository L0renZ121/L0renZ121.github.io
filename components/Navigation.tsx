'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Github, Instagram, Facebook } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Detect active section
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
    { name: 'Portfolio', href: 'https://abhi88.com.np', external: true },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="text-2xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Abhi Khatiwada
          </motion.a>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = item.href === `#${activeSection}`
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`px-4 py-2 rounded-lg transition-all duration-500 relative group ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  {item.name}
                  <motion.span 
                    className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full"
                    initial={{ width: 0, x: '-50%' }}
                    animate={{ 
                      width: isActive ? '60%' : 0,
                      x: '-50%'
                    }}
                    whileHover={{ width: '60%' }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  />
                </motion.a>
              )
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.a 
              href="https://github.com/AA-maker-dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/70 hover:text-white transition-colors duration-300" 
              whileHover={{ scale: 1.15, y: -2 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/abhi_khatiwada/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/70 hover:text-pink-400 transition-colors duration-300" 
              whileHover={{ scale: 1.15, y: -2 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <Instagram size={20} />
            </motion.a>
            <motion.a 
              href="https://www.facebook.com/khatiwada.abhi/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/70 hover:text-blue-400 transition-colors duration-300" 
              whileHover={{ scale: 1.15, y: -2 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <Facebook size={20} />
            </motion.a>
          </div>

          <motion.button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.9 }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 glass rounded-lg p-4"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="block py-3 text-white/80 hover:text-white"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
