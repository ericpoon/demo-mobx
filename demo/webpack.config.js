const path = require('path');

module.exports = {
  entry: './demo/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
  },
  mode: 'development',
};
