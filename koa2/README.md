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



可以利用npm scripts快速启动,在`package.json`中增加代码

```js
"scripts": {
  "dev": "node app.js"
}
```

那么就可以在命令行中运行

```bash
npm run dev
```

代替`node app.js`了



## 中间件

[api](https://koajs.com/)         [zh-api](https://demopark.github.io/koa-docs-Zh-CN/)

### 中间件next的执行顺序

```javascript
const Koa = require('koa');
const app = new Koa();

// 记录执行时间
app.use(async (ctx, next) => {
  let stime = new Date().getTime();
  await next()
  let etime = new Date().getTime();
  ctx.response.type = 'text/html';
  ctx.response.body = `<h1>Hello World!</h1>`;
  console.log(`请求地址:${ctx.path},响应时间:${etime - stime}ms`)
})

app.use(async (ctx, next) => {
  console.log('中间件1,doSomething');
  await next()
  console.log('中间件1 end');
})

app.use(async (ctx, next) => {
  console.log('中间件2,doSomething');
  await next()
  console.log('中间件2 end');
})

app.use(async (ctx, next) => {
  console.log('中间件3,doSomething');
  await next()
  console.log('中间件3 end');
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```

![1526278883809](assets/1526278883809.png)

中间件流转顺序类似于dom事件的流程,先捕获后冒泡,从外往里再从里往外,

也叫**洋葱模式**,Request类似捕获,Response类似冒泡



## [路由 Koa-Router](./koaRouter)

不使用koa-Router

```js
const Koa = require('koa');
const app = new Koa();

// 记录执行时间
app.use(async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.response.body = `<h1>index page</h1>`
  } else {
    await next();
  }
})

app.use(async (ctx, next) => {
  if (ctx.request.path === '/home') {
    ctx.response.body = `<h1>home page</h1>`
  } else {
    await next();
  }
})
app.use(async (ctx, next) => {
  if (ctx.request.path === '/404') {
    ctx.response.body = `<h1>404 not found</h1>`
  } else {
    await next();
  }
})


app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```



### 使用koaRouter

安装:

```bash
yarn add koa-router
```

(api)[https://www.npmjs.com/package/koa-router]

效果代码:

```bash
node app_koa_router.js
```

```js
const Koa = require('koa');
// const Router = require('koa-router');
// const router = new Router();
// 因为require('koa-router')返回的是函数,所以有以下简写
const router = require('koa-router')();
const app = new Koa();
// 添加路由
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>index page</h1>`;
})

router.get('/home', async (ctx, next) => {
  ctx.response.body = `<h1>home page</h1>`;
})

router.get('/404', async (ctx, next) => {
  ctx.response.body = `<h1>404 not found</h1>`;
})


// 匹配上面没有的地址
router.all('/*', async (ctx, next) => {
  ctx.response.status = 404;
  ctx.response.body = '<h1>404 not found</h1>'
})

// 调用中间件
app.use(router.routes());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```

当然，除了 `GET` 方法，`koa-router` 也支持处理其他的请求方法，比如：

```js
router
  .get('/', async (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', async (ctx, next) => {
    // ... 
  })
  .put('/users/:id', async (ctx, next) => {
    // ... 
  })
  .del('/users/:id', async (ctx, next) => {
    // ... 
  })
  .all('/users/:id', async (ctx, next) => {
    // ... 
  });
```

在`HTTP`协议方法中,`GET`,`POST`,`PUT`,`DELETE`分别对应`查`,`增`,`改`,`删`,在`router`也一一对应,在`router`里面还有一个`all`,用于上面所有路由没有适配的情况下(一般用于出404吧);



### 命名路由

```js
const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
router.get('user', '/user/:id', async (ctx, next) => {
  ctx.response.body = '<h1></h1>'
})

const userUrl = router.url('user', 3);
console.log('userUrl', userUrl);
// =>生成路由 /user/3

