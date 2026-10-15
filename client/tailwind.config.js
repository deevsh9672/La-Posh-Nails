/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        laposh: {
          white: '#FFFFFF',
          warm: '#FFF8F6',
          blush: '#F4DDE2',
          'blush-light': '#FAF0F2',
          'blush-dark': '#E8CBD2',
          gold: '#C6A36B',
          'gold-light': '#DFCA9E',
          'gold-dark': '#A38048',
          text: '#292326',
          muted: '#746B70',
          border: '#F0E5E8',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 10px 30px -10px rgba(198, 163, 107, 0.15)',
        'luxury-hover': '0 20px 40px -15px rgba(198, 163, 107, 0.25)',
        subtle: '0 4px 20px -2px rgba(41, 35, 38, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
