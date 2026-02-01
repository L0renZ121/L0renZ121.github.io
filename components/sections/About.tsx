'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Palette, Rocket, Users } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code that stands the test of time'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Beautiful Design',
      description: 'Creating stunning interfaces that users love to interact with'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Fast Performance',
      description: 'Optimizing for speed and efficiency in every project'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'User-Focused',
      description: 'Putting user experience at the heart of every decision'
    }
  ]

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            I'm a passionate developer who loves turning complex problems into simple, beautiful solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass p-8 rounded-2xl glow">
              <h3 className="text-2xl font-bold mb-4 text-gradient-blue">My Journey</h3>
              <p className="text-gray-300 mb-4">
                With over 5 years of experience in web development, I've had the privilege of working on diverse projects
                ranging from startups to enterprise applications.
              </p>
              <p className="text-gray-300 mb-4">
                I specialize in building responsive, accessible, and performant web applications using modern technologies
                like React, Next.js, and TypeScript.
              </p>
              <p className="text-gray-300">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                or sharing knowledge with the developer community.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass p-6 rounded-xl hover:glow-cyan transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="text-purple-400 mb-3">{feature.icon}</div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <a
            href="/resume.pdf"
            className="inline-block px-8 py-4 glass rounded-full font-semibold hover:glow-cyan transition-all duration-300"
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
