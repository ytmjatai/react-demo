const path = require('path');


module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('./dist/'),
    filename: 'bundle.js'
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".tx", ".tsx"] },
  module: {
    rules: [
      { test: /\.(js|ts)x?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }


}