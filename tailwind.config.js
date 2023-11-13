/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-50": "#83B3F4",
        "primary-80": "#5E9BED",
        "primary-90": "rgba(47,128,237,0.9)",
        "primary-100": "rgba(47,128,237,1)"
      },
      screens: {
        xs: "480px",
        sm: "768px",
        md: "1060px",
        lg: "1280px",
      },
    },
  },
  plugins: [],
}