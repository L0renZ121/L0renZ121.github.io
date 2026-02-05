import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f0f',
        surface: '#1a1a1a',
        accent: '#a855f7',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'soft-bounce': 'soft-bounce 3s ease-in-out infinite',
        'smooth-fade-up': 'smooth-fade-up 0.8s cubic-bezier(0.23, 1, 0.320, 1)',
        'smooth-scale-in': 'smooth-scale-in 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.23, 1, 0.320, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
