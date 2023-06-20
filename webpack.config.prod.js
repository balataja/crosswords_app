const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  devtool: 'source-map',
  entry: [
    '@babel/polyfill',
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
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html'
    }),
  ],
  mode: 'production',
  //target: 'node',
  // node: {
  //   fs: 'empty',
  //   net: 'empty',
  //   global: true
  // },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, 
    ]
  }
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       include: path.join(__dirname, 'src'),
  //       use: 
  //         {
  //           loader: 'babel-loader',
  //           options: {
  //             babelrc: false,
  //             presets: [
  //               ['es2015', { modules: false }],
  //               'react',
  //               'stage-2',
  //             ],
  //           },
  //         },
        
  //     },
  //     {
  //       test: /\.(css|scss)$/,
  //       loader: ['style-loader', 'css-loader', 'sass-loader'],
  //     },
  //   ],
  // },
});