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
    <section id="skills" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background animation */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animation-delay-4000" />
      
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
            What I Use
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gradient"
          >
            Skills & Technologies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Tools and technologies I use to bring ideas to life
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.3,
                delay: index * 0.03,
              }}
              whileHover={{
                scale: 1.1,
                z: 50,
                rotateX: -10,
                rotateY: 10,
                boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.5)',
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
              className="glass p-6 rounded-xl flex flex-col items-center justify-center hover:glow-cyan transition-all duration-300 group cursor-pointer relative"
            >
              {/* 3D depth layer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl"
                style={{ transform: 'translateZ(-20px)' }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div
                className="text-6xl mb-4 relative z-10"
                style={{ 
                  color: skill.color,
                  transformStyle: 'preserve-3d',
                }}
                animate={isInView ? { y: [0, -8, 0] } : {}}
                transition={{
                  duration: 2 + index * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ 
                  scale: 1.3,
                  rotateY: 360,
                  z: 30,
                }}
              >
                {skill.icon}
              </motion.div>
              <h3 className="font-semibold text-center mb-3 group-hover:text-gradient-blue transition-all duration-300 relative z-10">
                {skill.name}
              </h3>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden relative z-10">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.2, delay: index * 0.08 + 0.4, ease: 'easeOut' }}
                />
              </div>
              <span className="text-xs text-gray-400 mt-2 group-hover:text-gray-300 transition-colors relative z-10">{skill.level}%</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.p
            className="text-gray-400 mb-8 text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Always learning and exploring new technologies to stay ahead of the curve
          </motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {['AI/ML', 'Web3', 'Cloud Computing', 'DevOps', 'UI/UX'].map((item, index) => (
              <motion.span
                key={item}
                className="px-4 py-2 glass rounded-full text-sm hover:border-white/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.08 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(168, 85, 247, 0.2)',
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
                }}
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
