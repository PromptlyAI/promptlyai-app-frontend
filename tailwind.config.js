/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    black: "#000000",
    colors: {  
      blue: {
        default: "#0c98c7",
      },
    },
    extend: {},
  },
  plugins: [],
}

