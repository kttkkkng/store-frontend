/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'surface-0': 'white',
        'main': {
          'primary': '#4daa57',
          'secondary': '#6ee08c',
        },
        'green': {
          'primary': '#4daa57',
        },
        'gray': {
          'secondary': '#DDDDDD',
        },
      },
    },
  },
  plugins: [],
}

