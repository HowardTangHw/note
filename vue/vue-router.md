# Vue-router笔记

:arrow_right_hook:[官方文档](https://router.vuejs.org/zh-cn/essentials/getting-started.html)

[TOC]



## 基础

### 开始

通过组合组件来组成应用程序 :

引入vue-router => 将组件(components) 映射到 路由(routes) => 告诉`vue-router`在哪里渲染



简单例子:

> html

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- 引入router -->
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<div id="app">
  <h1>HELLO APP!</h1>
  <p>
    <!-- 使用router-link 组件来导航 -->
    <!-- 通过传入 to 属性 指定链接 -->
    <!-- <router-link> 默认被渲染成一个 <a> 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件渲染在这里 -->
  <router-view></router-view>
</div>
```

> JavaScript

```js
// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1.定义(路由) 组件
// 可以从其他文件import进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>Bar</div>' }

// 2.定义路由
/*
   * 每个路由应该映射一个组件
   * 其中"component"可以是通过 Vue.extend() 创建的组件构造器,
   * 或者,只是一个组件配置对象
   */
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router实例,然后传routes配置
const router = new VueRouter({
  routes //(缩写)相当于 routes:routes
})
// 4. 创建和挂在实例,记得要通过router配置参数注入路由,从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app');
```



### 动态路由匹配

我们如果需要把某种匹配到的所有路由,全都映射到同个组件,例如有一个`User`组件,对于ID各不相同的用户,都要用这个组件渲染.这时我们可以在`Vue-router`的路由路径中使用『动态路径参数』(dynamic segment)来达到这个效果:

一个『路径参数』使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。

> HTML

```html
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- 引入router -->
  <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
  <div id="app">
    <router-link to="/user/foo">GO TO FOO</router-link>
    <router-link to="/user/bar">GO TO BAR</router-link>
    <router-view></router-view>
  </div>
```

> JAVASCRIPT

```js
//一个『路径参数』使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。
const User = {
  template: '<div>User {{$route.params.id}}</div>'
}
const UserB={
  template:'<a v-bind:href="link" target="_blank">{{$route.params.name}}id为{{$route.params.id}}</a>',
  data:function(){
    return {
      link:'https://www.baidu.com'
    }
  }
}
const routes = [
  { path: '/user/:id', component: User },
  { path: '/userB/:name/:id', component: UserB }
]
const router = new VueRouter({
  routes
})
const app = new Vue({
  router
}).$mount('#app');
```

可以在一个路由中设置多段『路径参数』，对应的值都会设置到 `$route.params` 中。例如：

| 模式                            | 匹配路径                | $route.params                        |
| ----------------------------- | ------------------- | ------------------------------------ |
| /user/:username               | /user/evan          | `{ username: 'evan' }`               |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: 123 }` |

除了 `$route.params` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query`（如果 URL 中有查询参数）、`$route.hash` 等等。 [API 文档](https://router.vuejs.org/zh-cn/api/route-object.html) 



#### 响应路由参数的变化

使用路由参数时,例如从`/user/foo`导航到`/user/bar`,**原来的组件实例会被复用**. 因为两个路由都渲染同个组件,比起销毁再创建,复用则显得更加高效.**这也意味着组件的声明周期钩子不会再被调用**

复用组件时,相对路由参数的变化作出响应的话,可以简单的`watch`(监测变化)`$route`对象

```js
const User = {
    template: '...',
  	watch:{
        '$route'(to,from){
             // 对路由变化作出响应...
              console.log('to' + to);
              console.log(this.$route.params.id);
              console.log('from' + from);
        }
    }
}
```

或者使用 2.2 中引入的 `beforeRouteUpdate` 守卫：

```js
beforeRouteUpdate(to, from, next) {
  console.log('to' + to);
  console.log(this.$route.params.id);
  console.log('from' + from);
  //别忘了next() 不然就不跳转了
  next();
}
```



#### 高级匹配模式

`vue-router` 使用 [path-to-regexp](https://github.com/pillarjs/path-to-regexp) 作为路径匹配引擎，所以支持很多高级的匹配模式，例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配。查看它的 [文档](https://github.com/pillarjs/path-to-regexp#parameters) 学习高阶的路径匹配，还有 [这个例子 ](https://github.com/vuejs/vue-router/blob/next/examples/route-matching/app.js)展示 `vue-router` 怎么使用这类匹配。



#### 匹配优先级

有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。



### 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

```
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

借助 `vue-router`，使用嵌套路由配置，就可以很简单地表达这种关系。

```html
<div id="app">
  <router-view></router-view>
</div>
<script>
  const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
</script>
```

这里的`router-view`是最顶层出口,渲染最高级路由匹配到的组件.同样的,在一个被渲染组件同样可以包含自己的嵌套`router-view`

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

要在嵌套的出口中渲染组件,需要在`VueRouter`的参数中使用`children`配置:

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

**要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**

此时，基于上面的配置，当你访问 `/user/foo` 时，`User` 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },

        // ...其他子路由
      ]
    }
  ]
})
```



DEMO:

> HTML

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- 引入router -->
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<div id="app">
  <router-link to="/user/index/">GO TO index</router-link>
  <router-link to="/user/index/foo">GO TO FOO</router-link>
  <router-link to="/user/index/bar">GO TO BAR</router-link>
  <router-view></router-view>
</div>
```

