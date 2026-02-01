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
    <section id="experience" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Work Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            My professional journey and career milestones
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'} md:w-1/2 pl-20 md:pl-0`}
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute left-8 md:left-1/2 top-6 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transform md:-translate-x-1/2 ${index % 2 === 0 ? 'md:translate-x-1/2' : 'md:-translate-x-1/2'}`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  whileHover={{ scale: 1.5 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-50"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <div className={`glass p-6 rounded-xl hover:glow-purple transition-all duration-300 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="flex items-center gap-2 mb-2 text-purple-400">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm font-semibold">{exp.company}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                  <p className="text-gray-400 mb-4">{exp.description}</p>
                  <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    {exp.achievements.map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        className="text-sm text-gray-300 flex items-start gap-2"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.2 + achIndex * 0.1 + 0.5 }}
                      >
                        <span className="text-purple-400">•</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
