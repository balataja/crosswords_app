// const polyfill = require('babel-polyfill');
// const path = require('path');
// const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

// module.exports = () => ({
//   entry: [
//     'babel-polyfill',
//     'react-hot-loader/patch',
//     'webpack-dev-server/client?https://localhost:8080',
//     path.join(__dirname, 'src/index.js'),
//   ],
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: 'bundle.js'
//   },
//   devtool: '#eval-source-map',
//   plugins: [
//     new HotModuleReplacementPlugin(),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         include: path.join(__dirname, 'src'),
//         use: [
//           {
//             loader: ['babel-loader'],
//             options: {
//               babelrc: false,
//               presets: [
//                 ['es2015', { modules: false }],
//                 'react',
//                 'stage-2',
//               ],
//               plugins: ['react-hot-loader/babel'],
//             },
//           },
//         ],
//       },
//       {
//         test: /\.(css|scss)$/,
//         loader: ['style-loader', 'css-loader', 'sass-loader'],
//       },
//     ],
//   },
//   devServer: {
//     historyApiFallback: true,
//     contentBase: './src',
//     hot: true,
//   },
// });

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    '@babel/polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?https://localhost:8080',
    path.join(__dirname, 'src/index.js'),
  ],
  // entry: {
  //   app: path.join(__dirname, 'src/index.js'),
  // },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  stats: { 
    warnings: false,
    children: true 
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, 'dist'),
    hot: true,
    host: '192.168.1.68',
    client: {
      overlay: {
        errors: true, 
        runtimeErrors: true,
        warnings: false
      }
    }
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve( __dirname, 'src/index.html' ),
      filename: 'index.html'
    }),
  ],
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
};