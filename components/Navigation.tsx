'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'about', 'contact'];
      let current = '';

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element && element.offsetTop - 200 <= window.scrollY) {
          current = section;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="font-bold text-lg tracking-tight">ABHI</div>
        <ul className="flex gap-10 text-sm">
          {['Work', 'About', 'Contact'].map((item) => (
            <li key={item}>
              <Link
                href={`#${item.toLowerCase()}`}
                className={`transition-colors ${
                  activeSection === item.toLowerCase()
                    ? 'text-white'
                    : 'text-gray-600 hover:text-white'
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
