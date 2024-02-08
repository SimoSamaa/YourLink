/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--clr-bg)',
        border: 'var(--clr-border)',
        text2: 'var(--clr-textSecondary)'
      }
    },
  },
  plugins: [],
};
