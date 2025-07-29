/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        heading: [
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        heading: {
          light: '#1e293b', // slate-800
          dark: '#f1f5f9',  // slate-100
        },
      },
    },
  },
  plugins: [],
};
