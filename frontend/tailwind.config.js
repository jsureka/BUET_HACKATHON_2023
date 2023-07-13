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
    width: {
       new: '30%',
       hundred: '100%',
    },
    extend: {
      colors: {
        'primary': '#2B2B2B',
        'secondary-1': '#6528F7',
        'secondary-1-dark': '#4114AD',
        'secondary-2': '#A076F9',
        'secondary-3': '#D7BBF5',
        'new-gray': '#3B3B3B',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
