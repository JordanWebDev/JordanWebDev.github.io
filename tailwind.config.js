/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Original palette
        'halo-cyan': '#00E6E6',
        'halo-blue': '#00A8CC',
        'halo-gray': '#2A2E35',
        'halo-dark': '#1A1D23',
        'halo-light-gray': '#3D4451',
        'unsc-green': '#00FF00',
        // Mjolnir Palette
        'infinite-cyan': '#00f7ff',
        'chief-green': '#4c6353',
        'deep-charcoal': '#1c1c1c',
        'warning-yellow': '#ffc107',
        'hologram-blue': '#0a84ff',
        // Original Xbox Palette
        'xbox-green': '#107c10',
        'xbox-light-green': '#0e6b0e',
        'xbox-dark': '#0d0d0d',
        'xbox-metal': '#1a1a1a',
        'xbox-accent': '#4fba4f',
        // OG Xbox Dashboard (from reference images)
        'xbox-orb-glow': '#8bc34a',
        'xbox-orb-center': '#c6ff00',
        'xbox-orb-shell': '#2e7d32',
        'xbox-grid': '#1b5e20',
        'xbox-selected': '#cddc39',
        'xbox-bar': '#33691e',
        'xbox-bar-dark': '#1b3d0f',
        // Enhanced Text Colors
        'xbox-light': '#e6ffe6', // Bright pale green for high contrast text
        'xbox-dim': '#8ba38b',   // Muted green-gray for secondary text
        'xbox-loud': '#ccff00',  // High-intensity lime for highlights
      },
      fontFamily: {
        'halo': ['Orbitron', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'blade-slide': 'blade-slide 0.3s ease-out',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 124, 16, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(16, 124, 16, 0.8), 0 0 60px rgba(16, 124, 16, 0.4)' },
        },
        'blade-slide': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
