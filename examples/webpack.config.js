const path = require('path');

module.exports = {
  entry: './examples/entry.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    publicPath: '/public/',
  },
  mode: 'development',
};
