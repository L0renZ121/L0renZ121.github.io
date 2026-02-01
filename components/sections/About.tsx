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
    <section id="about" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-4 py-2 glass rounded-full text-sm mb-4 text-gradient-blue"
          >
            Get to Know Me
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gradient"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            I'm a passionate developer who loves turning complex problems into simple, beautiful solutions
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
              initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <div className="glass p-8 rounded-2xl glow hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-4 text-gradient-blue">My Journey</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                With over 5 years of experience in web development, I've had the privilege of working on diverse projects
                ranging from startups to enterprise applications.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I specialize in building responsive, accessible, and performant web applications using modern technologies
                like React, Next.js, and TypeScript.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                or sharing knowledge with the developer community.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.3,
                  delay: 0.1 + index * 0.03,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: '0 20px 40px rgba(168, 85, 247, 0.2)',
                }}
                className="glass p-6 rounded-xl hover:glow-cyan transition-all duration-500 cursor-pointer group"
              >
                <motion.div
                  className="text-purple-400 mb-3 text-3xl group-hover:scale-110 transition-transform duration-300"
                  animate={isInView ? { y: [0, -4, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="font-semibold mb-2 text-white">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center"
        >
          <motion.a
            href="/CV Abhi.pdf"
            download="CV Abhi.pdf"
            className="inline-block px-8 py-4 glass rounded-full font-semibold hover:glow-cyan transition-all duration-500 cursor-pointer group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            />
            <span className="relative">Download CV</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
