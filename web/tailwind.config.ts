import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07080c',
          900: '#0a0d16',
          850: '#0f1422',
          800: '#141a2c',
          700: '#1e263d',
        },
        brand: {
          rose: '#e11d48',
          indigo: '#6366f1',
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        'glow-rose': '0 0 25px -5px rgba(225, 29, 72, 0.3)',
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.3)',
        'bento': '0 1px 3px rgba(0, 0, 0, 0.4), 0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
};

export default config;
