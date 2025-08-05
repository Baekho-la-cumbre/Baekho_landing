const tailwindcssAnimate = require("tailwindcss-animate");
const tailwindScrollbar = require("tailwind-scrollbar");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        karate: ['Karate', 'sans-serif'],
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    tailwindScrollbar({ nocompatible: true }),
  ],

  theme: {
    extend: {
      screens: {
        'xlmin': '1025px',
        'xlmed': '1225px',
      },
    },
  }

};


