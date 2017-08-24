# vue 笔记

### vue基础入门

#### 基本用法

- 绑定dom

```html
<div id="app">
        {{message}}
    </div>
```
```javascript
    var app = new Vue({
        el: "#app",
        data: { message: 'hello world!' }
    });
```

- bind

```html
  <div id="app2">
        <span v-bind:title="message">
        鼠标悬停几秒钟查看此处动态绑定的提示信息！
        </span>
    </div>
```
```javascript
 var app2 = new Vue({
        el: "#app2",
        data: { message: '页面加载于' + new Date() }
    });
```

- 条件判断

```html
    <div id ="app3">
        <p v-if="seen">现在你看到我了</p>
    </div>
```
```javascript
    var app3 =new Vue({
        el:"#app3",
        data:{seen:false}
    });
```

- 循环

```html
    <div id="app4">
        <ol>
            <li v-for="todo in todos">
                {{todo.text}}
            </li>
        </ol>
    </div>
```

```javascript
    var app4 = new Vue({
        el:"#app4",
        data:{
            todos:[
            {text:"vue1"},
            {text:"vue2"},
            {text:"vue3"},
        ]}
    });
```

- 绑定事件

```html
    <div id="app5">
        <p>{{message}}</p>
        <button v-on:click="click">点击事件</button>
    </div>
```

```javascript
    var app5 = new Vue({
        el:"#app5",
        data:{message:"还没点击"},
        methods:{
            click:function(){
                this.message="点击了";
            }
        }
    });
```

- 表单输入和应用状态间的双向绑定

```html
    <div id="app6">
        <p>{{message}}</p>
        <input v-model="message">
    </div>
```

```javascript
    var app6 = new Vue({
        el:"#app6",
        data:{message:"还没输入数据"}
    })
```

##### 组件化应用构建

- 在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例，在 Vue 中注册组件很简单：

```javascript
// 定义名为 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})
```

- 现在你可以用它构建另一个组件模板：

```html
<ol>
  <!-- 创建一个 todo-item 组件的实例 -->
  <todo-item></todo-item>
</ol>
```

- 但是这样会为每个待办项渲染同样的文本，这看起来并不炫酷，我们应该能将数据从父作用域传到子组件。让我们来修改一下组件的定义，使之能够接受一个属性：

```javascript
Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义属性
  // 这个属性名为 todo。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```
- 现在，我们可以使用*v-bind*指令将待办项传到每一个重复的组件中：

```html
<div id="app-7">
  <ol>
    <!-- 现在我们为每个todo-item提供待办项对象    -->
    <!-- 待办项对象是变量，即其内容可以是动态的 -->
    <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
  </ol>
</div>
```

```javascript
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { text: '蔬菜' },
      { text: '奶酪' },
      { text: '随便其他什么人吃的东西' }
    ]
  }
})
```

- 这只是一个假设的例子，但是我们已经设法将应用分割成了两个更小的单元，子单元通过 props 接口实现了与父单元很好的解耦。我们现在可以进一步为我们的 todo-item 组件实现更复杂的模板和逻辑的改进，而不会影响到父单元。

*************************************************************


#### vue实例 

##### 构造器

- 每个 Vue.js 应用都是通过构造函数 Vue 创建一个 Vue 的根实例 启动的：

```javascript 
var vm = new Vue({
  // 选项
})
```

- 在实例化 Vue 时，需要传入一个*选项对象*，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。
    + 可以扩展 Vue 构造器，从而用预定义选项创建可复用的组件构造器：

```javascript
var MyComponent = Vue.extend({
  // 扩展选项
})
// 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```

##### 属性和方法

- 每个 Vue 实例都会*代理*其 data 对象里所有的属性：

- 这里的属性是data对象里面的属性

```javascript
var data = { a: 1 }
var vm = new Vue({
  data: data
})
vm.a === data.a // -> true
// 设置属性也会影响到原始数据
vm.a = 2
data.a // -> 2
// ... 反之亦然
data.a = 3
vm.a // -> 3
```

- 注意只有这些被代理的属性是*响应*的。如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。我们将在后面详细讨论响应系统。

- 除了 data 属性， Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与代理的 data 属性区分。

- 这里的属性是实例化 vm里面的对象属性（需要区分开来）

```javascript
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true
// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
})
```

- 实例声明周期
    + vue.js并没有控制器概念，只有一些生命周期的钩子如：*created*,*mounted*,*updated*,*destroyed*
    + 钩子的*this*指向了vue的实例，
    + 组件的自定义逻辑可以分布在这些钩子中

- 生命周期图示

<img src="http://cn.vuejs.org/images/lifecycle.png" />

*************************************************************


### 模板语法

##### 插值

- 文本
    + 数据绑定最常见的形式就是使用 “Mustache” 语法（双大括号）的文本插值：{{message}}
    + 也可以使用v-once指令,一次性插值(当数据改变时,插值处内容不会改变)
    ```html
    <span v-once>This will never change: {{ msg }}</span>
    ```

- 纯HTML
    + 双大括号会将数据解释为纯文本，而非 HTML 。为了输出真正的 HTML ，你需要使用 v-html 指令：
    + 被插入的内容都会被当做 HTML —— 数据绑定会被忽略
    ```javascript
    <div v-html="rawHtml"></div>
    ```

- 属性 
    + 将id绑定到html属性上，应使用 v-bind 指令：
    ```html
    <div v-bind:id="dynamicId"></div>
    ```
    + 这对布尔值的属性也有效 —— 如果条件被求值为 false 的话该属性会被移除，当为true时,btn则不能按：
    ```html
    <button v-bind:disabled="someDynamicCondition">Button</button>
    ```
    ```javascript
            data:{
            someDynamicCondition:true
            }
    ```

- 使用javascript表达式
    + 这些代码会在Vue实例的数据作用域下作为js被解析,但是每个只能包含单个表达式
```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>
<!-- 不会生效的代码 -->
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}
<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```


#### 指令

- 指令（Directives）是带有*v-*前缀的特殊属性。指令属性的值预期是单一 JavaScript 表达式

- 例如前面所说的v-if=“seen” ,根据seen的真假，来移除/插入元素


##### 参数 

- 一些指令能接受一个“参数”，在指令后以冒号指明。例如， v-bind 指令被用来响应地更新 HTML 属性：
```html
<a v-bind:href="url"></a>
```

- href是参数，告诉bind，要将这个元素的href值与表达式url绑定在一起

- v-on用于监听,click是监听的事件名，

```html
<a v-on:click="doSomething">
```

##### 修饰符

- 修饰符（Modifiers）是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：

```html
<form v-on:submit.prevent="onSubmit"></form>
```


#### 过滤器 （filters）

- Vue.js 允许你自定义过滤器，可被用作一些常见的文本格式化。过滤器可以用在两个地方：mustache 插值和v-bind 表达式。

- 简单用法 (首字母大写)
```html
    <div class="test">
        {{message | capitalize }}
    </div>
```

- 在filters里定义captialize方法
```javascript
 var vm = new Vue({
     el:".test",
     data:{message:"abc"},
     filters:{
         capitalize:function(value){
             if(!value) return '';//判断参数是否为空
             value = value.toString();//将参数转换为字符串
             return value.charAt(0).toUpperCase() + value.slice(1);//返回第一个大写，加上第二个到最后的字符串
         }
     }
 });

```

- 过滤器可以串联：（多个过滤器）

```html
{{ message | filterA | filterB }}
```

