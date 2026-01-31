'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Let's Build Something Great
          </h2>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="https://github.com"
              target="_blank"
              className="text-gray-400 hover:text-[#00d9ff] transition border-b border-transparent hover:border-[#00d9ff]"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-gray-400 hover:text-[#00d9ff] transition border-b border-transparent hover:border-[#00d9ff]"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-gray-400 hover:text-[#00d9ff] transition border-b border-transparent hover:border-[#00d9ff]"
            >
              Twitter
            </a>
            <a
              href="mailto:hello@abhikhatiwada.com"
              className="text-gray-400 hover:text-[#00d9ff] transition border-b border-transparent hover:border-[#00d9ff]"
            >
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
