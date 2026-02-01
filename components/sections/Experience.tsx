'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Calendar } from 'lucide-react'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      company: 'Freelance',
      role: 'Full Stack Developer',
      period: '2024 - Present',
      description: 'Building complete web applications with modern technologies. Handling both frontend and backend development for various projects.',
      achievements: [
        'Developed full-stack applications from concept to deployment',
        'Implemented responsive designs with optimal performance',
        'Integrated payment systems and databases'
      ]
    },
    {
      company: 'Freelance',
      role: 'Front-End Designer',
      period: '2023 - 2024',
      description: 'Designed and developed user-friendly interfaces with focus on visual aesthetics and user experience.',
      achievements: [
        'Created compelling UI/UX designs for multiple projects',
        'Implemented animations and interactive elements',
        'Maintained brand consistency across platforms'
      ]
    },
    {
      company: 'Freelance',
      role: 'Web Developer',
      period: '2021 - 2023',
      description: 'Developed responsive websites and web applications for diverse clients across multiple industries.',
      achievements: [
        'Built 20+ custom web solutions',
        'Optimized website performance and SEO',
        'Provided technical support and maintenance'
      ]
    },
    {
      company: 'Freelance',
      role: 'Video Editor & Graphics Designer',
      period: '2018 - 2024',
      description: 'Created professional video content and graphic designs for various clients and projects.',
      achievements: [
        'Produced 100+ video projects with high-quality editing',
        'Designed logos, banners, and marketing materials',
        'Maintained strong client satisfaction and repeat business'
      ]
    }
  ]

  return (
    <section id="experience" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-4 py-2 glass rounded-full text-sm mb-4 text-gradient-blue"
          >
            My Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gradient"
          >
            Work Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            My professional journey and career milestones
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Animated Timeline Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 origin-top"
              style={{ opacity: 0.8 }}
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.9 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2 + 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'} md:w-1/2 pl-20 md:pl-0`}
              >
                {/* Timeline Dot with glow */}
                <motion.div
                  className={`absolute left-8 md:left-1/2 top-6 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transform md:-translate-x-1/2 z-20 ${index % 2 === 0 ? 'md:translate-x-1/2' : 'md:-translate-x-1/2'}`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                  whileHover={{ scale: 1.3 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-60"
                    animate={{ scale: [1, 2, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </motion.div>

                <motion.div
                  className={`glass p-8 rounded-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 group cursor-pointer ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <motion.div
                    className="flex items-center gap-2 mb-2 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.8 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                      <Briefcase className="w-4 h-4" />
                    </motion.div>
                    <span className="text-sm font-semibold">{exp.company}</span>
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold mb-2 group-hover:text-gradient-blue transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 + 0.7 }}
                  >
                    {exp.role}
                  </motion.h3>
                  <motion.div
                    className="flex items-center gap-2 text-gray-400 text-sm mb-3 group-hover:text-gray-300 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.75 }}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </motion.div>
                  <motion.p
                    className="text-gray-400 mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.8 }}
                  >
                    {exp.description}
                  </motion.p>
                  <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    {exp.achievements.map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        className="text-sm text-gray-300 flex items-start gap-2 group-hover:text-gray-200 transition-colors duration-300"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.2 + achIndex * 0.08 + 0.9,
                        }}
                      >
                        <motion.span
                          className="text-purple-400 shrink-0"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: achIndex * 0.1 }}
                        >
                          ✓
                        </motion.span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
