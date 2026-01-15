/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'halo-cyan': '#00E6E6',
        'halo-blue': '#00A8CC',
        'halo-gray': '#2A2E35',
        'halo-dark': '#1A1D23',
        'halo-light-gray': '#3D4451',
        'unsc-green': '#00FF00',
      },
      fontFamily: {
        'halo': ['Orbitron', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
    },
  },
  plugins: [],
}
