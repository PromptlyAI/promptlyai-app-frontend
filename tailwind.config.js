/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {  
      black: "#000000",
      white: "#ffffff",
      blue: {
        default: "#0c98c7",
      },
    },
    extend: {},
  },
  plugins: [],
}

