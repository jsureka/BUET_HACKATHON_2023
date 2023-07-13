/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,css,scss}',
  ],
  darkMode: 'class', // 'media' is the default, change to 'class' if you want to use dark mode in with class names
  theme: {
    fontFamily: {
      display: ['Poppins', 'sans-serif'],
      body: ['"Open Sans"', 'serif'],
    },
    extend: {
      colors: {
        'primary': '#2B2B2B',
        'secondary': '#53AF32',
        'dark': '#F7F8F9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
