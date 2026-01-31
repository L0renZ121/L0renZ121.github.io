'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const projects = [
  {
    title: 'Neon Commerce',
    description: 'High-converting e-commerce platform with bold motion design.',
  },
  {
    title: 'Studio Pulse',
    description: 'Creative agency portfolio with scroll animations.',
  },
  {
    title: 'Flowboard',
    description: 'SaaS dashboard with custom components.',
  },
];

const stats = [
  { value: 35, label: 'Projects Shipped' },
  { value: 6, label: 'Designing & Building' },
  { value: 0.9, label: 'FCP Performance' },
  { value: 15, label: 'Brands & Startups' },
];

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2;
    const increment = target / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function Work() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      {/* Background animated gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.1) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-20"
        >
          Featured <motion.span className="text-[#00d9ff]" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>Projects</motion.span>
        </motion.h2>

        <motion.div className="grid md:grid-cols-3 gap-8 mb-24" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false }}>
          {projects.map((project, i) => (
            <motion.div key={i} variants={itemVariants} className="group cursor-pointer">
              <motion.div
                className="aspect-video bg-gradient-to-br from-[#00d9ff]/20 to-transparent border border-white/10 rounded-lg mb-6 overflow-hidden group-hover:border-[#00d9ff]/50 transition"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              </motion.div>
              <p className="text-gray-500">{project.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-b border-white/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <motion.div
                className="text-4xl font-bold text-[#00d9ff] mb-2"
                whileInView={{ color: ['#00d9ff', '#00ffff', '#00d9ff'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Counter target={stat.value} suffix={i === 2 ? 's' : i === 1 ? 'yrs' : '+'} />
              </motion.div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
