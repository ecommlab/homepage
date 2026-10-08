/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
        display: [
          '"Funnel Display"',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
        ],
      },
    },
  },
  plugins: [],
}

