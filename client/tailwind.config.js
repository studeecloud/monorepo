module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      display: ['Bungee Shade', 'cursive'],
      header: ['Bungee Hairline', 'cursive'],
      body: ['Nunito', 'sans-serif'],
    },
    plugins: [require('daisyui')],
  },
};
