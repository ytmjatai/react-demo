const path = require('path');


module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('./dist/'),
    filename: 'bundle.js'
  },
  resolve: { extensions: ['*', '.js', '.jsx', '.tx', '.tsx'] },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude:  path.resolve('node_modules/'),
        include:  path.resolve('src/'),
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
  }


}