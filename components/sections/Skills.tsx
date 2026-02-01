'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiGit, SiFigma, SiPython, SiDocker } from 'react-icons/si'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skills = [
    { name: 'React', icon: <SiReact />, color: '#61DAFB', level: 95 },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000', level: 90 },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', level: 90 },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4', level: 95 },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933', level: 85 },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', level: 80 },
    { name: 'Git', icon: <SiGit />, color: '#F05032', level: 90 },
    { name: 'Figma', icon: <SiFigma />, color: '#F24E1E', level: 85 },
    { name: 'Python', icon: <SiPython />, color: '#3776AB', level: 80 },
    { name: 'Docker', icon: <SiDocker />, color: '#2496ED', level: 75 },
  ]

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Skills & Technologies</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="glass p-6 rounded-xl flex flex-col items-center justify-center hover:glow-cyan transition-all duration-300 group"
            >
              <motion.div
                className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ color: skill.color }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {skill.icon}
              </motion.div>
              <h3 className="font-semibold text-center mb-2">{skill.name}</h3>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </div>
              <span className="text-xs text-gray-400 mt-2">{skill.level}%</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-8 text-lg">
            Always learning and exploring new technologies to stay ahead of the curve
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['AI/ML', 'Web3', 'Cloud Computing', 'DevOps', 'UI/UX'].map((item, index) => (
              <motion.span
                key={item}
                className="px-4 py-2 glass rounded-full text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
