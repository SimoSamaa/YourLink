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
        lightSeconder: 'var(--clr-lightSeconder)',
      },
      backgroundImage: {
        'base': 'linear-gradient(to top, #dfe9f3 0%, white 100%)',
        'theme-noir': 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
        'theme-mint': 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
        'them-blue-circle': 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)'
      }
    },
  },
  plugins: [],
};