const userUrl2 = router.url('user', { id: 4 });
console.log('userUrl2', userUrl2);
// =>生成路由 /user/4

// 调用中间件
app.use(router.routes());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```

`router.url` 方法方便我们在代码中根据路由名称和参数(可选)去生成具体的 `URL`，而不用采用字符串拼接的方式去生成 `URL`了。



### 多中间件

`koa-router`支持单个路由多中间件处理,当路由处理函数中有异步操作的时候,这种写法的可读性和可维护性更高.

```js
router.get(
  '/users/:id',
  function (ctx, next) {
    return User.findOne(ctx.params.id).then(function(user) {
      // 首先读取用户的信息，异步操作
      ctx.user = user;
      //调用next调用下个中间件
      await next();
    });
  },
  function (ctx) {
    console.log(ctx.user);
    // 在这个中间件中再对用户信息做一些处理
    // => { id: 17, name: "Alex" }
  }
);
```

利用`await next()`调用下个中间件



 ### 嵌套路由

在应用中定义多个路由，然后把这些路由组合起来用，这样便于我们管理多个路由，也简化了路由的写法。

```js
const Koa = require('koa');
const forums = require('koa-router')();
const posts = require('koa-router')();
const app = new Koa();

// 第一个路由
posts.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>responds to ${ctx.path}
  </br>
  可以获到外面的fid:${ctx.params.fid}</h1>`
})
posts.get('/:pid', async (ctx, next) => {
  ctx.response.body = `<h1>responds pid to ${ctx.path}
  </br>
  可以获到外面的fid:${ctx.params.fid}和pid:${ctx.params.pid}
  </h1>`
})

/* 第二个路由
*  第二个参数:将第一个路由作为中间件传入,
*  第三个参数:将第一个路由异常处理方法传入,
*/

/* 这个地址作为根地址,
 * 当访问/forums/123/posts时,就是访问posts的'/';
 * 访问/forums/123/posts/123的时候,就是访问posts的'/:pid'
*/
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// responds to '/forums/123/posts'
// responds to '/forums/123/posts/123'
app.use(forums.routes());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```



### 路由前缀

通过 `prefix` 这个参数，我们可以为一组路由添加统一的前缀，和嵌套路由类似，也方便我们管理路由和简化路由的写法。不同的是，前缀是一个固定的字符串，不能添加动态参数。

```js
var router = new Router({
  prefix: '/users'
});
 
router.get('/', ...); // 匹配路由 "/users" 
router.get('/:id', ...); // 匹配路由 "/users/:id" 
```



### URL参数

`koa-router` 也支持参数，参数会被添加到 `ctx.params` 中。参数可以是一个正则表达式，这个功能的实现是通过 `path-to-regexp` 来实现的。原理是把 `URL` 字符串转化成正则对象，然后再进行正则匹配，之前的例子中的 `*` 通配符就是一种正则表达式。

```js
router.get('/:category/:title', function (ctx, next) {
  console.log(ctx.params);
  // => { category: 'programming', title: 'how-to-node' } 
});
```

通过上面的例子可以看出，我们可以通过 `ctx.params` 去访问路由中的参数，使得我们能够对参数做一些处理后再执行后续的代码。



## POST/GET请求

### 请求参数放在`URL`后面(query)

其实就是普通的`/?name=abc&id=123`

```js
const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>index page</h1>`
})

router.get('/home', async (ctx, next) => {
  let query = ctx.request.query;
  let queryString = ctx.request.querystring;
  // 对象
  console.log(query);
  // 字符串
  console.log(queryString);
  ctx.response.body = `<h1>HOME page</h1>`
})
// add router middleware:
app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```

访问地址`http://localhost:3000/home?name=abc&id=123`

![1526288105827](assets/1526288105827.png)



### 请求参数放在`URL`中间(params)

利用`ctx.params`获取参数对象

```js
const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>index page</h1>`
})

