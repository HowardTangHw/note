# vue-loader笔记

`vue-loader` 提供的的特性：

- 默认支持 ES2015；
- 允许对 Vue 组件的组成部分使用其它 Webpack loader，比如对 `<style>` 使用 SASS 和对 `<template>` 使用 Jade；
- `.vue` 文件中允许自定义节点，然后使用自定义的 loader 进行处理；
- 把 `<style>` 和 `<template>` 中的静态资源当作模块来对待，并使用 Webpack loader 进行处理；
- 对每个组件模拟出 CSS 作用域；
- 支持开发期组件的热重载。



## Vue组件细则

`.vue` 文件是一个自定义的文件类型，用类 HTML 语法描述一个 Vue 组件。每个 `.vue` 文件包含三种类型的顶级语言块 `<template>`、`<script>` 和 `<style>`，还允许添加可选的自定义块：

```html
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>
```

`vue-loader` 会解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 CommonJS 模块，`module.exports` 出一个 Vue.js 组件对象。



`vue-loader` 支持使用非默认语言，比如 CSS 预处理器，预编译的 HTML 模版语言，通过设置语言块的 `lang` 属性。例如，你可以像下面这样使用 SASS 语法编写样式：

```html
<style lang="sass">
  /* write SASS! */
</style>
```



### 语言快

1. `<template>`
   - 默认语言:`html`
   - 每个 `.vue` 文件**最多包含一个** `<template>` 块。
   - 内容将被提取为字符串，将编译并用作 Vue 组件的 `template` 选项。
2. `<script>`
   - 默认语言：`js` (在检测到 `babel-loader` 或 `buble-loader` 配置时自动支持ES2015)。
   - 每个`.vue`文件**最多包含一个**`<script>`块
   - 该脚本在类 CommonJS 环境中执行 (就像通过 Webpack 打包的正常 js 模块)，这意味这你可以使用 `import` 和 `export` 语法。
3. `<style>`
   - 默认语言：`css`。
   - 一个 `.vue` 文件可以包含多个 `<style>` 标签。
   - `<style>` 标签可以有 `scoped` 或者 `module` 属性 (查看 [CSS 作用域](https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html)和 [CSS Modules](https://vue-loader.vuejs.org/zh-cn/features/css-modules.html)) 以帮助你将样式封装到当前组件。具有不同封装模式的多个 `<style>` 标签可以在同一个组件中混合使用。
   - 默认情况下，将会使用 `style-loader` 提取内容，并通过 `<style>` 标签动态加入文档的 `<head>` 中，也可以[配置 Webpack 将所有 styles 提取到单个 CSS 文件中](https://vue-loader.vuejs.org/zh-cn/configurations/extract-css.html)。

### 自定义块

可以在 `.vue` 文件中添加额外的自定义块来实现项目的特定需求，例如 `<docs>`块。`vue-loader` 将会使用标签名来查找对应的 webpack loader 来应用在对应的块上。Webpack loader 需要在 `vue-loader` 的选项 `loaders` 中指定。



### Src导入

如果想要分割`.vue`文件到多个文件中,可以通过`src`属性导入外部文件:

```html
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

需要注意的是 `src` 导入遵循和 `require()` 一样的规则，味着相对路径需要以 `./`开始，还可以从 NPM 包中直接导入资源，例如：

```HTML
<!-- import a file from the installed "todomvc-app-css" npm package -->
<style src="todomvc-app-css/index.css">
```

在自定义块上同样支持 `src` 导入，例如：

```html
<unit-test src="./unit-test.js">
</unit-test>
```



## 特性

### css Modules

```html
<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
<template>
  <p :class="$style.red">
    This should be red
  </p>
    <div>
    <p :class="{ [$style.red]: isRed }">
      Am I red?
    </p>
    <p :class="[$style.red, $style.bold]">
      Red and bold
    </p>
  </div>
</template>
<script>
export default {
  created () {
    console.log(this.$style.red)
    // -> "_1VyoJ-uZOjlOxP7jWUy19_0"
    // an identifier generated based on filename and className.
  }
}
</script>
```

#### 自定义注入名称

在单个组件中,可以定义不止一个`<style>`,为了避免被覆盖,可以通过设置`module`属性来为它们定义注入后计算属性名称:

```html
<style module="a">
  /* identifiers injected as a */
</style>

<style module="b">
  /* identifiers injected as b */
</style>
```

 #### 配置`css-loader`Query

默认query

```js
{
  modules: true,
  importLoaders: true,
  localIdentName: '[hash:base64]'
}
```

使用`vue-loader` 的 `cssModules` 选项去为 `css-loader` 添加 query 配置：

```js
module: {
    rules:[
        {
            test: '\.vue$',
            loader: 'vue-loader',
            options: {
              cssModules: {
                localIdentName: '[path][name]---[local]---[hash:base64:5]',
                camelCase: true
              }
            }
        }
    ]
}
```

