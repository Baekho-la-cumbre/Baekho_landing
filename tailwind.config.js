const tailwindcssAnimate = require("tailwindcss-animate");
const tailwindScrollbar = require("tailwind-scrollbar");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssAnimate,
    tailwindScrollbar({ nocompatible: true }),
  ],
};
