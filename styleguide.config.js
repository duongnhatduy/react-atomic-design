module.exports = {
  components: 'src/components/**/!(stories).{js,jsx,ts,tsx}',
  webpackConfig: require('./webpack.config.styleguide'),
}
