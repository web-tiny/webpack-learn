const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin= require('clean-webpack-plugin')
const webpack = require('webpack')
const uglify = require('uglifyjs-webpack-plugin')
module.exports = {
  // 入口
  // entry: ['./src/index.js', './src/index2.js'],
  // 多入口
  // entry: {
  //   index: './src/index.js',
  //   index2: './src/index2.js'
  // },
  entry: ['./src/index.js'],
  // 出口
  output: {
    path: path.resolve(__dirname,'dist'),
    // filename: 'bundle.js'
    filename: '[name].bundle.js'
  },
  // module
  module: {
    rules: [
      {
        test: /\.css$/,
        // use : ['style-loader', 'css-loader']
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
        ],
        // loader : ['style-loader', 'css-loader']
      }
    ]
  },
  // plugins
  plugins: [
    // 大抱歉自动删除dist目录的内容
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'webpack how are you ',
      template: './src/index.html',
      hash: true,
      minify:{
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // 生成多个页面
      // filename: 'index.html',
      // 多页面分别引入自己的js
      // chunks: ['index']
    }),
    // 生成多页面的时候就new一个HtmlWebpackPlugin实例
    // new HtmlWebpackPlugin({
    //   title: 'the seconds page ',
    //   template: './src/index2.html',
    //   hash: true,
    //   minify:{
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   // 生成多个页面
    //   filename: 'index2.html',
    //   // 多页面分别引入自己的js
    //   chunks: ['index2']
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new uglify()
  ],
  // 开发服务器
  devServer: {
    // 设置服务器访问的基本目录
    contentBase: path.resolve(__dirname, 'dist'),
    // 服务器IP地址：localhost
    host: 'localhost',
    // 设置端口
    port: 8088,
    // 自动打开浏览器
    open: true,
    // 热更新
    hot: true
  }
}