/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'duck-ink': '#0F0E1C',
        'duck-dark': '#1A1829',
        'duck-primary': '#FFC839',
        'duck-yellow': '#FFC839',
        'duck-accent': '#FF6B6B',
        'duck-purple': '#6B5B95',
        'duck-white': '#FFFFFF',
        'duck-gray': '#8B8CA7',
        'duck-light-gray': '#E8E8F0',
        'duck-dark-gray': '#252438',
      },
      animation: {
        'bounce-in': 'bounce-in 0.4s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
      keyframes: {
        'bounce-in': {
          '0%': {
            transform: 'scale(0.9)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.05)',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'slide-in': {
          from: {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          to: {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}