- 过滤器是 JavaScript 函数，因此可以接受参数：

```javascript
{{ message | filterA('arg1', arg2) }}
```

- 'arg1',arg2为第二个第三个参数，因为message作为第一个参数传递给过滤器

- 过滤器好处
    + 并不需要修改message,通过过滤器将数据按照自己的想法呈现



#### 缩写

- v-bind缩写
```html
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```

- v-on缩写
```html
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```

*************************************************************

### 计算属性（computed）

##### 基础例子
```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: { // 实时计算 使用
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
```

- Vue中computed就是 实时计算 使用。

- Vue检测到数据发生变动时就会执行对相应数据有引用的函数。

- 这里我们声明了一个计算属性 reversedMessage 。我们提供的函数将用作属性 vm.reversedMessage 的 getter 。

- getter 是一种获得属性值的方法，setter是一种设置属性值的方法。

- 就是函数reversedMessage是vm.reversedMessage获得属性值的一种方法

```javascript
console.log(vm.reversedMessage) // -> 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // -> 'eybdooG'
```

- 通过浏览器js控制台修改vm.message 也会导致vm.reversedMessage变动

- 因为vm.reversedMessage 依赖于vm.message

- 计算属性的 getter 是没有副作用，这使得它易于测试和推理。

##### 计算缓存vsMethods

- 上方例子 Methods（方法）
```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

```javascript
// in component
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

- 对于最终结果，Methods与上方计算属性（computed）,两种方式确实相同

- 但是*计算属性是基于它们的依赖进行缓存的*,只有它的依赖项(message)发生了变化，他才会重新求值，如果依赖项(message)没有发生变化，那么多次调用计算属性当中的（reversedMessage),都是立即返回结果，而不用重新调用函数

- 只要发生*重新渲染*，method 调用总会执行该函数。

- 为什么需要缓存？假设我们有一个性能开销比较大的的计算属性 A ，它需要遍历一个极大的数组和做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！

- 如果不想有缓存，则可以使用methods

##### Computed vs Watched

- vue当中提供了watched属性,用于监控数据,当一些数据数据随着其他数据变动而变动时

- 没错,computed也可以

```html
<div id="demo">{{ fullName }}</div>
```

- watched方法

```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

- computed方法

```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

##### 计算属性的setter

- 计算属性默认只有getter,不过也可以自定义setter

```javascript
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

- 现在在运行 vm.fullName = 'John Doe' 时， setter 会被调用， vm.firstName 和 vm.lastName 也相应地会被更新。
**************************************************

#### 总结

- 计算属性（computed）,根据依赖项进行缓存,当依赖项发生改变时,函数才会被调用;依赖项没发生改变时,直接返回结果

- 方法（methods）,与计算属性一样,但是,发生重新渲染时,method 调用*总会*执行函数。但是没有缓存.

- watched,一些数据需要随着其它数据变动而变动时,可以使用，但是不要滥用，可以使用计算属性代替

- 计算属性可以写setter


*************************************************************

### 观察 Watchers

-  Vue 提供一个更通用的方法通过 watch 选项，来响应数据的变化

- 在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的

```html
 <div id="abc">
    <input v-model="question" />
    <p>{{answer}}</p>
</div>
```

```javascript
    var vm = new Vue({
        el:"#abc",
        data:{
            question:"",
            answer:"请输入数据"
        },
        watch:{
            // 如果 question 发生改变，这个函数就会运行
            // 键值对，第一个为监控对象v-model
            question:function(newQuestion){
                this.answer="正在输入中";
                this.question1();
            }
        },
         methods:{
             //运用了两个插件_.debounce
             //_.debounce 是一个通过 lodash 限制操作频率的函数。
             //请求会在用户输入完之后才会发送，
            question1:_.debounce(
                    function () {
                        this.answer = "你输入的问题是"+this.question;
      },
      // 这是我们为用户停止输入等待的毫秒数
      500
    ) 
    }
    });
```

- watch一直在监控着input框，当输入框发生变化时，字为正在输入中，当输入完成之后，answer发生变化

- 使用 watch 选项允许我们执行异步操作，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这是计算属性无法做到的。

-除了 watch 选项之外，还可以使用 vm.$watch API 命令。

*************************************************************

## Class与Style绑定

#### 绑定HTML Class

##### 对象语法

- 运用v-bind:class="{键：值}",根据值的真假,来添/删 键的类 
```html
    <div class="a" v-bind:class="{b:isTrue,c:isFlase}" id="abc"></div>
```

```javascript
    var vm = new Vue({
        el:"#abc",
        data:{
            isTrue:true,
            isFalse:false
        },
    });
```

- 渲染效果 
```html
<div id="abc" class="a b"></div>
```

- b,c两个类，根据isTrue，isFalse来相应更新

- 也可以在v-bind:class="对象",绑定一个对象

```html
    <div class="a" v-bind:class="classObject" id="abc"></div>
```

```javascript
    var vm = new Vue({
        el:"#abc",
        data:{
            classObject:{
                b:true,
                c:false,
                d:true
            }
        },
    });
```

- 还可以在v-bind:class="计算属性"，绑定计算属性

```html
    <div class="a" v-bind:class="classObject" id="abc"></div>
```

```javascript
    var vm = new Vue({
        el:"#abc",
        data:{
            isTrue:true,
            isFalse:false
            },
        computed:{
        classObject:function(){
            return{
                b:isTrue,b:isFalse
            };
        }
        }
        },
    });
```

##### 数组语法
```html
<div id="test" v-bind:"[class1,class2]"></div>
```

```javascript
var vm = new Vue({
    el:"#test",
    data:{
        class1:'a',
        class2:'b'
    },
});
```

- 可以在数组中加入三元运算符进行判断

```html
<div id="test" v-bind:"[isTrue?class1:" ",class2]"></div>
```

- 也可以在数组中使用对象语法

```html
<div v-bind:class="[{class1:isTrue},class2]"></div>
```

##### 用在组件上

- 首先声明一个组件

```javascript
Vue.component('test', {
  template: '<p class="class1 class2">Hi</p>'
})
```

- 然后在使用它的时候添加一些class名

```html
<my-component class="class3 class4"></my-component>
```

- 最终会渲染成为

```html
<p class="class1 class2 class3 class4">Hi</p>
```

- 在组件上用到class属性的时候，这些类会添加到根元素上面,这个元素上已存在的类不会被覆盖

- v-bind:class同理

```html
<my-component v-bind:class="{ class3: isTrue }"></my-component>
```

```html
<p class="class1 class2 class3">Hi</p>
```
**************************************************

#### 绑定内联样式

##### 对象语法 

- v-bind:style 的对象语法，看起来很像css,但其实是js对象

- css属性名可以用驼峰法和短横分割命名

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```javascript
data: {
  activeColor: 'red',
  fontSize: 30
}
```

- 最好是直接绑定到一个样式对象，这样更直接清晰

```html
<div v-bind:style="styleObject"></div>
```

```javscript
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

##### 数组语法

- v-bind:style 数组语法可以将多个对象应用到一个元素上面

```html
<div v-bind:style="[styleObject1,styleObject2]"></div>
```

##### 自动添加前缀

- 当 v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue.js 会自动侦测并添加相应的前缀。

*************************************************************************************************
## 条件渲染

#### v-if

- Handlebars 模板
```html
<!-- Handlebars 模板 -->
{{#if ok}}
  <h1>Yes</h1>
{{/if}}
```

- 在vue.js中 我们可以使用v-if实现同样的功能,还可以用v-else

