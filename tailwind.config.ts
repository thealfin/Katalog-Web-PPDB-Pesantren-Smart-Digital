import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
        poppins: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        'psd-green': '#0A5C4F',
        'psd-green-950': '#06351F',
        'psd-green-900': '#074A2B',
        'psd-green-800': '#0D5C3A',
        'psd-green-700': '#147447',
        'psd-green-600': '#1F8A55',
        'psd-green-500': '#35A968',
        'psd-mint': '#B9EDC9',
        'psd-mint-soft': '#EAF8EF',
        'psd-cream': '#F7F8F4',
        'psd-line': '#DFE9E2',
        'psd-ink': '#102019',
        'psd-muted': '#65736C',
        'psd-yellow': '#F4C430',
        'psd-gold': '#C79A45',
        brand: {
          green: '#0D5C3A',
          'green-light': '#16a34a',
          'green-dark': '#06351F',
          gold: '#C79A45',
          'gold-light': '#F4C430',
          navy: '#1e3a5f',
          cream: '#F7F8F4',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
