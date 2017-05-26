const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: {
    scrollTrigger: './src'
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}
