/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{pug,html,js}", "./static/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
