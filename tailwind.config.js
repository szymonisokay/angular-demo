module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#a2e5a3",
        hover: "#86e586",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
