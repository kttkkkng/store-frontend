/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'surface-0': 'white',
        'main': {
          'primary': '#4daa57',
          'secondary': '#43bf64',
          'tertiary': '#60c67b',
          'quaternary': '#97d4a7',
          'background': '#e2f5df'
        },
        'green': {
          'primary': '#4daa57',
        },
        'yellow': {
          'primary': '#ffe91f',
          'background': '#fffed4',
        },
        'gray': {
          'secondary': '#DDDDDD',
        },
      },
    },
  },
  darkMode: 'false',
  plugins: [],
}

