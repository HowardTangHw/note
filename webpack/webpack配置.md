[教你如何读webpack2中文文档](https://github.com/lcxfs1991/blog/issues/17)

[webpack-china](https://doc.webpack-china.org/)

- 安装
- cnpm i -D webpack
- npm init -y
- 常用loader
- npm install --save-dev style-loader css-loader
  <!--这个是SCSS  -->
- npm install sass-loader node-sass webpack --save-dev
- babel 
- npm install --save-dev babel-loader babel-core babel-preset-es2015(这个是版本) webpack
- npm install babel-plugin-transform-runtime --save-dev
- 注意： 你必须执行 npm install babel-plugin-transform-runtime --save-dev 来把它包含到你的项目中，也要使用 npm install babel-runtime --save 把 babel-runtime 安装为一个依赖。
- file-loader (将文件输出到输出文件夹里)
- npm install --save-dev file-loader
- 图片压缩
- npm install image-webpack-loader --save-dev


- jshint 
- (有可能需要安装jshint)
- npm i jshint -d'dsf'asdf'sadf
- npm i jshint-loader --save


- 常用插件

- HtmlWebpackPlugin(自动构建index.html)

- npm install --save-dev html-webpack-plugin

```js
  const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      //这里是插件
      vendor: ['lodash']
    },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Output Management'
     })
   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

- 清理/dist文件夹

- npm install clean-webpack-plugin --save-dev

```js
new CleanWebpackPlugin(['dist']),
```

- webpack-dev-server

- npm install --save-dev webpack-dev-server

```js
//package.json
"scripts": {"start": "webpack-dev-server"}
```



- 不能写HTML了 但是可以用ejs写成模板 再利用html-webpack-plugin插件添加到index.html里面去