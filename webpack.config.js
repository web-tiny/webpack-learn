const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 入口
  // entry: ['./src/index.js', './src/index2.js'],
  entry: {
    index: './src/index.js',
    index2: './src/index2.js'
  },
  // 出口
  output: {
    path: path.resolve(__dirname,'dist'),
    // filename: 'bundle.js'
    filename: '[name].bundle.js'
  },
  // module
  module: {},
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack how are you ',
      template: './src/index.html',
      hash: true,
      minify:{
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ],
  // 开发服务器
  devServer: {}
}