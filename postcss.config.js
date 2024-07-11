module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 0,
      browsers: 'last 2 versions',
    }),
  ],
};
