'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);

      // Update scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);

      // Update active section
      const sections = ['work', 'about', 'contact'];
      let current = '';

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element && element.offsetTop - 200 <= window.scrollY) {
          current = section;
        }
      });

      setActiveSection(current);

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d9ff] via-purple-500 to-[#00d9ff] z-50"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        transition={{ type: 'tween', ease: 'easeOut' }}
      />

      {/* Navigation bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 pt-6 backdrop-blur"
        animate={{
          backgroundColor: isScrolling ? 'rgba(15, 15, 15, 0.95)' : 'rgba(15, 15, 15, 0.7)',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <motion.div
            className="font-bold text-lg tracking-tight"
            animate={{
              color: isScrolling ? '#00d9ff' : '#ffffff',
              textShadow: isScrolling ? '0 0 20px rgba(0, 217, 255, 0.5)' : 'none',
            }}
            transition={{ duration: 0.3 }}
          >
            ABHI
          </motion.div>

          <ul className="flex gap-10 text-sm">
            {['Work', 'About', 'Contact'].map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="relative group">
                    <motion.span
                      animate={{
                        color: isActive ? '#00d9ff' : '#a3a3a3',
                      }}
                      transition={{ duration: 0.3 }}
                      className="transition-colors"
                    >
                      {item}
                    </motion.span>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00d9ff] to-cyan-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    </>
  );
}
