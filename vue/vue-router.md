# Vue-router笔记

:arrow_right_hook:[官方文档](https://router.vuejs.org/zh-cn/essentials/getting-started.html)



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