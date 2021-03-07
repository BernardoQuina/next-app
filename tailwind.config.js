module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Inter', 'Arial', 'sans-serif']
    },
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      scale: ['active'],
      backgroundColor: ['active'],
      borderColor: ['active'],
      opacity: ['disabled'],
      animation: ['active', 'focus']
    },
  },
  plugins: [],
}
