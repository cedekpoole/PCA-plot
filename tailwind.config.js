/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-50": "rbga(47,128,237,0.5)",
        "primary-80": "rbga(47,128,237,0.8)",
        "primary-100": "rbga(47,128,237,1)"
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