/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-daisyui"), require("d3")],
  daisyui: {
    themes: ["light", "dark", "valentine", "coffee"],
  },
  variants: {
    scrollbar: ["dark"],
  },
};
