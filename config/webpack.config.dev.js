const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
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
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    index: 'index.html' 
  },
  watch: true,
  watchOptions: {
    ignored: path.resolve('node_modules/'),
    aggregateTimeout: 500,
    poll: 1000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],

}