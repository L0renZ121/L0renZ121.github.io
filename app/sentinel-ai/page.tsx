'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, ArrowLeft, MapPin, AlertCircle, Zap } from 'lucide-react'
import Link from 'next/link'

export default function SentinelAI() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link href="/">
          <button className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-white/10 transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
        </Link>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 glass rounded-2xl">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
                Sentinel AI
              </h1>
              <p className="text-xl text-gray-400">Disaster Early-Help Platform</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left - Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="glass rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">About</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Sentinel AI is an AI-assisted emergency intake platform that revolutionizes disaster response. Submit emergency requests and receive AI-prioritized severity scores instantly. Watch as incidents appear in real-time on an interactive Leaflet map with precise geocoding.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Built with advanced technologies including FastAPI for robust backend processing, Leaflet for real-time mapping, and Geopy for accurate geocoding. The platform combines mobile-first design with powerful AI capabilities to save lives during emergencies.
              </p>
            </div>

            {/* Features */}
            <div className="glass rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: AlertCircle,
                    title: 'AI Priority Scoring',
                    desc: 'Intelligent severity assessment for emergency requests'
                  },
                  {
                    icon: MapPin,
                    title: 'Live Map Visualization',
                    desc: 'Real-time incident mapping with color-coded urgency markers'
                  },
                  {
                    icon: Zap,
                    title: 'Instant Geocoding',
                    desc: 'Dual geocoding system with FastAPI & geopy for accuracy'
                  }
                ].map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0">
                        <Icon className="w-6 h-6 text-red-400 mt-1" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="glass rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {['AI/ML', 'FastAPI', 'Python', 'Leaflet.js', 'Geopy', 'JavaScript', 'HTML5', 'CSS3'].map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full text-red-300 border border-red-500/30 hover:border-red-500/60 transition-all"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sticky top-8 h-fit"
          >
            <div className="glass rounded-3xl p-8 border border-white/10 space-y-4">
              <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>

              <motion.a
                href="https://github.com/AA-maker-dev/Disaster-Early-Help-Platform"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 rounded-xl text-white font-semibold transition-all group"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="https://github.com/AA-maker-dev/Disaster-Early-Help-Platform#quickstart"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-xl text-white font-semibold transition-all group"
              >
                <Zap className="w-5 h-5" />
                <span>Quick Start</span>
              </motion.a>

              {/* Project Stats */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Status</p>
                    <p className="text-white font-semibold">Live & Active</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Repository</p>
                    <p className="text-white font-semibold text-sm truncate">AA-maker-dev</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white/5 rounded text-xs text-white">JavaScript</span>
                      <span className="px-2 py-1 bg-white/5 rounded text-xs text-white">Python</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20 text-center"
        >
          <Link href="/">
            <button className="inline-flex items-center gap-2 px-8 py-3 glass rounded-full hover:glow-red transition-all group">
              <span>Back to Portfolio</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
