/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'surface-dark': '#111827',
        'bg-dark': '#0B0F14',
      },
      animation: {
        'float-slow': 'floatY 6s ease-in-out infinite',
        'float-slower': 'floatY 8s ease-in-out infinite',
        'float-slowest': 'floatY 10s ease-in-out infinite',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}