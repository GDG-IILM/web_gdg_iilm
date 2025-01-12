// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './meetTheTeam/.{html,js}', // Update this path to match your project structure
    './meetTheTeam/index.html', // Include the main HTML file if needed
    './meetTheTeam/.globals.css',
    './landing-page.html'
  ],
  theme: {
    extend: {
      height:{
        '128':'32rem',
      },
      fontFamily: {
        'Parisienne': ['Parisienne', 'sans-serif'],
      },
      animation: {
        'rotate-360': 'rotate360 1s linear infinite',
      },
      keyframes: {
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};

