// Tailwind's PostCSS plugin moved to a separate package (`@tailwindcss/postcss`).
// Configure PostCSS to use the new plugin name. Make sure `@tailwindcss/postcss`
// is installed (run `npm install -D @tailwindcss/postcss`).
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