```js
  const User = {
    template: `
    <div id="user">
      <p>{{$route.params.id}}</p>
      <router-view></router-view>
    </div>
    `
  }
  const Foo = {
    template: '<div>这是Foo</div>'
  }
  const Bar = {
    template: '<div>这是Bar</div>'
  }
  const index = {
    template: '<div>这是首页</div>'
  }
  const routes = [
    {
      path: '/user/:id', component: User,
      children: [
        { path: '', component: index },
        { path: 'foo', component: Foo },
        { path: 'bar', component: Bar }
      ]
    }
  ];
  const router = new VueRouter({
    routes
  })
  const app = new Vue({
    router
  }).$mount('#app');
```



### 编程式的导航

除了使用`<router-link>`创建a标签来定义导航链接,还可以借用router的实例方法,通过编写代码来实现.

#### **`router.push(loaction, onComplete?, onAbort?)`**

**:warning:在`Vue实例内部`,可以通过`$router`访问路由实例,因此可以调用`this.$router.push`**

想要导航到不同的URL,则使用`router.push`方法,这个方法会向history栈添加一个新纪录,所以,当用户点击浏览器后退按钮时,则回到之前的URL.

点击`<router-link>`时,这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

| 声明式                       | 编程式                                 |
| ------------------------- | ----------------------------------- |
| `<router-link :to="...">` | `router.push(...)`(就是触发事件 可以绑定在按钮上) |

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

**注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：**

```js
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

同样的规则也适用于 `router-link` 组件的 `to` 属性。



**`router.push(loaction, onComplete?, onAbort?)`**

在 2.2.0+，可选的在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。



:warning:注意:如果目的地和当前路由相同,只有参数发生了改变只有参数发生了改变 (比如从一个用户资料到另一个 `/users/1` -> `/users/2`)，需要使用[`beforeRouteUpdate`](https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html#响应路由参数的变化) 来响应这个变化 (比如抓取用户信息)。



#### **`router.replace(location, onComplete?, onAbort?)`**

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录(**就是不可以后退,前进了吧?**)，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

| 声明式                               | 编程式                   |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |



#### `router.go(n)`

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。

例子

```javascript
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

#### 操作 History

