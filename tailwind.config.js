/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#1B5E20',
          primaryLight: '#2E7D32',
          accent: '#4CAF50',
          danger: '#F44336',
          amber: '#F9A825',
        },
      },
    },
  },
  plugins: [],
};
