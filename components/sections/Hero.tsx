'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated gradient orbs */}
      <motion.div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <motion.div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <motion.div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm mb-4 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
              <span className="text-gradient font-semibold">Available for freelance</span>
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            Hi, I'm{' '}
            <motion.span
              className="text-gradient animate-gradient inline-block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Abhi
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4"
          >
            <motion.span className="text-gradient-blue inline-block hover:scale-105 transition-transform duration-300">
              Full-Stack Developer
            </motion.span>
            <span className="mx-2">&</span>
            <motion.span className="text-gradient-blue inline-block hover:scale-105 transition-transform duration-300">
              UI/UX Designer
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            I craft beautiful, functional, and user-friendly digital experiences that make people's lives easier and more enjoyable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 glow relative overflow-hidden group"
              whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(168, 85, 247, 0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative flex items-center gap-2">
                View My Work
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 glass rounded-full font-semibold text-white hover:bg-white/20 transition-all duration-300 group border border-white/20 hover:border-white/40"
              whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-gradient-blue group-hover:text-gradient transition-all duration-300">Get In Touch</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-20"
          >
            <motion.a
              href="#about"
              className="inline-block"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowDown className="w-6 h-6 text-gradient-blue" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
