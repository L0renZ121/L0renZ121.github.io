'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Folder } from 'lucide-react'

export default function AnotherPortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden">
      {/* Navigation Back */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass py-6"
      >
        <div className="container mx-auto px-4 flex items-center">
          <motion.a
            href="/#home"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
            whileHover={{ x: -4 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </motion.a>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          {/* Folder Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8 flex justify-center"
          >
            <div className="p-6 rounded-full glass">
              <Folder className="w-16 h-16 text-purple-400" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl md:text-6xl font-bold mb-6 font-display tracking-tight"
          >
            Another Portfolio
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed"
          >
            This is a dedicated folder for your additional portfolio project. You can:
          </motion.p>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { title: 'Add Files', desc: 'Store your portfolio code and assets' },
              { title: 'Create Content', desc: 'Build your project documentation' },
              { title: 'Showcase Work', desc: 'Display your projects and skills' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.1,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="glass p-8 rounded-2xl"
              >
                <h3 className="text-xl font-bold mb-3 text-gradient-blue">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="glass p-8 rounded-2xl max-w-2xl mx-auto text-left"
          >
            <h2 className="text-2xl font-bold mb-6 text-gradient">Quick Start Guide</h2>
            <ol className="space-y-4 text-gray-400">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">1</span>
                <span>Add your portfolio code and files to the <code className="bg-white/10 px-3 py-1 rounded text-purple-400">app/another-portfolio</code> folder</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">2</span>
                <span>Create an <code className="bg-white/10 px-3 py-1 rounded text-purple-400">index.html</code> or additional pages as needed</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">3</span>
                <span>The folder is automatically accessible at <code className="bg-white/10 px-3 py-1 rounded text-purple-400">abhi88.com.np/another-portfolio</code></span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">4</span>
                <span>Build and deploy when ready - it will be live on your site!</span>
              </li>
            </ol>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.a
              href="/#home"
              className="btn-premium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="relative flex items-center gap-2 z-10">
                ← Back Home
              </span>
            </motion.a>
            <motion.a
              href="/#projects"
              className="px-8 py-4 glass rounded-full font-semibold text-white transition-all duration-500 group border border-white/20 hover:border-white/40"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="text-gradient-blue">View Projects</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </div>
  )
}
