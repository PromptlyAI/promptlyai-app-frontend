/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    

    extend: {
      colors: {  
        blue: {
        default: "#0c98c7",
        hover: "#0eade3",
        },
        secondary:{
          design:"#8C9DAE"
        },
        primary:{
          design:"#EAECEE"
        },
        greyText:"#545D65", 
          grayscale: {
          lgray: "#dbdbdb", 
          gray: "#c7c7c7",
        },
                  description: "#e0e0e0",

      },
        fontFamily: {
        "title": "Merriweather, serif",},
    },
  },
  plugins: [],
}