router.get('/home/:id/:name', async (ctx, next) => {
  console.log(ctx.params);
  ctx.response.body = `<h1>id为:${ctx.params.id} name为:${ctx.params.name}</h1>`
})
// add router middleware:
app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```

访问地址`http://localhost:3000/home/abc/123`

![1526288467922](assets/1526288467922.png)



### 请求参数放在 `body` 中

当用 `post` 方式请求时，我们会遇到一个问题：`post` 请求通常都会通过表单或 `JSON` 形式发送，而无论是 `Node` 还是 `Koa`，都 **没有提供** 解析 `post` 请求参数的功能。

### koa-bodyparser 说：『是时候登场了！』

安装:

```bash
yarn add koa-bodyparser
```

```js
const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser())

// 注册表单
router.get('/user', async (ctx, next) => {
  ctx.response.body =
    `
  <form action="/user/register" method="post">
    <input name="name" type="text" placeholder="请输入用户名:abc">
    <br/>
    <input name="password" type="text" placeholder="请输入密码:123"/>
    <br/>
    <button>GOGOGOGO!</button>
  </form>
  `
})


// 增加响应表单请求的路由
router.post('/user/register', async (ctx, next) => {
  // 用了bodyParser之后,就能从ctx.request.body中获取参数了
  console.log(ctx.request.body);
  let { name, password } = ctx.request.body;
  if (name === 'abc' && password == '123') {
    ctx.response.body = `hello,${name}`;
  } else {
    ctx.response.body = '账户信息错误'
  }
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```

> 用了bodyParser之后,就能从ctx.request.body中获取参数了





## 重构

将业务逻辑分层

### 路由分层

路由部分的代码可以分离成一个独立的文件，并根据个人喜好放置于项目根目录下，或独立放置于 `router` 文件夹中。在这里，我们将它命名为 `router.js`并将之放置于根目录下。



#### 修改路由 router.js

```js
  const router = require('koa-router')()

  module.exports = (app) => {
    router.get('/', async(ctx, next) => {
      ctx.response.body = `<h1>index page</h1>`
    })
    
    router.get('/home', async(ctx, next) => {
      console.log(ctx.request.query)
      console.log(ctx.request.querystring)
      ctx.response.body = '<h1>HOME page</h1>'
    })
    
    router.get('/home/:id/:name', async(ctx, next)=>{
      console.log(ctx.params)
      ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    })
    
    router.get('/user', async(ctx, next)=>{
      ctx.response.body = 
      `
        <form action="/user/register" method="post">
          <input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
          <br/>
          <input name="password" type="text" placeholder="请输入密码：123456"/>
          <br/> 
          <button>GoGoGo</button>
        </form>
      `
    })
    
    // 增加响应表单请求的路由
    router.post('/user/register',async(ctx, next)=>{
      let {name, password} = ctx.request.body
      if( name == 'ikcamp' && password == '123456' ){
        ctx.response.body = `Hello， ${name}！` 
      }else{
        ctx.response.body = '账号信息错误'
      }
    })
    
    app.use(router.routes())
      .use(router.allowedMethods())
  }
```

exports一个函数,将app作为参数传入进来

#### 修改 app.js

```js
  const Koa = require('koa')
  const bodyParser = require('koa-bodyparser')
  const app = new Koa()
  const router = require('./router')

  app.use(bodyParser())

  router(app)

  app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
  })
```

将app作为参数 传入router当中



### 分离controller层

> 我们把路由对应的业务逻辑也分离出来。

#### 新增 controller/home.js

新建 `controller` 文件夹，增加一个 `home.js` 文件，并从 `router.js` 中提取出业务逻辑代码。

