
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  entry: './src/app/js/app.js',
  output: {
    filename: 'games-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
   
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};