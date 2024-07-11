module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 0,
      browsers: 'last 2 versions',
    }),
  ],
};
