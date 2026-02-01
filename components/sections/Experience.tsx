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

        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(168, 85, 247, 0.2)' }}
              className="glass p-8 rounded-2xl relative group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden"
            >
              {/* Animated background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3), rgba(239,68,68,0.3))',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Floating particles effect */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${20 + i * 25}%`,
                  }}
                  animate={{
                    y: [-10, -30, -10],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Colored dot in top right */}
              <motion.div
                className="absolute top-6 right-6 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                animate={{ 
                  scale: [1, 1.4, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(168, 85, 247, 0.7)',
                    '0 0 0 8px rgba(168, 85, 247, 0)',
                    '0 0 0 0 rgba(168, 85, 247, 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Ripple effect on dot */}
              <motion.div
                className="absolute top-6 right-6 w-3 h-3 rounded-full border-2 border-purple-400"
                animate={{ 
                  scale: [1, 2.5, 2.5],
                  opacity: [0.6, 0, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative z-10">
                {/* Company Badge and Role */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm font-semibold text-cyan-400 relative overflow-hidden group/badge"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.15 + 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <Briefcase className="w-4 h-4 relative z-10" />
                    </motion.div>
                    <span className="relative z-10">{exp.company}</span>
                  </motion.div>
                </div>

                {/* Role Title */}
                <motion.h3
                  className="text-3xl font-bold mb-2 text-white relative inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15 + 0.25 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="relative z-10 group-hover:text-gradient transition-all duration-300">
                    {exp.role}
                  </span>
                  {/* Underline effect */}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.h3>

                {/* Period */}
                <motion.div
                  className="flex items-center gap-2 text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                  >
                    <Calendar className="w-4 h-4" />
                  </motion.div>
                  <span>{exp.period}</span>
                </motion.div>

                {/* Description */}
                <motion.p
                  className="text-gray-400 mb-6 leading-relaxed text-base group-hover:text-gray-300 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.35 }}
                >
                  {exp.description}
                </motion.p>

                {/* Achievements */}
                <motion.ul className="space-y-3">
                  {exp.achievements.map((achievement, achIndex) => (
                    <motion.li
                      key={achIndex}
                      className="flex items-start gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15 + 0.4 + achIndex * 0.08,
                      }}
                    >
                      <motion.span
                        className="text-purple-400 mt-1 shrink-0 font-bold text-base relative"
                        animate={{ 
                          scale: [1, 1.15, 1],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: achIndex * 0.1 }}
                        whileHover={{ 
                          scale: 1.3,
                          rotate: 360,
                          textShadow: '0 0 8px rgba(168, 85, 247, 0.8)'
                        }}
                      >
                        ✓
                      </motion.span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

