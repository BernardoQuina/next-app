module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'Arial', 'sans-serif'],
    },
    extend: {
      maxHeight: {
        120: '30rem',
        160: '40rem',
        200: '50rem',
      },
    },
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {
      fontWeight: ['hover'],
      borderWidth: ['hover'],
      scale: ['active', 'hover', 'group-hover'],
      backgroundColor: ['active'],
      borderColor: ['active'],
      opacity: ['disabled'],
      animation: ['active', 'focus'],
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
