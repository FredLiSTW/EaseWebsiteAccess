/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0d1117',
        secondary: '#161b22',
        accent: '#8957e5',
        'accent-light': '#a371f7',
        surface: '#21262d',
        'surface-light': '#30363d',
        text: '#e6edf3',
        'text-secondary': '#7d8590',
      },
      boxShadow: {
        glow: '0 0 20px rgba(137, 87, 229, 0.2)',
      },
    },
  },
  plugins: [],
};