#  Koa2学习

## 环境部署

### 初始化目录

进入目录结构中,然后利用:

```bash
yarn init
```

初始化项目,这样之后会生成一个`package.json`文件

然后新增一个`app.js`文件 作为**入口文件**



### 启动服务器

先安装koa

```
yarn add koa
```



在`app.js`中项目中引入koa,并且生成实例

```js
const Koa = require('koa');
const app = new Koa();

app.listen(3000, () => {
  console.log('server is running at http://localhost:300')
})
```

然后运行`node app.js`

这样打开服务了



## 中间件

