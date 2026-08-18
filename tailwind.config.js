/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0d0506",
        canvas: "#0d0506",
        wine: "#17080a",
        burgundy: "#2a0c12",
        rose: "#c4a8aa",
        champagne: "#c4b3a8",
        ivory: "#f2ebe1",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Times New Roman", "serif"],
        script: ["var(--font-great-vibes)", "Great Vibes", "cursive"],
        sans: ["var(--font-montserrat)", "Montserrat", "Helvetica Neue", "sans-serif"],
      },
    },
  },
};
