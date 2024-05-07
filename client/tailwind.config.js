const flowbite = require("flowbite-react/tailwind");
const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    screens: {
      'xs': { 'max' : '480px'},
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar'),
  ],
}
