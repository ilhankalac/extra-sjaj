const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: "370px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      extend: {
        spacing: {
          "128": "32rem",
          "144": "36rem",
        },
        borderRadius: {
          "4xl": "2rem",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
//
