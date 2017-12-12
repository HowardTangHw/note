[中文文档](http://www.parceljs.io)

`parcel index.html` 

[插件转换文档](http://www.parceljs.io/transforms.html)

### babel

在你的应用程序中安装 presets 和 plugins :

```
yarn add babel-preset-env
```

接着， 创建一个 `.babelrc`:

```js
{
  "presets": ["env"]
}

```

` cnpm i babel-polyfill -D`

`import "babel-polyfill";`

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