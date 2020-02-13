const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  entry: [
    'babel-polyfill',
    './index2.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
      contentBase: "./build"
  },
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve('./index.html'),
      }),
  ],
  target: "node",
  node: {
    fs: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
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