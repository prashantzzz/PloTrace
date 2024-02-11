/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-daisyui")],
  daisyui: {
    themes: ["light", "dark", "valentine", "coffee", "forest", "retro"],
  },
  variants: {
    scrollbar: ["dark"],
  },
};
