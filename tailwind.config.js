/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        eclecia: {
          midnight: "#09151D",
          gold: "#C18B43",
          burgundy: "#7E202B",
          teal: "#14504D",
          ivory: "#D9C39B",
          vermilion: "#C8462D",
          surface: "#12212A",
          raised: "#1A2C35"
        }
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        editorial: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}