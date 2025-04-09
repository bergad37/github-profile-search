/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#36454F',
          20: '#D3D3D3',
          50: '#A9A9A9',
          100: '#808080',
          200: '#A9A9A9',
          300: '#808080',
          400: '#818589',
          500: '#899499	',
          600: '#36454F	'
        },
        error: '#b80000',
        green: '#13ce66'
      }
    }
  },
  plugins: []
};
