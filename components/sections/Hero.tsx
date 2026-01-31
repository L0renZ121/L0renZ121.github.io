'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen pt-32 pb-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
            Front-End<br />
            <span className="text-[#00d9ff]">Designer</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
            I design and build bold, responsive digital experiences with meticulous attention to performance and detail.
          </p>
          <div className="flex gap-4 pt-6">
            <button className="px-8 py-3 bg-[#00d9ff] text-black font-semibold rounded-lg hover:bg-[#00b8d4] transition">
              View Work
            </button>
            <button className="px-8 py-3 border border-white/20 rounded-lg hover:border-white/40 transition">
              Get In Touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
