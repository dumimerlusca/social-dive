module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        dark: '#111111',
        primary: '#1D1C21',
        'primary-lighter': '#928bad',
        'primary-darker': '#18171c',
        secondary: '#31C0D2',
      },
      flexGrow: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [],
};
