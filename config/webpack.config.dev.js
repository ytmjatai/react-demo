const path = require('path');


module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: path.resolve('src/index.tsx'),
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  resolve: { extensions: ['*', '.js', '.jsx', '.tx', '.tsx'] },
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
    // contentBase: path.join(__dirname, 'dist'),
    port: 3001,
    // publicPath: "http://localhost:3000/dist/",
    // hotOnly: true,
    // open: true,
    hot: true,
    // index: 'index.html'
  },
  watch: true,
  watchOptions: {
    ignored: path.resolve('node_modules/'),
    aggregateTimeout: 500,
    poll: 1000
  }

}