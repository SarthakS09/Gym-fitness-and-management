/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        titanium: {
          950: '#06080E',
          900: '#0B0F19',
          850: '#0F1626',
          800: '#141D32',
          700: '#1E2B4A',
          600: '#2E3F68',
          500: '#4A5E8E',
          400: '#7E92B9',
          300: '#B0C0DF',
          200: '#D5DFEE',
          100: '#F0F4FA',
        },
        neon: {
          cyan: '#06B6D4',
          cyanGlow: '#22D3EE',
          lime: '#10B981',
          limeGlow: '#34D399',
          amber: '#F59E0B',
          amberGlow: '#FBBF24',
          crimson: '#EF4444',
          violet: '#8B5CF6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Orbitron', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.45)',
        'glow-lime': '0 0 25px -5px rgba(16, 185, 129, 0.45)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}
