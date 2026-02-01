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
      image: '/thumbnails/SentinelAI.png',
      tags: ['AI/ML', 'FastAPI', 'Leaflet', 'Geopy', 'JavaScript'],
      github: 'https://github.com/AA-maker-dev/Disaster-Early-Help-Platform',
      demo: '/sentinel-ai',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      title: 'AI-Powered Mental Health Chatbot',
      description: 'An intelligent chatbot providing mental health support using advanced AI models. Offers conversational therapy, mood tracking, and personalized wellness recommendations.',
      image: '/thumbnails/Mental-health-chatbot.png',
      tags: ['AI/ML', 'JavaScript', 'NLP', 'React', 'Node.js'],
      github: 'https://github.com/AA-maker-dev/AI-Powered-Mental-Health-Chatbot',
      demo: '/health-chatbot',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'AI Scam Message Detector',
      description: 'Machine learning-powered system that identifies and classifies scam messages in real-time. Protects users by analyzing message content and detecting fraudulent patterns.',
      image: '/thumbnails/scam-detector.png',
      tags: ['Python', 'ML', 'TensorFlow', 'NLP', 'FastAPI'],
      github: 'https://github.com/AA-maker-dev/AI-Scam-Message-Detector',
      demo: '/scam-detector',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern and responsive portfolio website showcasing my skills, projects, and experience. Built with Next.js, featuring smooth animations, interactive particle backgrounds, and a clean design.',
      image: '/api/placeholder/600/400',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/L0renZ121/L0renZ121.github.io',
      demo: '/#home',
      gradient: 'from-green-500 to-emerald-500'
    },
  ]

  return (
    <section id="projects" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background animation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animation-delay-4000" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-4 py-2 glass rounded-full text-sm mb-4 text-gradient-blue"
          >
            My Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gradient"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A showcase of my recent work and personal projects
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -15, transition: { duration: 0.3 } }}
              className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
            >
              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br overflow-hidden" style={{ background: `linear-gradient(to bottom right, ${project.gradient.split(' ')[1]}, ${project.gradient.split(' ')[3]})` }}>
                {project.image && !project.image.includes('placeholder') && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-500 ease-out"
                  />
                )}
                <motion.div
                  className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"
                  initial={{ opacity: 0.4 }}
                  whileHover={{ opacity: 0.2 }}
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all duration-300 border border-white/30"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    className="p-4 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all duration-300 border border-white/30"
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="w-6 h-6" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <motion.h3
                  className="text-2xl font-bold mb-3"
                  initial={{ color: '#ffffff' }}
                  whileHover={{ color: '#a78bfa' }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-gray-400 mb-4 leading-relaxed"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.description}
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full text-sm border border-white/10 hover:border-white/40"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.15 + tagIndex * 0.05,
                      }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(168, 85, 247, 0.3)',
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                      }}
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
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/AA-maker-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <span className="relative">View More Projects</span>
            <motion.span
              className="relative"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