```js
  module.exports = {
    index: async(ctx, next) => {
      ctx.response.body = `<h1>index page</h1>`
    },
    home: async(ctx, next) => {
      console.log(ctx.request.query)
      console.log(ctx.request.querystring)
      ctx.response.body = '<h1>HOME page</h1>'
    },
    homeParams: async(ctx, next) => {
      console.log(ctx.params)
      ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    },
    login: async(ctx, next) => {
      ctx.response.body =
        `
        <form action="/user/register" method="post">
          <input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
          <br/>
          <input name="password" type="text" placeholder="请输入密码：123456"/>
          <br/> 
          <button>GoGoGo</button>
        </form>
      `
    },
    register: async(ctx, next) => {
      let {
        name,
        password
      } = ctx.request.body
      if (name == 'ikcamp' && password == '123456') {
        ctx.response.body = `Hello， ${name}！`
      } else {
        ctx.response.body = '账号信息错误'
      }
    }
  }
```



#### 修改路由 router.js

修改 `router.js` 文件，在里面引入 `controler/home`：

```js
  const router = require('koa-router')()
  const HomeController = require('./controller/home')
  module.exports = (app) => {
    router.get( '/', HomeController.index )
    
    router.get('/home', HomeController.home)
    
    router.get('/home/:id/:name', HomeController.homeParams)
    
    router.get('/user', HomeController.login)
    
    router.post('/user/register', HomeController.register)
    
    app.use(router.routes())
      .use(router.allowedMethods())
  }
```

如此，将每个路由的处理逻辑分离到 `controller` 下的独立文件当中，便于后期维护。

目前的代码结构已经比较清晰了，适用于以 `node` 作为中间层、中转层的项目。如果想要把 `node` 作为真正的后端去操作数据库等，**建议**再分出一层 `service`，用于处理数据层面的交互，比如调用 `model` 处理数据库，调用第三方接口等，而`controller` 里面只做一些简单的参数处理。



### 分离service层

#### 新建 service/home.js

新建 `service` 文件夹，并于该文件夹下新增一个 `home.js` 文件，用于抽离 `controller/home.js` 中的部分代码：

```js
module.exports = {
  register: async (name, pwd) => {
    let data = '账号信息错误';
    if (name == 'abc' && pwd == '123') {
      data = `hellow,${name}`;
    }
    return data;
  },
};

```



#### 修改 controller/home.js

```js
// 引入 service 文件
const HomeService = require('../service/home')
module.exports = {
  // ……省略上面代码
  // 重写 register 方法 
  register: async(ctx, next) => {
    let {
      name,
      password
    } = ctx.request.body
    let data = await HomeService.register(name, password)
    ctx.response.body = data
  }
}
```



## 模板引擎nunjucks

### 安装

```bash
yarn add koa-nunjucks-2 
```

### 语法

