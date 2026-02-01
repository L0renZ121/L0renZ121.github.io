'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      title: 'Sentinel AI – Disaster Early-Help Platform',
      description: 'AI-assisted emergency intake with live map visualization. Submit emergency requests, get AI-prioritized scores, and see incidents plotted on an interactive Leaflet map with real-time geocoding.',
      image: '/api/placeholder/600/400',
      tags: ['AI/ML', 'FastAPI', 'Leaflet', 'Geopy', 'JavaScript'],
      github: 'https://github.com/AA-maker-dev/Disaster-Early-Help-Platform',
      demo: 'https://abhi88.com.np/sentinel-ai',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      title: 'AI-Powered Mental Health Chatbot',
      description: 'An intelligent chatbot providing mental health support using advanced AI models. Offers conversational therapy, mood tracking, and personalized wellness recommendations.',
      image: '/api/placeholder/600/400',
      tags: ['AI/ML', 'JavaScript', 'NLP', 'React', 'Node.js'],
      github: 'https://github.com/AA-maker-dev/AI-Powered-Mental-Health-Chatbot',
      demo: 'https://github.com/AA-maker-dev/AI-Powered-Mental-Health-Chatbot',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'AI Scam Message Detector',
      description: 'Machine learning-powered system that identifies and classifies scam messages in real-time. Protects users by analyzing message content and detecting fraudulent patterns.',
      image: '/api/placeholder/600/400',
      tags: ['Python', 'ML', 'TensorFlow', 'NLP', 'FastAPI'],
      github: 'https://github.com/AA-maker-dev/AI-Scam-Message-Detector',
      demo: 'https://github.com/AA-maker-dev/AI-Scam-Message-Detector',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Social Media Platform',
      description: 'A prototype social media website with user profiles, posting capabilities, real-time feeds, and social interactions. Built with modern web technologies.',
      image: '/api/placeholder/600/400',
      tags: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'WebSocket'],
      github: 'https://github.com/AA-maker-dev/Social-Media',
      demo: 'https://github.com/AA-maker-dev/Social-Media',
      gradient: 'from-green-500 to-emerald-500'
    },
  ]

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass rounded-2xl overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br overflow-hidden" style={{ background: `linear-gradient(to bottom right, ${project.gradient.split(' ')[1]}, ${project.gradient.split(' ')[3]})` }}>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300" />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-6 h-6" />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-6 h-6" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full text-sm border border-white/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.2 + tagIndex * 0.1 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/AA-maker-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full hover:glow-purple transition-all group"
          >
            <span>View More Projects</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
