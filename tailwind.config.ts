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
        arabic: ['Amiri', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        body: ['Poppins', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Poppins', '"Plus Jakarta Sans"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'psd-green': '#0A5C4F',
        'psd-yellow': '#F4C430',
        brand: {
          green: '#166534',
          'green-light': '#16a34a',
          'green-dark': '#14532d',
          gold: '#92400e',
          'gold-light': '#b45309',
          navy: '#1e3a5f',
          cream: '#FAFAF8',
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
