/** @type {import('tailwindcss').Config} */
module.exports = {
  /**
   * In your tailwind.config.js file,
   * configure the purge option with the paths to all of your pages and components
   * so Tailwind can tree-shake unused styles in production build
   */
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  /**
   * Define where could use tailwind syntax
   */
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
}