[api](http://mozilla.github.io/nunjucks/cn/templating.html)

变量

```js
  {{ username }}

  {{ foo.bar }}
  {{ foo["bar"] }}
```

如果变量的值为 `undefined` 或 `null` ，将不予显示。

过滤器

```js
  {{ foo | title }}
  {{ foo | join(",") }}
  {{ foo | replace("foo", "bar") | capitalize }}
```

`if` 判断

```js
  {% if variable %}
    It is true
  {% endif %}

  {% if hungry %}
    I am hungry
  {% elif tired %}
    I am tired
  {% else %}
    I am good!
  {% endif %}
```

`for` 循环

```js
  var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}]
```

```js
  <h1>Posts</h1>
  <ul>
  {% for item in items %}
    <li>{{ item.title }}</li>
  {% else %}
    <li>This would display if the 'item' collection were empty</li>
  {% endfor %}
  </ul>
```

`macro` 宏

宏：定义可复用的内容，类似于编程语言中的函数

```js
  {% macro field(name, value='', type='text') %}
  <div class="field">
    <input type="{{ type }}" name="{{ name }}"
          value="{{ value | escape }}" />
  </div>
  {% endmacro %}
```

接下来就可以把 `field` 当作函数一样使用：

```js
  {{ field('user') }}
  {{ field('pass', type='password') }}
```



### 继承功能

网页常见的结构大多是头部、中间体加尾部，同一个网站下的多个网页，头部和尾部内容通常来说基本一致。于是我们可以采用**继承**功能来进行编写。

先定义一个 `layout.html`

```html
  <html>
    <head>
      {% block head %}
      <link rel="stylesheet">
      {% endblock %}
    </head>  
    <body>
      {% block header %}
      <h1>this is header</h1>
      {% endblock %}

      {% block body %}
      <h1>this is body</h1>
      {% endblock %}

      {% block footer %}
      <h1>this is footer</h1>  
      {% endblock %}

      {% block content %}
      <script>
        //this is place for javascript
      </script>
      {% endblock %}
    </body>
  </html>
```

`layout` 定义了五个模块，分别命名为：`head`、`header`、`body`、`footer`、`content`。`header` 和 `footer` 是公用的，因此基本不动。业务代码的修改只需要在 `body` 内容体中进行、业务样式表和业务脚本分别在头部 `head` 和底部 `content` 中引入。

接下来我们再定义一个业务级别的视图页面：`home.html`

```html
  {% extends 'layout.html' %}

  {% block head %}
  <link href="home.css">
  {% endblock %}

  {% block body %}
  <h1>home 页面内容</h1>
  {% endblock %}

  {% block content %}
  <script src="home.js"></script>
  {% endblock%}
```

最终的 `home.html` 输出后如下所示：

```html
  <html>
    <head>
      <link href="home.css">
    </head>  
    <body>
      <h1>this is header</h1>

      <h1>home 页面内容</h1>

      <h1>this is footer</h1>  

      <script src="home.js"></script>
    </body>
  </html>
```

`extends`将模板继承,而`  {% block body %}{% endblock %}`则会替换掉模板里面相应的内容



### 安全性

请对特殊字符进行转义，防止 `Xss` 攻击。若在页面上写入 `Hello World<script>alert(0)</script>` 这类字符串变量，并且不进行转义，页面渲染时该脚本就会自动执行，弹出提示框。  

所以我们使用的时候-->`在app.js中`

```js
app.use(
  nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'), // 指定视图目录
    nunjucksConfig: {
      trimBlocks: true, // 开启转义 防Xss
    },
  })
);
```



### 使用

修改 `app.js`，引入中间件，并指定存放视图文件的目录 `views`：

```js
  const Koa = require('koa')
  const path = require('path')
  const bodyParser = require('koa-bodyparser')
  const nunjucks = require('koa-nunjucks-2')

  const app = new Koa()
  const router = require('./router')

  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),// 指定视图目录
    nunjucksConfig: {
      trimBlocks: true // 开启转义 防Xss
    }
  }));

  app.use(bodyParser())
  router(app)
  app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
  })
```

在之前的项目中，视图被写在了 `controller/home` 里面，现在我们把它迁移到 `views` 中：

新建 `views/home/login.html`:

```html
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <body>
    <form action="/user/register" method="post">
      <input name="name" type="text" placeholder="请输入用户名：abc" />
      <br/>
      <input name="password" type="text" placeholder="请输入密码：123" />
      <br/>
      <button>{{btnName}}</button>
    </form>
  </body>

  </html>
```

重写 `controller/home` 中的 `login` 方法：

```js
  login: async(ctx, next) => {
      
    await ctx.render('home/login',{
      // 这里可以传参了
      btnName: '这里可以传参了'
    })
  },
```

##### render

`nunjucks.render(name, [context], [callback])`

渲染模式时需要两个参数，模板名 **name** 和数据 **context**。如果 **callback** 存在，当渲染完成后会被调用，第一个参数是错误，第二个为返回的结果；如果不存在，`render` 方法会直接返回结果，错误时会抛错。

**注意：** 这里我们使用了 `await` 来异步读取文件。因为需要等待，所以必须保证读取文件之后再进行请求的响应。