```html
<h1 v-if"ok">YES</h1>
<h1 v-else>No</h1>
```

##### template中v-if条件组

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

##### v-else

```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```
- v-else必须跟在v-if或者v-else-if元素后面，否则将识别不了

##### v-else-if

- 2.1.0新增

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

- 也必须跟在v-if或者v-else-if元素后面


##### 用*key*管理可复用的元素

- vue尽可能高校渲染元素,通常会*复用*已有的元素

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

- 在上面代码中切换中，vue将不会清除用户已经输入的内容。因为两个模版使用了相同的元素，<input> 不会被替换掉——仅仅是替换了它的的 placeholder。

- 但是,有时候并不需要复用,这个时候就要加一个具有唯一值的*key属性*即可

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

##### v-show vs v-if

- v-if进行条件判断,如果不满足条件则不会出现在dom中,

- 而V-show是是否显示,会始终被渲染并保存在dom中，v-show只是简单的切换display

- 注意， v-show 不支持template语法，也不支持 v-else。

- v-if 是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
    + v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
    + 相比之下， v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
    + 一般来说， v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件不太可能改变，则使用 v-if 较好。


###### v-if 与v-for一起使用
- 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。


**************************************************************************************

## 列表渲染

#### v-for
- 利用v-for指令根据一组数组的选项列表进行渲染。item in items ,items 是源数据数组并且 item 是数组元素迭代的别名。

##### 基本用法

```html
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```

```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      {message: 'Foo' },
      {message: 'Bar' }
    ]
  }
})
```

- 在v-for中，拥有对父作用域的完全访问权限,v-for还支持一个可选的第二个参数为当前的索引

```html
  <div id="example-2">
        <div v-for="(item,idx) in message">
           {{abcde}}-{{idx+1}}-{{item.number}}
        </div>
    </div>
```

```javascript
var vm = new Vue({
        el:"#example-2",
        data:{
            time:"1",
            message:[
                {number:"6666"},
                {number:"6666"},
                {number:"6666"},
                {number:"6666"},
                {number:"6666"},
                {number:"6666"},
                {number:"6666"},
            ]
        },
        computed:{
            abcde:function(){
                var myDate = new Date();
                var b = myDate.getFullYear()+"-";
                b += myDate.getMonth()+1;
                b += "-"+myDate.getDate();
                this.time=b;
                return b;
            }
        }
    });
```

- 也可以用for代替in
```html
<div v-for="item of items"></div>
```

##### Template v-for

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
```

##### 对象迭代v-for
```html
<ul id="repeat-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```

```javascript
new Vue({
  el: '#repeat-object',
  data: {
    object: {
      FirstName: 'John',
      LastName: 'Doe',
      Age: 30
    }
  }
})
```

- 如果想要访问具体的对象可以,{{object.对象名}}

- 可以放两个参数，第二个为key值
```html
<ul id="repeat-object" class="demo">
  <li v-for="(value,key) in object">
    {{ value }}-{{key}}
  </li>
</ul>
```

- 可以加入第三个参数，第三个为index值

```html
<ul id="repeat-object" class="demo">
  <li v-for="(value,key,index) in object">
    {{ value }}-{{key}}-{{index}}
  </li>
</ul>
```

##### 整数迭代v-for

- v-for 也可以取整数。在这种情况下，它将重复多次模板。

```html
    <div>
        <span v-for="n in 10">{{ n }}</span>
    </div>
```


##### 组件和v-for

- 在组件中，可以像之前一样使用v-for
```html
<my-component v-for="item in items"></my-component>
```

- 不过为了使组件可重用，组件焗油自己独立的作用域，所以这样并*不能自动传递数据*到组件中，为了传递数据到组件中，我们要用*props*

```html
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index">
</my-component>
```

- 简单的todo-list案例

```html
    <!-- todo list -->
    <div id="todo-list">
        <!--绑定数据v-model 绑定按下回车键时间v-on:keyup.enter -->
        <input v-model="addTodoText" v-on:keyup.enter="addNewTodo" placeholder="add a new todo"/>
        <ul>
            <!--模板是todo-item 然后循环数据,v-bind:title 将title绑定给todo,绑定remove事件-->
            <li is="todo-item" v-for="(todo,index) in todos" v-bind:title="todo" v-on:remove="todos.splice(index,1)"></li>
        </ul>
    </div>
```

```javascript
Vue.component('todo-item',{
    template:'<li>{{title}}<button v-on:click="$emit(\'remove\')">x</button></li>'
    ,props:['title']
})
new Vue({
    el:"#todo-list",
    data:{
        addTodoText:"",
        todos:['1','2','3'],
    },
    methods:{
        addNewTodo:function(){
            this.todos.push(this.addTodoText);
            this.addTodoText='';
        }
    }

})
```

##### key

- 用 v-for 正在更新已渲染过的元素列表时，它默认用 “就地复用” 策略。如果数据项的顺序被改变，Vue将不是移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素

- 这个默认的模式是有效的，但是只适用于不依赖子组件状态或临时 DOM 状态（例如：表单输入值）的列表渲染输出。

- 为了让vue一个提示，便于它能跟踪每个节点的身份，从而重用和重新排序现有元素，需要为每一项提供一个key值 ,理想的key值是每一项都有一个id

- 但它的工作方式更类似于一个属性，所以需要运用到v-bind来绑定动态值(在这里使用简写)
```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

- 尽可能使用v-for提供key值,除非dom足够简单,或者依赖于默认的复用行为来获得性能提升

#### 数组更新检测

##### 变异方法

- Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。
    + push()
    + pop()
    + shift()
    + unshift()
    + splice()
    + sort()
    + reverse()

- 变异方法,顾名思义,会改变被这些方法调用的原始数组

##### 重塑数组

- 重塑数组是非编译的方法,不会改变原始数组,但是会返回一个新数组,当使用非编变异方法时,可以用新数组代替旧数组
    + filter();
    + concat();
    + slice();
```javascript
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

##### 注意事项

- 由于js的限制,vue不能监测一下变动的数组:
    + 1.利用索引直接设置一个项时,例如:vm.items[indexOfItem]=newValue;
    + 2.当你修改数组的长度时,例如:vm.items.length = newLength

- 对于第一类问题,可以有两种方式来实现索引直接设置一个项,同时也触发状态更新:
    + Vue.set
    ```javascript
        Vue.set(example1.items,indexOfItem,newValue)
    ```
    + 第一个为数组名,第二个为索引值,第三个为新值
    + Array.prototype.splice
    ```javascript
        example1.items.splice(indexOfItem,1,newValue);
    ```
    + 在example1.items的第indexOfItem个,删除1个元素,然后再添加newValue进去

- 为了解决第二类问题，同样可以使用 splice：
    + example1.items.splice(newLength);


#### 显示过滤/排序结果

- 有时候,我们想要显示 过滤过或者排序过的结果,但是又不想改变原始数组,这个时候,可以创建返回过滤或排序数组的计算属性。
```html
<li v-for="n in evenNumbers">{{ n }}</li>
```
```javascript
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

- 你也可以在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 使用 method 方法：
```html
<li v-for="n in even(numbers)">{{ n }}</li>
```

```javascirpt
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

***********************************************************

## 事件处理器

#### 监听事件
- 利用 v-on 指令监听 DOM 事件来触发一些 JavaScript 代码。
- 只能监听 原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。
```html
<div id="example-1">
  <button v-on:click="counter += 1">增加 1</button>
  <p>这个按钮被点击了 {{ counter }} 次。</p>
</div>
```

