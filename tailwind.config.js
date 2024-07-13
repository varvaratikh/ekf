/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      colors: {
        'custom-black': '#212529',
        'custom-blue': '#445B71',
        'custom-red': '#DB0912',
        'custom-dark-grey': '#B0B7BF',
        'custom-grey': '#EAECEF',
        'custom-wight': '#F8F9FA',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

