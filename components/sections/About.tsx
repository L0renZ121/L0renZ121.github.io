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

export default function About() {
  return (
    <section id="about" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-16"
        >
          About
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
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
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-lg text-gray-400 leading-relaxed">
              I combine UI/UX strategy with performant front-end code. Whether it's a landing page or a full product, I prioritize clarity, emotion, and speed.
            </p>
          </motion.div>
        </div>

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-12"
        >
          Skills
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="p-6 border border-white/10 rounded-lg hover:border-[#00d9ff]/50 transition"
            >
              <h4 className="font-semibold mb-2">{skill.title}</h4>
              <p className="text-gray-600 text-sm">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