```javascript
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```

#### 方法事件处理器

- 许多事件业务逻辑处理非常复杂,所以直接把js写在v-on指令里面是不可行的,所以可以让v-on接收一个定义的方法来掉用
```html
<div class="example-1">
<button v-on:click="click">click</button>
</div>
```
```javascript
var vm =new Vue({
    el:".example-1",
    data:{
        counter:0,
    },
    methods:{
        click:function(){
            this.counter++;
            alert("点击了"+this.counter+"次");
        }
    }
});
```

#### 内联处理器方法

- 除了直接绑定方法,还可以传参,可以用内联的js语句
```html
<div class="example1">
    <button @click="say('hi')">hi</button>
    <button @click="say('hello')">hello</button>
</div>
```
```javascript
var vm = new Vue({
    el:".example1",
    methods:{
        say:function(message){
            alert(message);
        }
    }
});
```

- 有时也需要在内联语句访问原生的dom事件,可以用特殊变量*$event*把它传入方法:
```html
    <div class="example2">
        <a href="http://www.baidu.com" @click="say('hi',$event)">click</a>
    </div>
```
```javascript
new Vue({
        el: ".example2",
        methods: {
            say: function (message, event) {
                if (event) event.preventDefault()
                alert(message)
            }
        }
    });
```

- event.preventDefault(); 阻止默认事件,例如在a链接中有地址跳转,用了event.preventDefault();就会阻止跳转 


#### 事件修饰符

- 在事件处理程序中调用阻止默认事event.preventDefault()和阻止冒泡事件event.stopPropagation()是非常常见的需求,尽管我们可以在methods中实现,但是我们尽量让methods只有纯粹的数据逻辑,而不是去处理dom事件细节.

- 所以,在v-on中提供了很多的事件修饰符,通过点(.)表示指令后缀来调用修饰符
    + .stop
    + .prevent
    + .capture
    + .self
    + .once
```html
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
```

- 2.1.4新增
```html
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

- .once 修饰符还能被用到自定义的组件事件上


#### 按键修饰符

- 可以通过v-on:keyup来监控键盘键值
```html
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```

- 记住所有的keyCode比较困难,所以Vue为常用的按键提供了别名
    + .enter
    + .tab 
    + .delete (捕获 “删除” 和 “退格” 键)
    + .esc
    + .space
    + .up
    + .down
    + .left
    + .right
```html
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
```

- 还可以通过全局config.keyCodes对象自定义按键修饰符别名
```javascript
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112
```

- 2.1.0新增
    + .ctrl
    + .alt
    + .shift
    + .meta

- 注意：在Mac系统键盘上，meta对应命令键 (⌘)。在Windows系统键盘meta对应windows徽标键(⊞)。在Sun操作系统键盘上，meta对应实心宝石键 (◆)。在其他特定键盘上，尤其在MIT和Lisp键盘及其后续，比如Knight键盘，space-cadet键盘，meta被标记为“META”。在Symbolics键盘上，meta被标记为“META” 或者 “Meta”。例如:

```html
<!-- Alt + C -->
<input @keyup.alt.67="clear">
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

#### 在html中监听事件好处
- 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
- 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
- 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。

**************************************************************************************************

## 表单控制绑定

#### 基础用法

- 利用v-model在表单控件元素上创建双向数据绑定,会根据控件类型自动选取正确的方式来更新元素

- v-model本质上是语法糖,它负责监听用户的输入事件以更新数据,并处理一些极端的例子
    + v-model 并不关心表单控件初始化所生成的值。因为它会选择 Vue 实例数据来作为具体的值。
    + 对于要求 IME （如中文、 日语、 韩语等） 的语言，你会发现那v-model不会在 ime 构成中得到更新。如果你也想实现更新，请使用 input事件。

##### 文本
```html
        <!--文本-->
<div class="example">
    <input v-model="message" placeholder="请输入信息" />
    <p>信息是:{{message}}</p>
</div>
```
##### 多行文本
```html
<!--多行文本-->
<div class="example1">
    <p style="white-space: pre">{{message}}</p>
    <textarea v-model="message"></textarea>
</div>
```
```javascript
    new Vue({
    el: ".example1",
    data: {
        message: 0,
    }
});
```
- 在文本区域插值( <textarea></textarea> ) 并不会生效，应用 v-model 来代替

##### 复选框

- 单个勾选框
```html
<!--单个勾选框-->
<div class="example2">
    <input type="checkbox" id="checkbox" v-model="message" />
    <label for="checkbox">{{message}}</label>
</div>
```
```javascript
new Vue({
        el:".example2",
        data:{
            message:false,
        }
    });
```

- 多个勾选框 可以将数据放在数组里
```html
<div class="example3">
        <input type="checkbox" id="john" value="john" v-model="message" />
        <label for="john">john</label>
        <input type="checkbox" id="jack" value="jack" v-model="message" />
        <label for="jack">jack</label>
        <input type="checkbox" id="mike" value="mike" v-model="message" />
        <label for="mike">mike</label>
        <br />
        <span>your choice :{{message}}</span>
        <br>
    </div>
```
```javascript
new Vue({
        el:".example3",
        data:{
            message:[],
        }
    });
```

##### 单选按钮
```html
<div id="example-4" class="demo">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>
```
```javascript
new Vue({
  el: '#example-4',
  data: {
    picked: ''
  }
})
```

##### 选择列表
- 单选列表
```html
<div id="example-5" class="demo">
  <select v-model="selected">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```
```javascript
new Vue({
  el: '#example-5',
  data: {
    selected: null
  }
})
```

- 多选列表(绑定到一个数组里) multiple是多选的属性
```html
<div id="example-6" class="demo">
  <select v-model="selected" multiple style="width: 50px">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
```
```javascript
new Vue({
  el: '#example-6',
  data: {
    selected: []
  }
})
```
- 利用v-for渲染动态选项
```html
<div id="example-7">
        <select v-model="message">
            <option v-for="option in options" v-bind:value="option.value">
                {{option.message}}
            </option>
        </select>
        <p>{{message}}</p>
    </div>
```
```javascript
new Vue({
    el:"#example-7",
    data:{
        message:"one",
        // select的v-model绑定值和option的value互相绑定
        options:[
            {message:"1",value:"one"},
            {message:"2",value:"two"},
            {message:"3",value:"three"},
            {message:"4",value:"four"},
        ]
    }
})
```

#### 绑定value
- 对于单选按钮，勾选框及选择列表选项， v-model 绑定的 value 通常是静态字符串（对于勾选框是逻辑值）：
```html
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">
<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">
<!-- 当选中时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

- 我们可以通过v-bind来属性来将value绑定到 Vue实例上的动态属性

##### 复选框
```html
    <div id="example1">
        <h4>复选框</h4>
        <input type="checkbox" v-model="toggle" v-bind:true-value="a" v-bind:false-value="b">
        <p>{{toggle}}</p>
    </div>
```
```javascript
var vm=new Vue({
        el:"#example1",
        data:{
            toggle:"1",
            a:"2",
            b:"3"
        }
    });
// 当选中时
vm.toggle === vm.a
// 当没有选中时
vm.toggle === vm.b
```

##### 单选按钮
```html
<div id="example2">
    <input type="radio" v-model="pick" v-bind:value="a">
    <input type="radio" v-model="pick" v-bind:value="b">
    <p>{{pick}}</p>
