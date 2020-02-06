const polyfill = require('babel-polyfill');
const path = require('path');
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
//const getAppUrl = require('./src/util/environment-utils')

module.exports = () => ({
  entry: [
    'babel-polyfill',
    ...(process.env.NODE_ENV !== 'production' ? ['react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080'] : []),
    //'react-hot-loader/patch',
    //'webpack-dev-server/client?http://localhost:8080',
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: '#eval-source-map',
  plugins: [
    ...(process.env.NODE_ENV !== 'production' ? [new HotModuleReplacementPlugin()] : []),
    //new HotModuleReplacementPlugin(),
  ],
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
              plugins: [
                ...(process.env.NODE_ENV !== 'production' ? ['react-hot-loader/babel'] : []),
                //'react-hot-loader/babel'
              ],
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
  devServer: {
    historyApiFallback: true,
    contentBase: './src',
    hot: true,
  },
});
