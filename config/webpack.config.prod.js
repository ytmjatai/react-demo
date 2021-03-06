const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: path.resolve('src/index.tsx'),
  output: {
    path: path.resolve('dist'),
    filename: '[name].[hash].bundle.js'
  },
  resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: path.resolve('node_modules/'),
        include: path.resolve('src/'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {

        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '图书管理系统',
      template: 'index.html',
      base: { href: '/library/' }
    })
  ],

}