const path = require('path');


module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('./dist/'),
    filename: 'bundle.js'
  }
}