</div>
```
```javascript
var vm=new Vue({
        el:"#example2",
        data:{
            pick:"1",
            a:"2",
            b:"3"
        }
    });
```

##### 选择列表设置
```html
<div id="example3">
    <select v-model="selected">
        <!-- 内联对象字面量 -->
        <option v-bind:value="{ number: 123 }">123</option>
    </select>
    <p>{{selected}}</p>
</div>
```
```javascript
var vm = new Vue({
        el: "#example3",
        data: {
            selected: "1",
            a: "2",
            b: "3"
        }
    });
// 当选中时
typeof vm.selected // -> 'object'
vm.selected.number // -> 123
```
- 当选中的时候vm.selected变为一个对象
- 存放着{"number":123}

#### 修饰符

- .lazy,不加lazy时是同步更新,加了之后,是修改完,失去焦点后,才会更新
```html
<div id="example1">
    <input v-model.lazy="msg" />
    <p>{{msg}}</p>
</div>
```

- .number 可以处理输入值转为Number类型
```html
<input v-model.number="age" type="number">
```
- 这通常很有用，因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型。

- .trim 自动过滤用户输入的首尾空格
```html
<input v-model.trim="msg">
```

***********************************************************
## 组件

- 组件(Component)是Vue.js最强大的功能之一,组件可以扩展HTML元素,封装可重用的代码;
- 在较高层面上,组件是自定义元素,vue.js为它添加特殊的功能.
- 在某些情况下,组件也可以是原生html元素的形式,以js特性扩展

#### 使用组件
##### 注册
- 注册全局组件可以使用*Vue.component(tagName, options)*
- 组件在注册之后,便可以在父实例的模块中以自定义元素`<tagName></tagName>`*来使用.
- 要确保在初始化根实例*之前*注册了组件
```html
<!--全局组件-->
<div id="example1">
    <my-first-component></my-first-component>
</div>
```
```javascript
    //先注册组件
Vue.component('my-first-component',{
    template:'<div>my first component</div>'
});
//创建根实例
new Vue({
    el:"#example1"
});
```
##### 局部注册
```html
<!--局部组件-->
<div id="example2">
    <my-2rd-component></my-2rd-component>
</div>
```
```javascript
//局部组件
var Child = {
    template: '<div>my 2rd component</div>'
}
new Vue({
    el:"#example2",
    components:{
        'my-2rd-component':Child
    }
})
```

##### Dom模板解析说明

- 当使用 DOM 作为模版时（例如，将 el 选项挂载到一个已存在的元素上）, 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素 `<ul>` ， `<ol>`， `<table>` ， `<select>` 限制了能被它包裹的元素， `<option>` 只能出现在其它元素内部。

- 在自定义组件中使用这些受限制的元素时会导致一些问题，例如：
```html
<table>
  <my-row>...</my-row>
</table>
```

- 在这个自定义组件中,`<my-row></my-row>`会被认为无效的,因此渲染的时候会导致错误,变通的方案是会用特殊的**is** 属性
```html
<table>
  <tr is="my-row"></tr>
</table>
```
- 应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用：
    + `<script type="text/x-template">`
    + JavaScript内联模版字符串
    + .vue 组件

- 因此，有必要的话请使用字符串模版。

##### data必须是函数

- 通过Vue构造器传入的各种选项大多数都可以在组件里用,**data**是一个例外,它必须是函数,实际上,如果你将data传入y为一个对象
```javascript
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: {
    message: 'hello'
  }
})
```
- 这样的话,Vue会停止,并在控制台发出警告,告诉你在组件中**data**必须是一个函数,理解这种规则的存在意义很有帮助

- 这样我们就可以在外部定义一个对象,通过*data*中的function将其return,就可以实现*data*传入一个变量了
```html
<!--data必须是函数 绕开方法-->
<div id="example3">
    <simple-counter></simple-counter>
    <simple-counter></simple-counter>
    <simple-counter></simple-counter>
</div>
```
```javascript
// data必须是函数 绕开方法
var data1 = { counter: 0 }
Vue.component('simple-counter', {
    template: '<button v-on:click="counter += 1">{{ counter }}</button>',
    // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
    // 但是我们返回给每个组件的实例的却引用了同一个data对象
    data: function () {
        return data1
    }
})
new Vue({
    el: "#example3"
});
```

- 但是这样以后,就会导致生成的元素都公用了外部定义的data1对象,所以我们可以retrun返回全新的对象给每一个button
```html
   <h4> data必须是函数 retrun全新对象</h4>
    <div id="example4">
        <simple-counter></simple-counter>
        <simple-counter></simple-counter>
        <simple-counter></simple-counter>
    </div>
```
```javascript
    // data必须是函数 return返回对象
    Vue.component('simple-counter', {
        template: '<button v-on:click="counter += 1">{{ counter }}</button>',
        data: function () {
            return {counter:0}
        }
    })
    new Vue({
        el: "#example4"
    });
```

##### 构成组件
- 在一个良好定义的接口中尽可能将父子组件解耦是很重要的。这保证了每个组件可以在相对隔离的环境中书写和理解，也大幅提高了组件的可维护性和可重用性。
- 在vue.js中,父组件通过props向下传递数据给子组件(props down),子组件通过events给父组件发送信息(events up)
<img  src="http://cn.vuejs.org/images/props-events.png" alt="props down, events up">

#### Prop
##### 使用Prop传递数据
- 组件实例的作用域是**孤立**的.这意味着不能在子组件中的模板直接引用父组件的数据,我们可以通过子组件的props选项获取
- 子组件要显式地用 props 选项声明它期待获得的数据：
```html
<div id="example1">
    <h4>使用Prop传递数据</h4>
    <son message="abcdefg"></son>
</div>
```
```javascript
new Vue({
    el:"#example1",
    components:{
        son:{
            props:['message'],
            template:'<span>{{message}}</span>'
        }
    }
});
```

##### 驼峰式(camelCased) vs 短横线隔开式(kebab-case)
```html
    <div id="example2">
        <h4>驼峰式(camelCased) vs 短横线隔开式(kebab-case)</h4>
        <son message-test="cccccccccc"></son>
    </div>
```
```javascript
new Vue({
    el: "#example2",
    components: {
        son: {
            props: ['messageTest'],
            template: '<span>{{messageTest}}</span>'

        }
    }
});
```
- 就是说,在js里面可以用驼峰式(camelCased),而html是不区分大小写的所以要用短横线隔开式(kebab-case)
- 当html中写:abc-abc,js中写abcAbc,那么还是可以将其相绑定的


##### 动态prop

- 在模板中，要动态地绑定父组件的数据到子模板的props，与绑定到任何普通的HTML特性相类似，就是用 v-bind。每当父组件的数据变化时，该变化也会传导给子组件：
```html
    <div id="example3">
        <h4>动态prop</h4>
        <!--父组件绑定数据-->
        <input v-model="msg" />
        <br />
        <!--将子组件的my-msg与父组件的msg绑定在一起-->
        <son :my-msg="msg"></son>
    </div>
```
```javascript
new Vue({
        el:"#example3",
        data:{
            //父组件数据
            msg:"没数据"
        },
        components:{
            son:{
                //子组件绑定数据
                props:['myMsg'],
                 template: '<span>{{myMsg}}</span>'
            }
        }
    });
