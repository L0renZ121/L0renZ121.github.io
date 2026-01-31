'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="min-h-screen pt-32 pb-20 flex items-center overflow-hidden relative">
      {/* Animated background orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-[#00d9ff]/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ y: scrollY * 0.5 }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ y: scrollY * -0.3 }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
            Front-End<br />
            <motion.span
              className="text-[#00d9ff]"
              animate={{ textShadow: ['0 0 20px rgba(0, 217, 255, 0)', '0 0 30px rgba(0, 217, 255, 0.5)', '0 0 20px rgba(0, 217, 255, 0)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Designer
            </motion.span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
            I design and build bold, responsive digital experiences with meticulous attention to performance and detail.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 pt-6">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#00d9ff] text-black font-semibold rounded-lg hover:bg-[#00b8d4] transition"
            >
              View Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: '#00d9ff' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white/20 rounded-lg hover:border-white/40 transition"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-gray-600 text-sm text-center">
            <p>Scroll to explore</p>
            <motion.div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center mt-2">
              <motion.div
                className="w-1 h-2 bg-gray-600 rounded-full mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
