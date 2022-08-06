/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      translate: {
        neg: "-50%",
        negf: "-100%",
      },
      right: {
        neg: "-50%",
      },
      height: {
        p90: "90%",
      },
      animation: {
        blob: "blob 4s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: " translate(0px , 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px , -50px) scale(1.1)",
          },
          "66%": {
            transform: " translate(-20px , 20px) scale(0.8)",
          },
          "100%": {
            transform: " translate(0px , 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
