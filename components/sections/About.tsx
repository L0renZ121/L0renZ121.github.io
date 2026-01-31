'use client';

import { motion } from 'framer-motion';

const skills = [
  { title: 'HTML5 & CSS', desc: 'Semantic markup, responsive design.' },
  { title: 'JavaScript', desc: 'Animations, interactivity, DOM.' },
  { title: 'React', desc: 'Components, state, optimization.' },
  { title: 'Design Tools', desc: 'Figma, prototyping, systems.' },
  { title: 'Performance', desc: 'Core Web Vitals, optimization.' },
  { title: 'Accessibility', desc: 'WCAG, semantic HTML, inclusive.' },
];

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.05 },
  }),
};

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, delay: i * 0.08, type: 'spring', stiffness: 100 },
    }),
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background gradient animation */}
      <motion.div
        className="absolute -right-96 top-0 w-96 h-96 bg-[#00d9ff]/5 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-16"
        >
          About <motion.span className="text-[#00d9ff]">Me</motion.span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-lg text-gray-400 leading-relaxed">
              I've been designing and building digital experiences since 2019. My focus: clean interfaces, responsive systems, and lightning-fast performance.
            </p>
            <p className="text-gray-600">
              Based in Kathmandu. Available for full-time roles and freelance projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-lg text-gray-400 leading-relaxed">
              I combine UI/UX strategy with performant front-end code. Whether it's a landing page or a full product, I prioritize clarity, emotion, and speed.
            </p>
          </motion.div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-12"
        >
          Skills
        </motion.h3>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={skillVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)',
                borderColor: '#00d9ff',
              }}
              className="p-6 border border-white/10 rounded-lg transition cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                <h4 className="font-semibold mb-2 group-hover:text-[#00d9ff] transition">{skill.title}</h4>
              </motion.div>
              <p className="text-gray-600 text-sm">{skill.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
