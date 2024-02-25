/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {  
        black: "#000000",
        white: "#ffffff",
        description: "#e0e0e0",
        blue: {
          default: "#0c98c7",
          hover: "#0eade3",
        },
        grayscale: {
          lgray: "#dbdbdb", 
          gray: "#c7c7c7",
        }
      },
      fontFamily: {
        "title": "Merriweather, serif",
      },
    },
  },
  plugins: [],
}

