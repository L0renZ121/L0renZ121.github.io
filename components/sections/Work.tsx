'use client';

import { motion } from 'framer-motion';

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
  { value: '35+', label: 'Projects Shipped' },
  { value: '6yrs', label: 'Designing & Building' },
  { value: '0.9s', label: 'FCP Performance' },
  { value: '15+', label: 'Brands & Startups' },
];

export default function Work() {
  return (
    <section id="work" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-20"
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-[#00d9ff]/20 to-transparent border border-white/10 rounded-lg mb-6 overflow-hidden group-hover:border-[#00d9ff]/50 transition" />
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-500">{project.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-b border-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="text-4xl font-bold text-[#00d9ff] mb-2">{stat.value}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
