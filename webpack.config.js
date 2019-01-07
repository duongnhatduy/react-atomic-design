const path = require('path')

const webpack = require('webpack') // eslint-disable-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // eslint-disable-line import/no-extraneous-dependencies

const resolve = require('./webpack/resolve.js')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['webpack-hot-middleware/client', './src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    // new ExtractTextPlugin('styles.css'),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      //   {
      //     test: /\.css$/,
      //     include: /node_modules/,
      //     loader: ExtractTextPlugin.extract({
      //       fallback: 'style-loader',
      //       use: [
      //         {
      //           loader: 'css-loader',
      //           options: {
      //             modules: false,
      //             localIdentName: '[name]__[local]___[hash:base64:5]',
      //           },
      //         },
      //       ],
      //     }),
      //   },
      //   {
      //     test: /\.css$/,
      //     exclude: /node_modules/,
      //     loader: ExtractTextPlugin.extract({
      //       fallback: 'style-loader',
      //       use: [
      //         {
      //           loader: 'css-loader',
      //           options: {
      //             modules: true,
      //             importLoaders: 2,
      //             localIdentName: '[name]__[local]___[hash:base64:5]',
      //           },
      //         },
      //         {
      //           loader: 'postcss-loader',
      //         },
      //       ],
      //     }),
      //   },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: '[name]_[hash]',
              runtimeCompat: false,
              prefixize: true,
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: '[hash].[ext]',
        },
      },
      {
        test: /\.ico$/i,
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: 'favicon.ico',
        },
      },
    ],
  },
}
