## 模板使用说明:

如果未安装`parcel`就需要安装:

`npm i parcel -g`

安装依赖包:

`npm init`

运行:

`parcel index.html` or`npm run dev`

打包:

`npm run build`

地址:

`http://localhost:3000/`

[中文文档](http://www.parceljs.io)

[插件转换文档](http://www.parceljs.io/transforms.html)



## 目前问题

版本号:1.1.0

bug:

在使用build的时候,如果不带`--no-minify`会报错, ISSUE:[#8](https://github.com/parcel-bundler/parcel/issues/8)



## 常用

### babel

在你的应用程序中安装 presets 和 plugins :

```
yarn add babel-preset-2015
```

接着， 创建一个 `.babelrc`:

```js
{
  "presets": ["2015"]
}

```

` cnpm i babel-polyfill -D`

`import "babel-polyfill";`

------------------------------

### POSTCSS

`yarn add postcss-modules autoprefixer`

 `.postcssrc` 

```js
{
  "modules": false,//为true的话就是因为它们也导出一个包含在 JavaScript 包中的对象。
  "plugins": {
    "autoprefixer": {
      "grid": true
    }
  }
}
```

[Topthinking的 parcel-react](https://github.com/Topthinking/parcel-react)



----------------------------

个人感觉现在用起来比webpack所需要配置的项更简单,不知道以后推出更多的插件时会怎样...可用于比较小型的项目