你也许注意到 `router.push`、 `router.replace` 和 `router.go` 跟 [`window.history.pushState`、 `window.history.replaceState` 和 `window.history.go`](https://developer.mozilla.org/en-US/docs/Web/API/History)好像， 实际上它们确实是效仿 `window.history` API 的。

因此，如果你已经熟悉 [Browser History APIs](https://developer.mozilla.org/en-US/docs/Web/API/History_API)，那么在 vue-router 中操作 history 就是超级简单的。

还有值得提及的，vue-router 的导航方法 （`push`、 `replace`、 `go`） 在各类路由模式（`history`、 `hash` 和 `abstract`）下表现一致。



### 命名路由

可以在创建Router实例的时候,在`routes`配置中,给某个路由设置名称

```js
const router = new VueRouter({
    routes:[
        {
            path:'/user/:userId',
          	//定义路由名称
          	name:'user',
          	componet:User
        }
    ]
})
```

要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象：

```html
<!-- name就是路由的名称 -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

这跟代码调用 `router.push()` 是一回事：

```js
router.push({ name: 'user', params: { userId: 123 }})
```

这两种方式都会把路由导航到 `/user/123` 路径。



### 命名视图

如果想同时(同级)展示多个视图,而不是嵌套展示,例如创建一个布局,有`sidebar`(侧导航)和`main`(主内容)两个视图,这时候就要用到命名视图

在界面中,可以拥有多个单独命名的视图,而不是只有一个单独的出口.

如果视图`router-view`没有设置名字,那么默认为`default`

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染,因此对于同个路由,多个视图就需要多个组件.确保正确使用`components`配置(要带上s):

```js
const router = new VueRouter({
    routes: [
        {
            path:'/',
          	components:{
              default:Foo,
              a:Bar,
              b:Baz
            }
        }
    ]
})
```



### 重定向 & 别名

#### 重定向

『重定向』的意思是，当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`

重定向也是通过`routes`配置来完成,



```js
// /a重定向到/b
const router = new VueRouter({
    routes:[
        {
            path:'/a',
          	redirect:'/b'
        }
    ]
})
```

重定向的目标也可以是一个命名的路由:

```js
const router = new VueRouter({
    routes:[
        { path:'/a',redirect:{name:'foo'}}
    ]
})
```

甚至是一个方法,动态返回重定向目标:

```js
const router = new VueRouter({
    routes : [
        {
            path:'/a',redirect : to={
                //方法接收 目标路由 作为参数
              	// return  重定向的 字符串路径/路径对象
            }
        }
    ] 
})
```



#### 别名

**/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。**

『别名』的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```



### 路由组件传参

在组件中使用`$route` 会使之与其对应路由形成高度耦合,从而使组件只能在有些特定的url上使用,限制了其灵活性

:x:与`$route`耦合

```js
const User = {
    template : '<div>User {{$route.params.id}}</div>'
}
const router = new VueRouter({
    routes:[
        { path: '/user/:id' , component:User }
    ]
})
```

:+1:使用props解耦

```js
const User = {
  props:['id'],
  template:'<div>User {{id}}</div>'
}
const router = new VueRouter({
    routes:[
        { path:'/user/:id',component:User,props:true }
      
      	// 对于包含命名视图的路由,必须分别为每个命名视图添加props选项:
      {
      	path:'/user/:id',
      	components:{ default : User, sidebar:Sidebar },
      	props: { default : true , sidebar : false } 
      }
    ]
})
```

这样方便可以在任何地方使用该组件，使得该组件更易于重用和测试。

#### 布尔模式

如果props被设置为true,`route.params`将会被设置为组件属性.



#### 对象模式

如果props是一个对象,它会被按原样设置为组件属性.当props是静态的时候有用

```js
const router = new VueRouter({
  routes: [
    { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
  ]
})
```



#### 函数模式

可以创建一个函数返回props.这样便可以将参数转换成另一种类型,将静态值与基于路由的值结合等等.

```js
const router = new VueRouter({
    routes:[
        { path:'/search', component : SearchUser , props:(route) => ({
             query: route.query.q
        })} }
    ]
})
```

Url:`/search?q=vue`会将`{query:'Vue'}`  作为属性传递给SearchUser组件

要尽可能保持props函数为无状态的,因为它至辉在路由发生变化时起作用.如果需要状态来定义props,要使用包装组件,这样 vue才可以对状态变化作出反应.

[高级用法](https://github.com/vuejs/vue-router/blob/dev/examples/route-props/app.js)



### HTML5 History模式

`vue-router`模式hash模式--使用url的hash来模拟一个完整的URL,于是当URL改变时,页面不会重新加载.

如果不想要这种很丑的hash,我们可以用路由的**history模式**,这个模式充分利用`history.pushState` API来完成URL跳转而无需重新加载页面

```js
const router = new VueRouter({
    mode:'history',
  	routes:[...]
})
```

当使用`history`模式时,URL就像正常的URL,例如`http://yoursite.com/user/id`

不过这种模式需要后台配置,因为vue应用是个`单页客户端应用`,如果后台没有正确配置,当用户在浏览器直接访问`http://yoursite.com/user/id`的时候,就会返回404

所以,要在服务端增加衣蛾覆盖所有情况的候选资源:如果RUL匹配不到任何静态资源,则应该返回同一个`index.html`页面,这个页面就是我们app依赖的页面.



#### 后端配置例子

##### Apache

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```



##### nginx

```
location / {
  try_files $uri $uri/ /index.html:
}
```



##### 原生Node.js

```js
const http = require('http')
const fs = require('fs')
const httpProt = 80

http.createServer((req,res) => {
    fs.readFile('index.html','utf-8', (err,content)=>{
        if(err) {
            console.log('we cannot open 'index.html' file ').
        }
      
      	res.writeHead(200,{
            'Content-Type':'text/html;charset=utf-8'
        })
      	
      	res.end(content)
    })
}).listen(httpPort,()=>{
    console.log('Server listening on :htpp://localhost:%s',httpPort)
})
```



##### 基于Node.js的 Express

对于 Node.js/Express，请考虑使用 [connect-history-api-fallback 中间件](https://github.com/bripkens/connect-history-api-fallback)。



##### Internet Information Services (IIS)

1. 安装 [IIS UrlRewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
2. 在你的网站根目录中创建一个 `web.config` 文件，内容如下：

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Handle History Mode and custom 404/500" stopProcessing="true">
            <match url="(.*)" />
            <conditions logicalGrouping="MatchAll">
              <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
              <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
            </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

##### Caddy

```
rewrite {
    regexp .*
    to {path} /
}
```



#### 警告

改为`mode:'history'`,配置完后台后,服务器就不再返回404错误页面,因为对于所有路径都会返回`index.html`文件.

为了避免这种情况,应当在Vue应有里面覆盖所有路由的情况,然后再给出一个404页面.

> 同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。所以这个404通用匹配应当放在最后

```js
const router = new VueRouter({
    mode:'history',
  	routes:[
        { path:'*' , component:NotFoundComponent }
    ]
})
```

如果使用node.js服务器,可以用服务端路由匹配到来的URL,并在没有匹配到路由的时候返回404,以实现回退,更多详情请查阅 [Vue 服务端渲染文档](https://ssr.vuejs.org/zh/)。



## 进阶

### 导航守卫

> 『导航』表示路由正在发生改变。

`vue-router`提供的导航守卫主要用来跳转或取消的方式守卫导航,有多种机会植入路由导航过程中:全局的,单个路由共享的,或者组件级的

**参数或查询的改变并不会触发进入/离开的导航守卫**,可以通过**[观察`$route`对象](https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html#响应路由参数的变化)** 来应对这些变化(监控参数或查询的变化),或使用`beforeRouteUpdate`的组件内守卫.

#### 全局守卫

可以使用一个`router.beforeEach`注册一个全局前置守卫:

```js
const router = new VueRouter({...});
router.beforeEach((to,from,next)=>{
  // ...
})
```

当一个导航(路由发生改变)触发时,全局前置守卫按照创建顺序调用.守卫是异步解析执行,此时导航在所有守卫resolve完之前一直处于**等待中**.(要等到所有守卫resolve完之后,路由才发生改变?)



守卫方法接收3个参数:

- `to:Route`:即将要进入的目标[路由对象](https://router.vuejs.org/zh-cn/api/route-object.html)
- `frome:Route`:当前导航正要离开的路由对象
- `next:Function`:**一定要调用该方法来resolve这个钩子**.执行效果依赖`next`方法的调用参数.
  - `next()`:进行管道中的下一个钩子,如果全部钩子执行完了,则执行依赖`next`方法的调用参数.
  - `next(false)`:中断当前的导航,如果浏览器的URL改变了(用户手动或者浏览器后退按钮),那么URL会重置到`from`路由对应的地址.
  - `next('/')`或者`next({ path:'/' })`:跳转到一个不同的地址,当前的导航被中断,然后进行一个新的导航.(应该也可以是{name:'routename'}吧?)
  - `next(error)`:(2.4.0+)如果传入`next`的参数是一个`Error`实例,则导航会被终止且该错误会被传递给`router.onError()`注册过的回调.

**确保要调用`next`方法,否则钩子就不会被resolved.**



#### 全局解析守卫

> 2.5.0新增

在2.5.0+可以用`router.beforeResolve`(全局解析守卫)注册一个全局守卫,这和`router.beforeEach`(全局前置守卫)类似,区别是在导航被确认之前,**同时在所有组件内守卫和异步路由组件被解析之后**,解析守卫就会被调用.

> `router.beforeEach`(全局前置守卫) 是异步解析执行的
>
> 而`router.beforeResolve`(全局解析守卫) 是在解析之后,才会被调用



#### 全局后置钩子

也可以注册全局后置钩子,和守卫不同的是,这些钩子不会接受`next`函数也不会改变导航本身(只是用来记录本来的路由对象和目标的路由对象?):

```js
router.afterEach((to,from) =>{
    //...
})
```



#### 路由独享的守卫

可以在路由配置上直接定义`beforeEnter`守卫:

```js
const router = new VueRouter({
    routes: [
        {
          path:'/foo',
          component:Foo,
          beforeEnter:(to,from,next) =>{
              //...
          }
		}
    ]
})
```

这些守卫与全局前置守卫的方法参数是一样的



#### 组件内的守卫

可以在路由组件内直接定义一下路由导航守卫:

- `beforeRouteEnter`
- `beforeRouteUpdate`(2.2新增)
- `beforeRouteLeave`

```js
const Foo = {
    template:'...',
  	beforeRouteEnter(to,from,next){
        //在渲染该组件的对应路由被 confirm(确认) 前调用
      	//不能获取组件实例--this
      	//因为当守卫执行前,组件实例还没被创建
    },
  	beforeRouteUpdate (to,from,next){
        // 在当前路由改变,但是该组件被复用时调用(例如调用的还是该组件,只是动态参数的路径改变了)
      	//example : 对于一个带有动态参数的路径/foo/:id,在/foo/1和/foo/2之间跳转的时候
      	//由于会渲染同样的Foo 组件,因此组件实例会被复用,而这时 这个钩子就会被调用
      	//可以访问组件实例--this
    },
  	beforeRouteLeave (to,from,next){
        //导航离开该组件的对应路由时调用
      	//可以访问组件实例--this
    }
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

不过,可以通过传一个回调给`next`来访问组件实例.在导航被确认的时候执行回调,并且把组件实例作为回调方法的参数.

```js
beforeRouteEnter(to,from,next){
    next(vm=>{
        //通过`vm`访问组件实例
    })
}
```

可以在`beforeRouteLeave`中直接访问`this`,这个离开守卫通常用来禁止用户在还未保存修改前突然离开,可以通过`next(false)`来取消导航.



#### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫(`beforeRouteLeave`组件内的守卫)。
3. 调用全局`beforeEach`守卫.(全局守卫)
4. 在重用的组件里调用`beforeRouteUpdate` (组件内)守卫(2.2+).
5. 在路由配置里调用`beforeEnter`(路由独享的守卫)
6. 解析异步路由组件
7. 在被激活的组件调用`beforeRouteEnter`(组件内的守卫).
8. 调用全局的`beforeResolve`守卫(2.5+)(全局解析守卫)
9. 导航被确认
10. 调用全局的`afterEach`钩子(全局后置钩子)
11. 触发DOM更新
12. 用创建好的实例调用`beforeRouteEnter`守卫中传给`next`的回调函数



### 路由元信息

定义路由的时候可以配置`meta`字段:

```js
const router = new VueRouter({
    routes:[
        {
            path : '/foo',
          	component:Foo,
          	children:[
                {
                    path:'bar',
                  	component:Bar,
                  	//a meta field
                  	meta:{ requiresAuth:true }
                }
            ]
        }
    ]
})
```

我们称呼`routes`配置中,每个路由对象为**路由记录**,路由记录可以是嵌套的,因此当一个路由匹配成功后,他可能匹配多个路由记录

根据上面的路由配置,`/foo/bar`这个URL将会匹配父路由记录以及子路由记录.

一个路由匹配到的所有路由记录会暴露为`$route`对象(还有在导航守卫中的路由对象)的`$route.matched`数组.**因此我们可以通过遍历`$route.matched`来检查路由记录中的`meta`字段**

在全局导航守卫中检查元字段：

```js
router.beforeEeach((to,from,next)=>{
    if(to.matched.some(record=>record.meta.requiresAuth)){
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if(!auth.loggedIn()){
          next({
              path:'/login',
              query:{ redirct: to.fullPath }
          })
      } else{
          next()
      }
    } else{
        next() // 确保一定要调用 next()
    }
})
```



### 过渡动效

`<router-view>`是基本的动态组件,所以我们可以用`<transition>`组件给它添加一些过渡效果:

```html
<transition>
  <router-view></router-view>
</transition>
```

[`<transition>` 的所有功能](https://cn.vuejs.org/guide/transitions.html) 在这里同样适用。



#### 单个路由过渡

上面的用法会给所有路由设置一样的过渡效果,如果想让每个路由组件有各自的过渡效果,可以在各路由组件内使用`<transition>`并设置不同的 name

```js
const Foo = {
    template:`
		<transition name="slide">
			<div class="foo">...</div>
		</transition>
	`
}

const Bar = {
    template:`
	<transition name="fade">
		<div class="bar">...</div>
	</transition>
	`
}
```



#### 基于路由的动态过渡

基于当前路由与目标路由的变化关系,动态设置过渡效果:

```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```

```js
// 在父组件内
// 利用watch 监控 $route的变化 来决定使用哪种过渡
watch:{
    '$route'(to,from){
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth<fromDepth?'slide-right':'slide-left'
	}
}
```



### 数据获取

有时候,进入某个路由后,需要从服务器获取数据.例如,在渲染用户信息时,需要从服务器获取用户的数据.我们可以通过两种方式来实现:

- **导航完成之后获取:** 先完成导航(路由切换),然后在接下来的组件声明周期钩子中获取数据.在数据获取期间显示『加载中』之类的指示。
- **导航完成之前获取**:导航完成前,在路由进入的守卫中获取数据,在数据获取成功后执行导航.

> 导航完成之后获取:先进入画面==>loading==>数据展示
>
> 导航完成之前获取:loading==>展示数据

ps:如果网速够快的话,个人觉得第二种体验更好,但是网速慢的时候,先进入画面再loading,可能会留住更多的用户,不会让白屏等待时间过长?



#### 导航完成后获取数据

当使用这种方式时,会马上导航和渲染组件,然后再组件的`created`钩子中获取数据,这让我们有机会在数据获取期间展示一个loading状态,还可以在不同视图间展示不同的loading状态.



```html
<template>
  <div class="post">
    <div class="laoding" v-if="loading">
      Loading...
    </div>
    
    <div v-if="error" class="error">
      {{error}}
    </div>
    
    <div v-if="post" class="content">
      <h2>
        {{post.title}}
      </h2>
      <p>
        {{post.body}}
      </p>
    </div>
  </div>
</template>
```

```js
export default {
    data(){
        return {
            loading:false,
          	post:null,
          	error:null
        }
    },
  	created(){
        //组件创建完后获取数据,
      	// 此时data已经被 observed 了 (已经被追踪了)
      	this.fetchData()
    },
  	watch:{
        //如果路由有变化,会再次执行该方法
      	'$route':'fetchData'
    },
  	methods:{
        fetchData(){
            this.error = this.post = null
          	this.loading = true
          // replace getPost with your data fetching util / API wrapper
		 getPost(this.$route.params.id,(err,post)==>{
              this.loading=false
              if(err){
                   this.error = err.toString()
                 }else{
                   this.post = post
                 }
           })
        }
    }
}
```



#### 在导航完成前获取数据

我们在导航转入新的路由前获取数据.我们可以在接下来组件的`beforeRouteEnter`守卫中获取数据,当数据获取成功后只调用`next`方法.

```js
export default {
    data(){
        return{
            post:null,
          	error:null
        }
    },
  	//组件第一次调用?组件未被渲染? 组件未被实例!
  	beforeRouteEnter(to,from,next){
      //通过next(vm=>)传递this
      getPost(to.params.id, (err, post) => {
        next(vm => vm.setData(err, post))
      })
    },
  	// 路由改变前,组件已经渲染完了(组件复用)
  	// 逻辑稍稍不同
  	beforeRouteUpdate (to,from,next){
        this.post=null
        getPost(to.params.id, (err, post) => {
        this.setData(err, post)
        next()
    	})
    },
  	methods:{
        setData(err,post){
            if(err){
                this.error = err.toString()
            } else{
                this.post = post
            }
        }
    }
}
```

因为要渲染后才会展示页面,所以用户会停留在当前页面,所以最好显示一些进度条或者别的指示,如果数据获取失败,有必要展示一些全局错误提醒



### 滚动行为

使用前端路由,当切换到新路由时,想要页面滚动到顶部,或者是保持原先的滚动位置,就像重新加载页面那样.`vue-router`能做到.

**注意: 这个功能只在 HTML5 history 模式下可用。**

创建一个Router实例,可以提供一个`scrollBehavior`方法:

```js
const router = new VueRouter({
    routes:[...],
    scrollBehavior(to,from,savedPosition){
           //return 期望滚动到哪个位置
            }
})
```

`scrollBehavior`方法接收`to`和`from`路由对象,第三个参数`savedPosition`当且仅当`popstate`导航(通过浏览器的 前进/后退 按钮触发)时,才可用



这个方法返回(return)滚动位置的对象信息:

- `{x:number,y:number}`
- `{ selector : string,offset?:{x:number,y:number}}`(offset just in 2.6.0+ support)

如果返回一个`falsy`(假值,不是 `false`，[参考这里](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy))的值,或者是一个空对象,那么不会发生滚动



```js
scrollBehavior (to,from,savedPosition){
    return{x:0,y:0}
}
```

对于所有路由导航,简单地让页面滚动到顶部.

返回`savedPosition`,在按下 后退/前进 按钮时,就会像浏览器的原生表现那样:

```js
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```

如果要模拟『滚动到锚点』的行为：

```js
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}
```

我们还可以利用[路由元信息](https://router.vuejs.org/zh-cn/advanced/meta.html)更细颗粒度地控制滚动。查看完整例子请[移步这里](https://github.com/vuejs/vue-router/blob/next/examples/scroll-behavior/app.js)。



### 路由懒加载

当打包构建应用时,(所有东西都放在一个bundle里面的话),JavaScript包会变得非常大,影响页面加载.如果我们能把不同路由对应的组件分割成不同的代码块,然后当路由被访问的时候才加载对应组件,这就很高效了.

结合 Vue 的[异步组件](https://cn.vuejs.org/guide/components.html#异步组件)和 Webpack 的[代码分割功能](https://doc.webpack-china.org/guides/code-splitting-async/#require-ensure-/)，轻松实现路由组件的懒加载。

首先,将一部组件定义为一个返回Promise的工厂函数(该函数返回的Promise应该resolve组件本身) :information_desk_person: 就是要把组件本身放在resolve中?

```js
const Foo = () => Promise.resolve({/* 组件定义对象 */});
```



第二,在Webpack 2中,可以使用[动态 import](https://github.com/tc39/proposal-dynamic-import)语法来定义代码分块点 (split point)：

```js
import('./Foo.vue')//返回的是Promise对象
```



> 注意：如果您使用的是 Babel，你将需要添加 [`syntax-dynamic-import`](https://babeljs.io/docs/plugins/syntax-dynamic-import/) 插件，才能使 Babel 可以正确地解析语法。



第三,结合第一步第二步,定义一个能够被Webpack自动代码分割的异步组件.

```js
const Foo = () => import('./Foo.vue');
```



在路由配置中,什么都不需要改变:

```js
const router = new VueRouter({
    routes:[
        { path:'/foo', component:Foo }
    ]
})
```



按照自己的理解,就是路由切换==>Promis对象触发resolve==>组件加载==>组件渲染?



#### 把组件按组分块

想要把某个路由下的所有组件(或者某些组件)打包在同一个异步块(chunk)中.只需要使用**命名chunk**,一个特殊的注释语法来提供chunk name(需要Webpack>2.4).

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。(打包在同一个chunk中)