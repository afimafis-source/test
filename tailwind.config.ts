import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f8fafc',
        surface: '#ffffff',
        surface2: '#f1f5f9',
        border: '#e2e8f0',
        border2: '#cbd5e1',
        accent: '#2563eb',
        accent2: '#7c3aed',
        neon: '#0f766e',
        gold: '#b45309',
        danger: '#dc2626',
        text: '#0f172a',
        muted: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'var(--font-bricolage)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.14) 0%, transparent 60%)',
        'grid-pattern':
          'linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease both',
        'pulse-dot': 'pulseDot 2s infinite',
        'slide-in': 'slideIn 0.3s ease',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
        glow: '0 20px 40px rgba(37, 99, 235, 0.14)',
      },
    },
  },
  plugins: [],
}

export default config