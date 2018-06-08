#webpack4.X 学习笔记
## 1. webpage作用:
>1: 打包（把多个文件打包成一个js文件，减少服务器压力，带宽）
2：转化（如sass，lass）用loader
3：优化（对项目进行优化）
## 2. webpack构成：
>|-entry 入口
|-output 出口
|-loaders 转化器
|-plugins 插件
|-devServer 开发服务器
|-mode development/production

## 3. 安装
安装webpack-cli：
>npm i webpack-cli -g/yarn add webpack -g
安装淘宝镜像：
npm install -g cnpm --registry=https://registry.npm.taobao.org

## 4. 生成package.json 
>npm init -y（加上-y就不用提醒，直接生成package.json）
  安装到开发环境的依赖：
  npm i vue --save-dev/npm i vue -D
  安装到生产环境的依赖: 
  npm i vue --save/npm i vue -S

## 5. webpack.config.js配置
> * webpack.config.js配置模板（名字一定是webpack.config.js么？不是）
eg：
如果改名叫: tiny.config.js,
运行时命令得这样: webpack --config tiny.config.js
```javascript
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
```
> * mode:
  webpack --mode development
  webpack --mode production

> * 多入口配置：
```javascript
    entry: ['./src/index.js', './src/index2.js'],// 按顺序打包
```
> * 多入口多出口配置：
```javascript
    entry: {
      index: './src/index.js',
      index2: './src/index2.js'
    },
    output: {
      path: path.resolve(__dirname,'dist'),
      filename: '[name].bundle.js'
    },
```
> * html-webpack-plugin(生成页面)
```javascript
  安装：
    npm i html-webpack-plugin -D
    注意：依赖webpack/webpack-cli
  引入：const HtmlWebpackPlugin = require('html-webpack-plugin')
  使用：plugins: [new HtmlWebpackPlugin()],

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
    // 压缩输出，生成多个页面，多页面分别引入自己的js
    new HtmlWebpackPlugin({
      minify:{
        collapseWhitespace: true,//去除空格
        removeAttributeQuotes: true //去除属性双引号
      },
      filename: 'index.html'//生成多个页面
      chunks: ['js名'] //多页面分别引入自己的js
    })
  ],
  ```
> * clean-webpack-glugin(删除某些东西)
```javascript
1):安装:（npm i clean-webpack-glugin -D）
2):引入: (const CleanWebpackPlugin= require('clean-webpack-plugin'))
3):使用: new CleanWebpackPlugin(['dist']),
  ```
> * devServer配置：
```javascript
1):安装：npm i webpack-dev-server -D
2):使用：
  devServer: {
    // 设置服务器访问的基本目录
    contentBase: path.resolve(__dirname, 'dist'),
    // 服务器IP地址：localhost
    host: 'localhost',
    // 设置端口
    port: 8090,
    // 自动打开浏览器
    open: true,
    // 热更新(只更新更改的部分)
    /* 
    * 注意：此时需要引入webpack， 
    * 在plugins选项里加入一个webpack的热更新实例：
    * new webpack.HotModuleReplacementPlugin()
    */
    hot: true
  }
  // 此时package.json:
    "scripts": {
      "dev": "webpack-dev-server --mode development",
      "build": "webpack --mode production"
    },
  ```
> * loaders(转化器，加载器，如：less/sass->css,ES7/8):
```javascript
 处理css文件：
    style-loader
    css-loader
    npm i style-loader css-loader -D
    关于loader到写法：
      1）：use : ['style-loader', 'css-loader']
      2）：loader : ['style-loader', 'css-loader']
      3）：use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'},
          ]
  ```
> * 打包后压缩上线：
```javascript
  1）：webpack4.X以后
    直接在package.json的build里加 --mode production即可
    "script":{
      "build": "webpack --mode production"
    }
  2）：之前版本需要用插件(不过现在都4以上了，用不上了)
    uglifyjs-webpack-plugin
      a):npm i uglifyjs-webpack-plugin -D
      b):const uglify = require('uglifyjs-webpack-plugin')
      c):new uglify()
  ```
> * images处理(jpg/png/jpeg/gif)：
```javascript
  1):loader: url-loader,file-loader
  2):配置：
      {
        test: /\.(png|jpg|gif|svg)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            outputPath: 'images' //图片打包出去的目录
          }
        }]
      }
  ```
> * 分离css打包的文件
```javascript
   1): plugin: extract-text-webpack-plugin/mini-css-extract-plugin
   2): npm i extract-text-webpack-plugin@next -D
   3): 配置: new ExtractTextWebpackPlugin('css/index.css(提取出去的路径)')
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use:'css-loader',
          publicPath: '../' // 背景图路径
        })
      }
```
> * less/sass处理
```javascript
  1): npm i less less-loader  -D/node-sass,sass-loader
  2): 配置：
      {
        test: /\.less$/,
        // use: ['style-loader', 'css-loader', 'less-loader']
        // 提取less
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        })
      }
```
> * transform(自动处理前缀)
```javascript
  1): postCss
  2): npm i postcss-loader autoprefixer -D
  3): postcss.config.js
    postcss.config.js配置：
      module.exports = {
        plugins: [
          require('autoprefixer')
        ]
      }
    对应的webpack.config.js配置
      use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use:['css-loader','postcss-loader'],
        publicPath: '../' // 背景图路径
      })
```
> * 消除冗余的没用到的CSS代码;
```javascript
  1): purifycss
  2): npm i purifycss-webpack purify-css -D
  3): 引入插件：const PurifyCssPlugin = require('purifycss-webpack')
  4): 需要引入一个额外的包
    glob（一个扫描文件的plugin）
    |-npm i glob -D
    配置
    const glob = require('glob')
    new PurifyCssPlugin({
      paths:glob.sync(path.join(__dirname, 'src/*.html'))
    })
```
> * 调试
```javascript
    1): wabpack4.X以上开启调试：--mode development
    2): webpack3.X以前：
      在package.json里加上如下配置：devtool:source-map(暴露源码)
  ```
> * babel
 ```javascript
    1): 作用：编译js/轻松使用ESnext转化/jsx
    2): babel-core/babel-loader/babel-preset-env
    3): npm i babel-core babel-loader babel-preset-env -D
    4): 配置：
      在.babelrc文件里
      {
        "presets": [
          "env"
        ]
      }
  ```
> * jsx(react环境搭建)
```javascript
    1): npm i babel-preset-react -D
    2): 在.babelrc文件里配置
      {
        "presets": [
          "env","react"
        ]
      }
    3): npm i react react-dom -D
  ```
> * 静态资源输出
```javascript
  1): copy-webpack-plugin
  2): npm i copy-webpack-plugin -D
  3): 引人/配置
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/assets'),
      to: '../public'
    }])
  ```
> * 第三方库的使用
```javascript
  1): npm i jquery -S
  2): import $ from 'jquery'
  3): 全局使用：webpack提供了一个ProvidePlugin方法
      const webpack = require('webpack')
      在plugin里：
        new webpack.ProvidePlugin({
          $:'jquery'
        })
  4): 使用import和ProviderPlugin的区别：
    import方式引入的时候，无论在代码中是否使用jquery，打包后都会打包进去，会产生大量冗余的js代码，而ProvidePlugin只有在使用到的时候才会打包
  5): 提取第三方js库
    配置：
      optimization:{
        splitChunks: {
          cacheGroups:{
            vendor: {
              chunks: 'initial',
              name: 'jquery',
              enforce: true
            }
          }
        }
      }
  ```