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
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'muted-surface': 'var(--color-muted-surface)',
        border: 'var(--color-border)',
        foreground: 'var(--color-foreground)',
        'muted-foreground': 'var(--color-muted-foreground)',
        'dark-background': 'var(--color-dark-background)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        panel: 'var(--theme-shadow-panel)',
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      },
      maxWidth: {
        '320': '80rem',
      },
    },
  },
  plugins: [],
};

export default config;
