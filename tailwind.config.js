/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/web/index.html",
    "./apps/web/src/**/*.{js,ts,jsx,tsx}",
    "./packages/**/*.{js,ts,jsx,tsx}"
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
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
