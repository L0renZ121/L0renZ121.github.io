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
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with real-time inventory, payment integration, and admin dashboard.',
      image: '/api/placeholder/600/400',
      tags: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe'],
      github: 'https://github.com/AA-maker-dev',
      demo: 'https://demo.com',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'AI Content Generator',
      description: 'An AI-powered tool that generates high-quality content using GPT-4 API with custom prompts and templates.',
      image: '/api/placeholder/600/400',
      tags: ['React', 'OpenAI', 'Node.js', 'TailwindCSS'],
      github: 'https://github.com/AA-maker-dev',
      demo: 'https://demo.com',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative project management tool with real-time updates, team chat, and Kanban boards.',
      image: '/api/placeholder/600/400',
      tags: ['Vue.js', 'Firebase', 'Socket.io', 'Vuetify'],
      github: 'https://github.com/AA-maker-dev',
      demo: 'https://demo.com',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Portfolio Dashboard',
      description: 'A comprehensive analytics dashboard for tracking portfolio performance with charts and insights.',
      image: '/api/placeholder/600/400',
      tags: ['React', 'D3.js', 'Express', 'PostgreSQL'],
      github: 'https://github.com/AA-maker-dev',
      demo: 'https://demo.com',
      gradient: 'from-orange-500 to-red-500'
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
