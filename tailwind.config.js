/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-lightest': '#CEE5F2',
        'primary-light': '#8DBDDF',
        'primary': '#7C98B3',
        'primary-dark': '#3B5373',
        'accent-1': '#AB69A8',      // Purple
        'neutral-dark': '#2C3E50',  // Charcoal
        'accent-2': '#3D9970',      // Green
        'accent-3': '#E8A4C9',      // Pink
        'accent-4': '#87AE73',      // Sage
        'accent-5': '#D4A256',      // Amber
        'accent-6': '#B85F51',      // Coral
      }
    },
  },
  plugins: [],
}