```

##### 字面量语法 vs 动态语法
- 字面量方法传递的是字符串
```html
<!-- 传递了一个字符串"1" -->
<comp some-prop="1"></comp>
```

- 如果想要传number  就要用到v-bind
```html
<!-- 传递实际的mumber -->
<comp v-bind:some-prop="1"></comp>
```

##### 单向数据流

- prop是单向绑定的,父组件的属性变化时,将传到给子组件,但是不会反过来,这是为了防止子组件无意修改了父组件的状态
- 每次父组件更新的时候,子组件的所有prop都会更新为最新的值,这意味着我们**不应该**在子组件内部修改prop,
- 但是我们想修改prop中的数据
    + prop 作为初始值传入后，子组件想把它当作局部数据来用；
    + prop 作为初始值传入，由子组件处理成其它数据输出。

- 我们正确处理方式是
    + 1.定义一个局部变量，并用 prop 的值初始化它：(即用定义一个变量接收prop,然后再对这个变量进行想要的操作)
    ```javascript
    props: ['initialCounter'],
        data: function () {
            return { counter: this.initialCounter }
        }
    ```
    + 2.定义一个计算属性，处理 prop 的值并返回。(子组件处理完数据后再展示出来)
    ```javascript
        props: ['size'],
        computed: {
        normalizedSize: function () {
            return this.size.trim().toLowerCase()
        }
    }
    ```

- 注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。

##### Prop验证

- 可以为props指定数据验证规格,如果传入的数据不符合规格,Vue会发出警告.当组件给他人用的时候,这非常有用
- 要指定验证规格,需要用对象的形式,而不能用字符串数组
```javascript
Vue.component('example', {
  props: {
    // 基础类型检测 （`null` 意思是任何类型都可以）
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组／对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```

- type可以是下面的原生构造器
    + String
    + Number
    + Boolean
    + Function
    + Object
    + Array

- type也可以是一个自定义构造函数,使用instanceof检测
- 当 prop 验证失败，Vue会在抛出警告 (如果使用的是开发版本)。

#### 自定义事件

- 父组件可以props传递数据给子组件,子组件可以通过自定义事件把数据传递回去

##### 使用v-on绑定自定义事件

- ### 每个Vue实例都实现了事件接口(Events interface),即:
    + ### 使用 $on(eventName) 监听事件(只能侦听实例的事件,就是父组件的事件,子组件需要v-on来侦听)
    + ### 使用 $emit(eventName) 触发事件

- Vue的事件系统分离自浏览器的EventTarget API.尽管它们的运行类似,但是$on和$emit不是addEventListener和dispatchEvent的别名

- 父组件可以在使用子组件的地方直接使用v-on来监听子组件触发的事件

- 不能用$on侦听子组件抛出的事件,而必须在模板里直接用v-on绑定

- 例子:
```html
<div id="example">
    <p>{{total}}</p>
    <!--自定义事件sum,绑定父组件方法sumtotal-->
    <button-click v-on:sum="sumtotal"></button-click>
    <button-click v-on:sum="sumtotal"></button-click>
</div>
```
```javascript
//组件注册
Vue.component('button-click',{
    //绑定子组件click事件,触发自身的sum方法
    template:'<button v-on:click="sum">{{ counter }}</button>',
    data:function(){
        return{
            counter:0
        }
    },
    methods:{
        sum:function(){
            this.counter++;
            //触发自定义事件sum
            this.$emit('sum');
        }
    }
})
new Vue({
    el:"#example",
    data:{
        total:0,
    },
    methods:{
        //与自定义事件sum绑定的方法
        sumtotal:function(){
            this.total++;
        }
    }
});
```
- 在html中,自定义组件绑定了自定义事件sum,然后再组件注册的时候,子组件在template中,绑定了自身的click事件,触发自身的methods-sum方法,在子组件methods中,利用$emit触发在html中绑定的自定义事件sum,从而报告了自身的事件,然后就触发了父元素的methods,与自定义事件sum相绑定的sumtotal

- 子组件已经与外部完全解耦了,他只需要*报告*自己内部事件,至于父组件是否关心则与它无关。

- 给组件绑定原生事件

- 有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 .native 修饰 v-on 。例如：

```html
<my-component v-on:click.native="doTheThing"></my-component>
```

##### 使用自定义事件的表单输入组件

- 语法糖 v-model
    + `<input v-model="something">`
    + 这不过是以下示例的语法糖：
    + `<input v-bind:value="something" v-on:input="something = $event.target.value">`
    + 所以在组件中使用时，它相当于下面的简写：
    + `<custom-input v-bind:value="something" v-on:input="something = arguments[0]"></custom-input>`
    + 所以要让组件的 v-model 生效，它必须：
    + 接受一个 value 属性
    + 在有新的 value 时触发 input 事件

- 简单的货币输入的自定义控件

```html
<div id="example">
        <currency-input v-model="price"></currency-input>
        <!--要拆分为-->
        <currency-input v-bind:value="price" v-on:input="price = $event.target.value"></currency-input>
</div>
```
```javascript
Vue.component('currency-input', {
  template: '\
    <span>\
      $\
      <input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
      >\
    </span>\
  ',
  props: ['value'],
  methods: {
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function (value) {
      var formattedValue = value
        // 删除两侧的空格符
        .trim()
        // 保留 2 小数位
        .slice(0, value.indexOf('.') + 3)
      // 如果值不统一，手动覆盖以保持一致
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 通过 input 事件发出数值
      this.$emit('input', Number(formattedValue))
    }
  }
})
var vm=new Vue({
  el: '#example',
  data: {
    price: 0
  }
})
```

- 要记住,v-bind:被绑定者="原始数据",还有v-model拆分为v-bind:value,v-on:input
    + 所以,在模板当中的props,获取的是父组件v-model语法糖中的v-bind:value的value,而不是模板当中的v-bind:value

- 在初始化的时候,父组件的v-model拆分为v-bind:value和v-on:input
- 然后$on就会监听父组件的input事件(这个是自定义事件),并将数据props给子组件(模板当中的props)
- 这时候模板当中的v-bind:value就绑定上了props中父组件传递过来的数据['value'],(因为父组件中v-mode是语法糖,拆开后就是v-bind:value="父组件绑定的事件")
- 模板中,父组件通过v-on监听子组件的input事件,并在input 触发时,调用模板自身当中的methods-updateValue,并将用户键入的值作为行参传递进去,进行数据的处理,
- 最后 $emit('input',数据),子组件通过$emit 触发input事件,将数据传递回给$on作为回调,
- 那么这个时候,作为回调,就是父组件的v-on:input="数据=输入的值",就会更新父组件v-bind:value的数据,也会更新data,最后再通过props传给子组件
- 这时,通过$on监听,$emit触发,props传递 就会让父组件的data和子组件的value两者绑定在一起,实现双向绑定了
- 这个例子中,每input一次就会$emit一个事件
- 因为$on只能侦听父组件的事件,不能侦听子组件的事件,所以子组件中必须要用v-on来绑定侦听的事件,

- $on 监听当前实例上的自定义事件。事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。
- vm.$emit( event, […args] )触发当前实例上的事件。附加参数都会传给监听器回调。

- 复杂一点的例子
- 要引用currency-validator插件
```html
<div id="example2">
        <c-input label="Price" v-model="price"></c-input>
        <c-input label="Shipping" v-model="shipping"></c-input>
        <c-input label="Handling" v-model="handling"></c-input>
        <c-input label="Discount" v-model="discount"></c-input>
        <p>Total: ${{ total }}</p>
</div>
```
```javascript
<script src="https://cdn.rawgit.com/chrisvfritz/5f0a639590d6e648933416f90ba7ae4e/raw/98739fb8ac6779cb2da11aaa9ab6032e52f3be00/currency-validator.js"></script>
Vue.component('c-input',{
  template:'\
  <div>\
    <label v-if="label">{{ label }}</label>\
    $ \
    <input \
      ref="input"\
      v-bind:value="value"\
      v-on:input="updateValue($event.target.value)"\
      v-on:focus="selectAll"\
      v-on:blur="formatValue"\
    >\
  </div>\
  ',
  props:{
    value:{
      type:Number,
      default:0,
    },
    label:{
      type:String,
      default:'123'
    }
  },
  mounted:function(){
    this.formatValue();
  },
   methods: {
    updateValue: function (value) {
      var result = currencyValidator.parse(value, this.value)
      if (result.warning) {
        this.$refs.input.value = result.value
      }
      this.$emit('input', result.value)
    },
    formatValue: function () {
      this.$refs.input.value = currencyValidator.format(this.value)
    },
    selectAll: function (event) {
      setTimeout(function () {
      	event.target.select()
      }, 0)
    }
   },

});
var vm2= new Vue({
  el:"#example2",
  data:{
    price: 0,
    shipping: 0,
    handling: 0,
    discount: 0
  },
  computed:{
    total:function(){
      return( (this.price*100+this.shipping*100+this.handling*100)/100*(this.discount/10)).toFixed(2);
    }
  }
});
```

##### 非父子组件通信
- 有时候两个组件也需要通信(非父子关系)。在简单的场景下，可以使用一个空的 Vue 实例作为中央事件总线：
```javascript
var bus = new Vue()
// 触发组件 A 中的事件
bus.$emit('id-selected', 1)
// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})
```
- 在复杂的情况下，我们应该考虑使用专门的 状态管理模式.

#### 使用slot分发内容

- 为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为**内容分发**

##### 编译作用域

- 父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。

- 常见的错误,试图在父组件模板内将一个指令绑定到子组件的属性/方法

```html
<!-- 无效 -->
<!-- someChildProperty是子组件属性 -->
<child-component v-show="someChildProperty"></child-component>
```
- 假定 someChildProperty 是子组件的属性，上例不会如预期那样工作。父组件模板不应该知道子组件的状态。

- 如果要绑定作用域内的指令到一个组件的根节点，你应当在组件自己的模板上做：

```javascript
Vue.component('child-component', {
  // 有效，因为是在正确的作用域内
  template: '<div v-show="someChildProperty">Child</div>',
  data: function () {
    return {
      someChildProperty: true
    }
  }
})
```

- 分发内容是在父组件域内编译的(slot是在父作用域内编译)

##### 单个Slot

- 除非子组件模板包含至少一个`<slot>`接口,否则父组件的内容将会被**丢弃**

- 当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。

- 最初在`<slot>`标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时(就是没有分发内容)才显示备用内容。

- 例子
```html
<div id="example1">
    <h1>我是父组件的标题</h1>
    <my-component>
        <p>这是一些初始内容</p>
        <p>这是更多的初始内容</p>
    </my-component>
</div>
```

```javascript
//模板
Vue.component('my-component', {
        template: '\
        <div>\
        <h2>我是子组件的标题</h2>\
            <slot>\
                只有在没有要分发的内容时才会显示。\
            </slot>\
        </div>',
    }
    );
//初始化
new Vue({
        el:"#example1"
    });
```

- 渲染结果
```html
<div>
  <h1>我是父组件的标题</h1>
  <div>
    <h2>我是子组件的标题</h2>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </div>
</div>
```

##### 具名slot

- 可以为`<slot>`加一个name属性,用于配置如何分发内容

- 多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 slot 特性的元素。

- 就是和name相对应的就内容就填进来,在父组件中可以slot="123",那么slot中就是name="123",就将两个绑定在一起了

- 仍然可以有一个匿名 slot ，它是默认 slot ，作为找不到匹配的内容片段的备用插槽。如果没有默认的 slot ，这些找不到匹配的内容片段将被抛弃。

```html
<!--父组件-->
<div id="em">
        <app-layout>
            <h1 slot="header">这里可能是一个页面标题</h1>
            <p>主要内容的一个段落。</p>
            <p>另一个主要段落。</p>
            <p slot="footer">这里有一些联系信息</p>
        </app-layout>
    </div>
```
```javascript
Vue.component('my-component', {
    template: '\
    <div>\
    <h2>我是子组件的标题</h2>\
        <slot>\
            只有在没有要分发的内容时才会显示。\
        </slot>\
    </div>',
}
);
new Vue({
    el:"#example1"
});
```

- 渲染结果
```html
<div class="container">
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里有一些联系信息</p>
  </footer>
</div>
```

- 在使用组件的时候 Slot十分有用

##### 作用域插槽

- 2.1.0新增

- 就是在子组件的slot中,可以用text="数据",来将数据这个数据传回给父组件的scope的临时变量

- 在子组件中，只需将数据传递到插槽(scope)，就像你将 prop 传递给组件一样

- 在父级中，具有特殊属性 scope 的`<template>`元素，表示它是作用域插槽的模板。scope 的值对应一个临时变量名，此变量接收从子组件中传递的 prop 对象

```html
<div id="emp1">
    <child>
        <!--接收从子组件中传递的prop对象(这个就是作用域插槽)-->
        <template scope="abcde">
            <span>hello from parent</span>
            <!--使用这个prop对象-->
            <span>{{ abcde.text }}</span>
        </template>
    </child>
</div>
```

```javascript
Vue.component('child',{
    // props:['abcde'],//这个写不写都可以,作用域插槽固定会接收prop对象,而且这个prop对象是肯定存在的
    template:'\
    <div>\
    <!--在子组件里直接将数据传递给slot--><br/>\
    <slot text="hello from child"></slot>\
    </div>'
});
new Vue({
    el:"#emp1"
});
```

- 渲染结果
```html
<div class="parent">
  <div class="child">
    <span>hello from parent</span>
    <!--子组件的东西出现在这里了-->
    <span>hello from child</span>
  </div>
</div>
```

- 复杂点的例子,用于列表组件下,允许组件自定义应该如何渲染列表每一项
```html
<div id="emp2">
    <!--父组件绑定的数据,绑定的是实例的数据-->
    <child2 v-bind:items="items">
        <!--分发内容绑定的内容, scope临时变量-->
        <template slot="data" scope="data">
            <!--临时变量的text-->
            <li>{{data.text}}</li>
        </template>
    </child2>
</div>
```

```javascript
Vue.component('child2',{
    props:['items'],//一定要写,这个是从父组件传入的数据
    template:'\
    <ul>\
    //与父组件绑定的slot名,v-bind:text的是父组件每一项的.text,并将这个然后v-bind:text,这个text对象传递到scope的临时变量里\  
    <slot name="data" v-for="data in items" v-bind:text="data.text"></slot>\
    </ul>'
});
```

#### 动态组件
- 通过使用保留的`<component>`元素,动态地帮到它的`is`特性,我们让多个组件可以使用同一个挂在点,并动态切换:
```html
<!--这个is是一个字符串,根据返回值来给组件进行v-bind-->
<component v-bind:is="currentView">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home' //默认值
  },
  components: { //根据不同的值进行不同的组件切换,这里用components写法
    home: { /* ... */ }, 
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})
```

- 也可以直接绑定到组件对象上：
```javascript
var Home = {
  template: '<p>Welcome home!</p>'
}
var vm = new Vue({
  el: '#example',
  data: {
    currentView: Home
  }
})
```

##### keep-alive

- 如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数

```html
<keep-alive>
  <component :is="currentView">
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>
```

#### 杂项

##### 编写可复用组件
- 在编写组件时，记住是否要复用组件有好处。一次性组件跟其它组件紧密耦合没关系，但是可复用组件应当定义一个清晰的公开接口。

- Vue组件的API来自三部分-props,events和slots:
    + Props 允许外部环境传递数据给组件
    + Events 允许组件触发外部环境的副作用
    + Slots 允许外部环境将额外的内容组合在组件中(分发)

- 使用 v-bind 和 v-on 的简写语法，模板的缩进清楚且简洁：
```html
<!--v-bind,缩写:,绑定prop-->
<!--v-on,缩写@,监听事件-->
<!--slot插槽-->
<my-component
  :foo="baz"  
  :bar="qux"
  @event-a="doThis"
  @event-b="doThat"
>
  <img slot="icon" src="...">
  <p slot="main-text">Hello!</p>
</my-component>
```

##### 子组件索引
- 尽管有props和events,但是有时仍然需要在js中直接访问子组件。为此可以使用`ref`为子组件指定一个索引ID
```html
<div id="parent">
    <user-profile ref="profile"></user-profile>
</div>
```

```javascript
 var parent = new Vue({
    el:'#parent'
 })
 var child = paren.$refs.profile;
```
- 当`ref`和`v-for`一起使用时,ref是一个数组或对象,包含相应的子组件.
- `$refs`只在组件渲染完成后才填充,并且它是非响应式的.它仅仅作为一个直接访问子组件的应急方案--应当避免在模板或计算属性中使用`$refs`


##### 异步组件(跳过)

- 在大型的应用中,我们可能需要将应用拆分为多个小模板,按需从服务器下载,Vue.js允许将组件定义为一个工厂函数,动态地解析组件的定义。
- Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。
```javascript
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

- 工厂函数接收一个 resolve 回调，在收到从服务器下载的组件定义时调用。也可以调用 reject(reason) 指示加载失败。这里 setTimeout 只是为了演示。怎么获取组件完全由你决定。推荐配合使用 ：Webpack 的代码分割功能：

```javascript
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 require 语法告诉 webpack
  // 自动将编译后的代码分割成不同的块，
  // 这些块将通过 Ajax 请求自动下载。
  require(['./my-async-component'], resolve)
})
```

- 你可以使用 Webpack 2 + ES2015 的语法返回一个 Promise resolve 函数：

```javascript
Vue.component(
  'async-webpack-example',
  () => import('./my-async-component')
)
```

- 如果你是 Browserify 用户,可能就无法使用异步组件了,它的作者已经表明 Browserify 是不支持异步加载的。Browserify 社区发现 一些解决方法，可能有助于已存在的复杂应用。对于其他场景，我们推荐简单实用 Webpack 构建，一流的异步支持

##### 组件命名约定

- 当注册组件（或者 props）时，可以使用 kebab-case ，camelCase ，或 TitleCase 。Vue 不关心这个。
```javascript
// 在组件定义中
components: {
  // 使用 kebab-case 形式注册
  'kebab-cased-component': { /* ... */ },
  // register using camelCase
  'camelCasedComponent': { /* ... */ },
  // register using TitleCase
  'TitleCasedComponent': { /* ... */ }
}
```

- 在 HTML 模版中，请使用 `kebab-case` 形式：
```html
<!-- 在HTML模版中始终使用 kebab-case -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<title-cased-component></title-cased-component>
```

- 当使用字符串模式时，可以不受 HTML 的 case-insensitive 限制。这意味实际上在模版中，你可以使用 camelCase 、 TitleCase 或者 kebab-case 来引用：

```html
<!-- 在字符串模版中可以用任何你喜欢的方式! -->
<my-component></my-component>
<myComponent></myComponent>
<MyComponent></MyComponent>
```

- 如果组件未经 slot 元素传递内容，你甚至可以在组件名后使用 / 使其自闭合：
```html
<my-component/>
```
- 当然，这只在字符串模版中有效。因为自闭的自定义元素是无效的 HTML ，浏览器原生的解析器也无法识别它。


##### 递归组件

- 组件在它的模板内可以递归地调用自己，不过，只有当它有 name 选项时才可以

- 当你利用Vue.component全局注册了一个组件, 全局的ID作为组件的 name 选项，被自动设置.

```javascript
//组件可以用name来写名字
name: 'unique-name-of-my-component'
//也可以在创建的时候默认添加名字,全局的ID作为组件的 name 选项，被自动设置.
Vue.component('unique-name-of-my-component', {
  // ...
})
//如果同时使用的话,递归的时候就会不断递归自己,导致溢出
name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'
```
- 上面组件会导致一个错误 “max stack size exceeded” ，所以要确保递归调用有终止条件 (比如递归调用时使用 v-if 并让他最终返回 false )。

##### 组件间的循环引用Circular References Between Components
- 假设你正在构建一个文件目录树，像在Finder或文件资源管理器中。你可能有一个 tree-folder组件:
```html
<p>
  <span>{{ folder.name }}</span>
  <tree-folder-contents :children="folder.children"/>
</p>
```
- 然后一个tree-folder-contents组件
```html
<ul>
  <li v-for="child in children">
    <tree-folder v-if="child.children" :folder="child"/>
    <span v-else>{{ child.name }}</span>
  </li>
</ul>
```

- 当你仔细看时，会发现在渲染树上这两个组件同时为对方的父节点和子节点–这点是矛盾的。当使用Vue.component将这两个组件注册为全局组件的时候，框架会自动为你解决这个矛盾，如果你是这样做的，就不用继续往下看了。
- 然而，如果你使用诸如Webpack或者Browserify之类的模块化管理工具来requiring/importing组件的话，就会报错了：
    + Failed to mount component: template or render function not defined.

- 为了解释为什么会报错，简单的将上面两个组件称为 A 和 B ，模块系统看到它需要 A ，但是首先 A 需要 B ，但是 B 需要 A， 而 A 需要 B，陷入了一个无限循环，因此不知道到底应该先解决哪个。要解决这个问题，我们需要在其中一个组件中（比如 A ）告诉模块化管理系统，“A 虽然需要 B ，但是不需要优先导入 B”

- 在我们的例子中，我们选择在tree-folder 组件中来告诉模块化管理系统循环引用的组件间的处理优先级，我们知道引起矛盾的子组件是tree-folder-contents，所以我们在beforeCreate 生命周期钩子中去注册它：
```javascript
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
}
```

##### 内联模板
- 如果子组件有inline-template特性(属性),那么组件将把它的内容当作它的模板,而不是把它当作分发内容.
```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

- 但是 inline-template(特性) 让模板的作用域难以理解。最好是template 选项在组件内定义模板或者在 .vue 文件中使用 template 元素。

##### X-Templates 
- 也可以在script标签使用`type="text/x-template"`类型,并且指定一个id,
```html
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
``` 
```javascript
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```
- 在很多模板或者小的应用当中可以使用,也很有用,否则应该避免运用它,因为它将模板和组件的其他定义隔离了。


##### 对低开销的静态组件使用 v-once

- 当组件中包含`大量`静态内容时,可以用`v-once`将渲染结果缓存起来
```javascript
Vue.component('terms-of-service', {
  template: '\
    <div v-once>\
      <h1>Terms of Service</h1>\
      ... a lot of static content ...\
    </div>\
  '
})
```