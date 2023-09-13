/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'bg-photo': "url('./src/assets/millionaire.png')",
      })
    },
  },
  plugins: [],
}

