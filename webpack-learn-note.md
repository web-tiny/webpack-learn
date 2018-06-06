#webpack4.X 学习笔记
```javascript
webpage作用
1: 打包（把多个文件打包成一个js文件，减少服务器压力，带宽）
2：转化（如sass，lass）用loader
3：优化（对项目进行优化）
webpack构成：
1：entry 入口
2：output 出口
3：loaders 转化器
4：plugins 插件
5：devServer 开发服务器
6：mode development/production
-----------------------------
安装
npm i webpack-cli -g/yarn add webpack -g
安装淘宝镜像：
npm install -g cnpm --registry=https://registry.npm.taobao.org
---------------------------------
生成package.json 
npm init -y（加上-y就不用提醒，直接生成package.json）
-------------------------------
安装到开发环境的依赖：
npm i vue --save-dev/npm i vue -D
安装到生产环境的依赖: 
npm i vue --save/npm i vue -S
----------------------------------
webpack.config.js配置模板（名字一定是webpack.config.js么，不是）
eg：
如果改名叫: tiny.config.js,
运行时命令得这样: webpack --config tiny.config.js
    const path = require('path') //node系统模块
    module.exports = {
      // 入口
      entry: {},
      // 出口
      output: {
        path: path.resolve(__dirname,'dist'),//path必须是绝对路径
        filename: 'bundle.js'
      },
      // module
      module: {},
      // plugins
      plugins: [],
      // 开发服务器
      devServer: {}
    }
------------------------------
mode:
  webpack --mode development
  webpack --mode production
-------------------------------
多入口配置：
    entry: ['./src/index.js', './src/index2.js'],// 按顺序打包

----------------------------------
多入口多出口配置：
    entry: {
      index: './src/index.js',
      index2: './src/index2.js'
    },
    output: {
      path: path.resolve(__dirname,'dist'),
      filename: '[name].bundle.js'
    },
-----------------------------------------
html-webpack-plugin(生成页面)
  安装：
    npm i html-webpack-plugin -D
  注意：**依赖webpack/webpack-cli
  引入：const HtmlWebpackPlugin = require('html-webpack-plugin')
  使用：plugins: [new HtmlWebpackPlugin()],
  -----------------------------------------
  html-webpack-plugin 生成指定模板
  plugins: [
    // 模板
    new HtmlWebpackPlugin({
      template: '模板地址'
    })
    // 页面标题(注意：一定要在模板中使用<%=htmlWebpackPlugin.options.title%>)
    new HtmlWebpackPlugin({
      title: 'webpack how are you ',
      template: '模板地址'
    })
    // 生成链接消除缓存(每次都有随机生成的hash值，避免缓存带来的bug)
    new HtmlWebpackPlugin({
      hash: true
    })
    // 压缩输出
    new HtmlWebpackPlugin({
      minify:{
        collapseWhitespace: true,//去除空格
        removeAttributeQuotes: true //去除属性双引号
      }
    })
  ],
```
