/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9f3',
          100: '#fdf0e1',
          200: '#f9dcc3',
          300: '#f4c49a',
          400: '#eda76f',
          500: '#e68a4a',
          600: '#d97030',
          700: '#b55826',
          800: '#8b5a2b',
          900: '#8b7355',
        },
        safe: '#52c41a',
        warning: '#faad14',
        danger: '#fa541c',
      }
    },
  },
  plugins: [],
}

