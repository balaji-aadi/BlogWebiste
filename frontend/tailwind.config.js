/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily : {
        Montserrat : ["Montserrat"],
      },
      screens : {
        "2xl" : {max:"1535px"},
        // => @media(max-width : 1535px);
  
        "xl" : {max:"1279px"},
        // => @media(max-width : 1279px);
  
        "lg" : {max:"1024px"},
        // => @media(max-width : 1024px);
  
        "md" : {max:"767px"},
        // => @media(max-width : 767px);
  
        "sm" : {max:"639px"},
        // => @media(max-width : 639px);
  
        "xs" : {max:"480px"},
        //  => @media(max-width : 480px);
      }
    },
  },
  plugins: [],
}