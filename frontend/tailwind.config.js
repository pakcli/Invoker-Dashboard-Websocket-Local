/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        quas: {
          DEFAULT: '#00d0ff',
          glow: 'rgba(0, 208, 255, 0.4)',
        },
        wex: {
          DEFAULT: '#d000ff',
          glow: 'rgba(208, 0, 255, 0.4)',
        },
        exort: {
          DEFAULT: '#ff6a00',
          glow: 'rgba(255, 106, 0, 0.4)',
        },
        gold: {
          DEFAULT: '#ffd700',
          glow: 'rgba(255, 215, 0, 0.4)',
        },
        dota: {
          dark: '#0b0d10',
          card: '#15191e',
          border: '#2a313a',
          text: '#e2e8f0',
        }
      },
      fontFamily: {
        dota: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        quas: '0 0 15px rgba(0, 208, 255, 0.6)',
        wex: '0 0 15px rgba(208, 0, 255, 0.6)',
        exort: '0 0 15px rgba(255, 106, 0, 0.6)',
        invoke: '0 0 20px rgba(74, 222, 128, 0.8)',
        gold: '0 0 15px rgba(255, 215, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
