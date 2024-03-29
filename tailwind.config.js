/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.7rem', // Tamaño de fuente personalizado más pequeño
      },
      colors: {
      white: "#FFFFFF",
      black: "#000000",
      blue: {
        50: "#e6f1fe",
        100: "#cce3fd",
        200: "#99c7fb",
        300: "#66aaf9",
        400: "#338ef7",
        500: "#006FEE",
        600: "#005bc4",
        700: "#004493",
        800: "#002e62",
        900: "#001731",
      },},}
  },
  darkMode: "class",
  plugins: [nextui()],
}



