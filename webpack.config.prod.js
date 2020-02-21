const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
//   devServer: {
//       contentBase: "./build"
//   },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  target: 'node',
  node: {
    fs: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'react',
                'stage-2',
              ],
              plugins: [],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});