/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      primary: '#FF385C',
      secondary: '#E6E6E6',
      'primary-text': '#3E3E3E',
      'grey-text': '#BBBBBB',
      error: '#ED2E2E',
      success: '#00BA88',
    },
    extend: {},
  },
  plugins: [],
}
