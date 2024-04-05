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
        black2: 'var(--clr-textPrimary)',
        text2: 'var(--clr-textSecondary)',
        seconder: 'var(--clr-seconder)',
        lightSeconder: 'var(--clr-lightSeconder)'
      }
    },
  },
  plugins: [],
};
