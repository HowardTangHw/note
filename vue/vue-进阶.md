# Vue.js-进阶
## 2017年4月25日17:08:59

**************************************************

## 深入响应式原理
- Vue最显著的特性之一是:`响应式系统(reactivity system)`.
    + 模型层(model)只是普通的js对象,修改它则更新视图(view).

#### 如何追踪变化

<img src="http://cn.vuejs.org/images/data.png" />

- 把一个普通 JavaScript 对象传给 Vue 实例的**data**选项，Vue 将遍历此对象所有的属性，并使用 **Object.defineProperty** 把这些属性全部转为 getter/setter。

- 每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的**setter**被调用时，会通知**watcher**重新计算，从而致使它关联的组件得以更新。

#### 变化监测问题

- 收到现代js的限制,Vue**不能监测到对象属性的添加或删除**;由于Vue只会在实例化时执行对属性的**getter/setter**转化过程,所以属性必须在**data**对象上存在,才能让Vue转换它,这样的属性,才是响应的.
```javascript
var vm = new Vue({
  data:{
  a:1
  }
})
// `vm.a` 是响应的
vm.b = 2
// `vm.b` 是非响应的
```

- Vue不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。但是可以用**Vue.set**方法将响应属性添加到嵌套的对象上:
```javascript
// Vue.set(obj,key,value);
Vue.set(vm.someObject,'b',2);
```
- 也可以用vm.$set实例方法,这是全局Vue.set方法的别名
```javascript
this.$set(this.someObject,'b',2);
```

- 如果向已有对象上添加一些属性,例如用Object.assign() 或 _.extend() 方法来添加属性,那么这些新添加的属性不会触发更新,这种情况下,可以创建一个新对象,让他包含原对象的属性和新的属性

```javascript
this.someObject = Object.assign({},this.someObject,newObject);
//这样返回的是一个新的对象,而不是在已有的对象上面添加新的属性了.
```

#### 声明响应式属性

- 由于不允许动态添加根级响应式属性,所以必须在实例化前声明根级响应式属性,哪怕是一个空值:
```javascript
var vm = new Vue({
    data:{
        //声明一个空的根级响应式属性
        m:''
    },
    template:'<div>{{message}}</div>'
})
//这样之后就可以设置它了
vm.m='1';
```
- 如果在data种没声明`message`,那么就会报错:渲染函数在试图访问的属性不存在.

- 提前声明所有的响应式属性，可以让组件代码在以后重新阅读或其他开发人员阅读时更易于被理解。

#### 异步更新队列

- Vue异步执行DOM更新。
   > + 只要观察到数据变化,Vue将开启一个队列,并缓冲在同一时间循环中发生的所有数据改变.如果同一个**watcher**被多次触发,只会一次推入队列中.这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作上非常重要.
   > + 在下一个时间循环"tick"中,Vue刷新队列并执行(已经去重)的工作.
   > + 内部尝试对异步队列使用原生的**Promise.then**和**MutationObserver**,如果环境不支持,则采用setTimeout(fn,0)

- 为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用**Vue.nextTick(callback)**。这样回调函数在 DOM 更新完成后就会调用。
```html
<div id="example">{{message}}</div>
```
```javascript
var vm = new Vue({
    el:'#example',
    data:{
        message:'123'
    }
})
vm.message='abc'//更换数据
vm.$el.text=content==='abc'//false 还没更新
Vue.nextTick(function(){
    vm.$el.text=content==='abc'//true 更新了
});
```
- 可以在组件内使用**vm.$nextTick()**,因为不需要全局的Vue,并且回调函数当中的**this**会自动绑定到当前的Vue实例上:
```javascript
Vue.component('example', {
    template: '<span @click="updateMessage">{{message}}</span>',
    props: ['msg'],
    data: function () {
        return { message: 'not updated' }
    },
    methods: {
        updateMessage: function () {
            this.message = 'updated';
            console.log(this.$el.textContent)//not Updated
            this.$el.nextTick(function () {
                console.log(this.$el.textContent)//updated
            })
        }
    }
});
var vm = new Vue({
    el: '#example'
})
```
**************************************************
## 过渡&动画

###　进入／离开＆列表过渡

#### 概述

- 在插入,更新或者移除dom的时候,提供了多种不同方式的过渡效果.
    + CSS过渡和动画中自动应用class
    + 可以配合使用第三方CSS动画库
    + 在过渡钩子函数中使用JS直接操作DOM
    + 使用第三方的js动画库

#### 单元素/组件的过渡

- Vue提供了**transition**的封装组件,在下列情况中,可以给任何元素和组件添加entering/leaving过渡
    + 条件渲染(v-if)
    + 条件展示(v-show)
    + 动态组件
    + 组件根节点

- demo:
```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```javascript
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
```

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
```

- 当插入或者删除包含在**transition**组件中的元素时,Vue将会作出以下处理:
    + > 自动嗅探目标元素是否应用了CSS过渡或动画,如果是,则会在恰当的时机添加/删除CSS类名
    + > 如果过渡组件提供了<a href="https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-Hooks" target="_blank">JavaScript 钩子函数</a>,这些钩子函数将在恰当的时机被调用.
    + > 如果没有找到js钩子,并且也没有检测到CSS过渡/动画,DOM操作(插入/删除)在下一帧立即执行.(是浏览器的逐帧动画机制,而不是**nextTick**)

> 过渡的-CSS-类名

- 会有4个(CSS)类名在enter/leave的过渡中切换
    + **v-enter**:定义进入过渡的开始状态.在元素被插入时生效,在下一个帧移除。
    + **v-enter-active**:定义进入过渡的结束状态。在元素被插入时生效,在**transition/animation**完成之后移除。
    + **v-leave**:定义离开过渡的开始状态.在离开过渡被触发时生效,在下一个帧移除。
    + **v-leave-active**:定义离开过渡的结束状态.在离开过渡被触发时生效,在**transition/animation**完成之后移除。

<img src="https://cn.vuejs.org/images/transition.png"/>

- 对于这些在**enter/leave**过渡中切换的类名,`v-`是这些类名的前缀.使用`<transition name="my-transition">` 可以重置前缀. 例如将v-enter替换为my-transition-enter

> CSS过渡
- 常用的过渡都是CSS过渡
```html
<div id="example">
    <button @click="show = !show">
    toggle render
</button>
    <transition name="slide-fade">
        <p v-if="show">hello</p>
    </transition>
</div>
```
```javascript
new Vue({
    el: '#example',
    data: {
        show: true
    }
})
```
```css
.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .8s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
    transform: translateX(10px);
    background: #aaa;
    color: blue;
    opacity: 0;
}
```

> CSS动画

- CSS动画用法同css过渡,区别是在动画中**v-enter**类名在插入DOM之后不会立即删除,而是在**animationend**事件触发时删除(就是动画完了才会触发删除)

```html
<div id="example">
    <button @click="show = !show">
    toggle render
</button>
    <transition name="animation">
        <p v-if="show">hello</p>
    </transition>
</div>
```

```css
.animation-enter-active {
    animation: bounce-in .5s;
}

.animation-leave-active {
    animation: bounce-out .5s;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
        background: #f54;
    }
    50% {
        transform: scale(1.5);

        background: #b85;
    }
    100% {
        transform: scale(1);
    }
}

@keyframes bounce-out {
    0% {
        transform: scale(1);
        background: #754;
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(0);
    }
}
```

> 自定义过渡类名

- 可以在`<transition></transition>` 添加以下特性来自定义过渡类名:
    + `enter-class`
    + `enter-active-class`
    + `leave-class`
    + `leave-active-class`

- 优先级高于普通的类名,这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 Animate.css 结合使用十分有用。

```html
<link href="https://unpkg.com/animate.css@3.5.1/animate.min.css" rel="stylesheet" type="text/css">
  <div id="example">
    <button @click="show = !show">
    Toggle render
  </button>
    <transition name="custom-classes-transition" enter-active-class="animated rotateIn" leave-active-class="animated tada">
      <p v-if="show">hello</p>
    </transition>
  </div>
```

> 同时使用Transitions 和 Animations

- 为了监听过渡完成,有相应的事件监听器**transitionend**或**animationend**,这取决于给元素应用的css的规则,如果使用其中一种,vue能自动识别类型并设置相应监听

- 但是如果你为同一个元素设置两种过渡动效,而其中一个很快被触发并且完成了,而另一个效果还没结束,这个时候就需要在`<transiton>`中添加`type`特性,并且设置`animation`或`transition`(反正就是两者需时最长的那个) 来明确声明你需要Vue监听的类型

> javascript钩子

- 可以在属性中声明 JavaScript 钩子
```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```
```javascript
// ...
methods: {
  // --------
  // 进入中
  // --------
  beforeEnter: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },
  // --------
  // 离开时
  // --------
  beforeLeave: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```

- javascript钩子函数可以结合 **CSS** `transitions/animations` 使用，也可以单独使用。

- 当只用javascript过渡的时候,**在`enter`和`leave`中,回调函数`done`是必须的**.否则他们两个的过渡都会同步调用,过渡会立即完成

- 可以对仅使用javascript过渡的元素添加`v-bind:css="false"`,Vue会跳过css的监测,也可以避免过渡过程中CSS的影响.
```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
    <div id="example">
        <button @click="show = !show">
            Toggle
        </button>
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
            <p v-if="show">
                Demo
            </p>
        </transition>
    </div>
```

```javascript
new Vue({
  el: '#example',
  data: {
    show: false
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 1
    //   el.style.background="#f60";
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em'}, { duration: 300 })
      Velocity(el, { fontSize: '1em',color: ["#888", "#000"],background: ['#ffeecc','#e29ae5','#869cee','#509aee','#4988e5'] }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
    }
  }
})
```

#### 初始渲染的过渡

- 可以通过`apper` 特性设置节点在初始渲染的过渡
```html
<transition appear>
<!--...-->
</transition>
```

- 默认和进入和离开过渡一样,同样也可以自定义css类名
```html
<transition
  appear
  appear-class="my-appear-class"
  appear-active-class="my-appear-active-class"
>
  <!-- ... -->
</transition>
```

- 自定义js钩子

```html
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
>
  <!-- ... -->
</transition>
```

#### 多个元素过渡

- 对于多个元素过渡,原生标签可以使用`v-if/v-else`.

- 最常见的多标签过渡是一个列表和描述这个列表为空信息的元素

```html
<transition>
  <table v-if="items.length > 0">
    <!-- ... -->
  </table>
  <p v-else>Sorry, no items found.</p>
</transition>
```

- 但是要注意一点,当有**相同标签名**的元素切换的时候,需要配置`key` 特性设置唯一的值来标记,让vue可以区分它们,否则Vue为了效率会替换相同标签内部的内容.**给在`<transition>`组件中的多个元素设置key是一个更好的实践**

- example
 ```html
<transition>
    <button v-if="isEditing" key="save">
    Save
    </button>
    <button v-else key="edit">
        Edit
    </button>
</transition>
 ```

- 我们也可以通过给一个同一个元素的`key`特性设置不同的状态来代替`v-if`和`v-else`,上面例子可以重写为
```html
<transition>
    <button v-bind:key="isEditing">
    {{isEditing?'save':'edit'}}
    </button>
</transition>
```
- 使用多个 v-if 的多个元素的过渡可以重写为绑定了动态属性的单个元素过渡

```html
<transition>
  <button v-if="docState === 'saved'" key="saved">
    Edit
  </button>
  <button v-if="docState === 'edited'" key="edited">
    Save
  </button>
  <button v-if="docState === 'editing'" key="editing">
    Cancel
  </button>
</transition>
```
- 可以重写为

```html
<transition>
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>
```

```javascript
// ...
computed: {
  buttonMessage: function () {
    switch (docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```

> 过渡模式

- 在两个按钮过渡中,两个按钮都被重绘了,一个离开过渡的时候另一个开始进入过渡(就会出现闪一下,新的按钮从左移到相应的位置),这是`<transition>`的默认行为-进入和离开同时发生[demo](13.过渡效果/多元素过渡/多个元素过渡.html)

- 可以为元素加上绝对定位,让其在彼此智商的时候运行正常[demo](13.过渡效果/多元素过渡/过渡模式-绝对定位.html)

- 然后可以加上transition[demo](13.过渡效果/多元素过渡/过渡模式-transition.html)

- 同时生效的进入和离开的过渡不能满足所有的要求,所以提供了**过渡模式**,在`<transition>`中添加特性mode(demo就是上面那个transition)
    + in-out: 新元素先进行过渡，完成之后当前元素过渡离开。
    + out-in: 当前元素先进行过渡，完成之后新元素过渡进入。

#### 多个组件的过渡

- 多个组件的过渡我们不需要`key`特性,只需要[动态组件](https://cn.vuejs.org/v2/guide/components.html#动态组件)
```css
.flag-transition-enter-active,
.flag-transition-leave-activ {
    transition: opacity .3s ease-in-out;
}

.flag-transition-enter,
.flag-transition-leave-activ {
    opacity: 0
}
```
```html
<div id="example">
    <input v-model="flag" type="radio" value="abc" id="A1" name="flag" /><label for="A1">A</label>
    <input v-model="flag" type="radio" value="bcd" id="B1" name="flag" /><label for="B1">B</label>
    <transition name="flag-transition" mode="out-in">
        <component :is="flag"></component>
    </transition>
</div>
```
```javascript
new Vue({
    el: "#example",
    data: {
        flag: 'abc'
    },
    components: {
        'abc': {
            template: '<div>Component A</div>'
        },
        'bcd': {
            template: '<div>Component B</div>'
        }
    }
});
```

#### 列表过渡

- 怎么同时渲染整个列表,比如使用`v-for`?在这种场景中,使用`<transition-group>`组件.`<transition-group>`组件特性
    + 不同于`<transition>`,它会以一个真实元素呈现:默认一个为`<span>`.你也可以通过`tag`特性更换为其他元素.
    + 内部元素**总是需要**提供唯一的`key`属性值

> 列表的进入和离开过渡
```html
<div id="example">
        <button @click="add">add</button>
        <button @click="remove">remove</button>
        <transition-group name="list" tag="p">
            <span v-for="item in items" :key="item" class="list-item">
                {{item}}
            </span>
        </transition-group>
</div>
```
```css
.list-item {
    display: inline-block;
    margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
    transition: all 1s;
}

.list-enter,
.list-leave-active {
    opacity: 0;
    transform: translateY(30px);
}
```
```js
new Vue({
    el: "#example",
    data: {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nextNum: 10
    },
    methods: {
        randomIndex: function () {
            return Math.floor(Math.random() * this.items.length);
        },
        add: function () {
            this.items.splice(this.nextNum, 0, this.nextNum++);
        },
        remove: function () {
            this.items.splice(0, 1);
        },
    }
})
```

- 在这个效果中,移除数字后,其他的数字会瞬移到新布局的位置,而不是平滑的过渡 所以我们就需要#列表的位移过渡

> 列表的排序过渡

- `<transition-group>`组件还有一个特殊的地方.不仅可以进入和离开动画,还可以改变定位.这个功能需要用到`v-move`**特性**,它会在元素的改变定位的过程中应用,和之前的类名一样,可以通过`name`属性来自定义前缀,也可以通过`move-class`属性手动设置.
- `v-move`对于设置过渡的切换时机和过渡曲线非常有用

```html
<div id="example">
    <button @click="abcd">Shuffle</button>
    <transition-group name="flip-list" tag="ul">
        <li v-for="item in items" :key="item">
            {{item}}
        </li>
    </transition-group>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>

```
```js
new Vue({
    el:'#example',
    data:{
        items:[1,2,3,4,5,6,7,8,9]
    },
    methods:{
        abcd:function(){
            this.items=_.shuffle(this.items)
        }
    }
})
```
```css
.flip-list-move{
    transition:transform 1s;
}
```

- 在vue内部使用了一个叫[FLIP](https://aerotwist.com/blog/flip-your-animations/)简单的动画队列,使用`transition:transform 1s` 将元素从之前的位置平滑过渡到新的位置.
- 我们将之前实现的例子和这个技术结合，使我们列表的一切变动都会有动画过渡。


```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<div id="list-complete-demo" class="demo">
  <button v-on:click="shuffle">Shuffle</button>
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list-complete" tag="p">
    <span
      v-for="item in items"
      v-bind:key="item"
      class="list-complete-item"
    >
      {{ item }}
    </span>
  </transition-group>
</div>
<script>
  new Vue({
  el: '#list-complete-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle: function () {
      this.items = _.shuffle(this.items)
    }
  }
})
</script>
<style>
  .list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
```

:warning:需要注意的是使用 FLIP 过渡的元素不能设置为 `display: inline` 。作为替代方案，可以设置为 `display: inline-block` 或者放置于 flex 中



> 列表的交错过渡

```html
<div id="staggered-list-demo">
  <input v-model="query">
  <transition-group name="staggered-fade" tag="ul" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
    <li v-for="(item,index) in items" :key="item.msg" v-bind:data-index="index">
      {{item.msg}}
    </li>
  </transition-group>
</div>
<script>
  new Vue({
    el: "#staggered-list-demo",
    data: {
      query: '',
      list: [
        { msg: 'Bruce Lee' },
        { msg: 'Jackie Chan' },
        { msg: 'Chuck Norris' },
        { msg: 'Jet Li' },
        { msg: 'Kung Fury' }
      ]
    },
    computed: {
      items: function () {
        var vm = this;
        return this.list.filter(function (item) {
          return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
        })
      }
    },
    methods: {
      beforeEnter: function (el) {
        el.style.opacity = 0;
        el.style.height = 0;
      },
      enter: function (el, done) {
        var delay = el.dataset.index * 150;
        setTimeout(function () {
          Velocity(el, { opacity: 1, height: '1.6em' }, { complete: done })
        }, delay);
      },
      leave: function (el, done) {
        var delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 0, height: 0 },
            { complete: done }
          )
        }, delay)
      }
    }
  })
</script>
```



#### 可复用的过渡

过渡可以通过 Vue 的组件系统实现复用。要创建一个可复用过渡组件，你需要做的就是将 `<transition>` 或者 `<transition-group>` 作为根组件，然后将任何子组件放置在其中就可以了。

使用template的简单例子:

```javascript
Vue.component('my-special-transition', {
  template: '\
    <transition\
      name="very-special-transition"\
      mode="out-in"\
      v-on:before-enter="beforeEnter"\
      v-on:after-enter="afterEnter"\
    >\
      <slot></slot>\
    </transition>\
  ',
  methods: {
    beforeEnter: function (el) {
      // ...
    },
    afterEnter: function (el) {
      // ...
    }
  }
})
```

函数组件更适合完成这个任务：

```javascript
// 函数组件
Vue.component('example', {
  functional: true,
  render: function (creatElement, context) {
    var data = {
      props: {
        name: 'very-special-transition',
        mode: 'out-in'
      },
      on: {
        beforeEnter: function (el) {
          // ...
        },
        afterEnter: function (el) {
          // ...
        }
      }
    }
    return creatElement('transition',data,context,children)
  }
}) 
```



#### 动态过度

过渡也是数据驱动的！动态过渡最基本的例子是通过 `name` 特性来绑定动态值。

```html
<transition v-bind:name="transitionName">
  <!-- ... -->
</transition>
```

用 Vue 的过渡系统来定义的 CSS 过渡/动画 在不同过渡间切换会非常有用。

所有的过渡特性都是动态绑定。它不仅是简单的特性，通过事件的钩子函数方法，可以在获取到相应上下文数据。这意味着，可以根据组件的状态通过 JavaScript 过渡设置不同的过渡效果。

```html
<div id="dynamic-fade-demo" class="demo">
  Fade In:
  <input type="range" v-model="fadeInDuration" min="1" v-bind:max="maxFadeDuration" /> 
  Fade Out:
  <input type="range" v-model="fadeOutDuration" min="1" v-bind:max="maxFadeDuration" />
  <transition v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
    <p v-if="show">hello</p>
  </transition>
  <button v-if="stop" v-on:click="stop = false ; show = false">
    Star
  </button>
  <button v-else v-on:click="stop = true">
    Stop
  </button>
</div>
<script>
  new Vue({
    el: '#dynamic-fade-demo',
    data: {
      show: true,
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500,
      stop: true
    },
    mounted: function () {
      this.show = false
    },
    methods: {
      beforeEnter: function(el){
        el.style.opacity = 0
      },
      enter: function(el,done) {
        var vm = this;
        Velocity(el,
          { opacity: 1 },
          {
            duration: this.fadeInDuration,
            complete:function(){
              done()
              if (!vm.stop) vm.show = false
            }
          })
      },
      leave: function(el,done) {
        var vm = this
        Velocity(el,
          { opacity: 0 },
          {
            duration: this.fadeOutDuration,
            complete:function(){
              done()
              vm.show = true
            }
          }
        )
      }
    }
  })
</script>
```

### 状态过渡

Vue 的过渡系统提供了非常多简单的方法设置进入、离开和列表的动效。那么对于数据元素本身的动效呢，比如：

- 数字和运算
- 颜色的显示
- SVG 节点的位置
- 元素的大小和其他的属性

所有的原始数字都被事先存储起来，可以直接转换到数字。做到这一步，我们就可以结合 Vue 的响应式和组件系统，使用第三方库来实现切换元素的过渡状态。

#### 状态动画与观察者

通过观察者我们能监听到任何数值属性的数值更新。

```html
<script src="https://cdn.jsdelivr.net/npm/tween.js@16.3.4"></script>
<div id="animated-number-demo">
  <input v-model.number="number" type="number" step="20">
  <p>{{ animatedNumber }}</p>
</div>
<script>
new Vue({
  el: '#animated-number-demo',
  data: {
    number: 0,
    animatedNumber: 0
  },
  watch: {
    number: function(newValue, oldValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
          vm.animatedNumber = this.tweeningNumber.toFixed(0)
        })
        .start()
      animate()
    }
  }
})
</script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/tween.js@16.3.4"></script>
<script src="https://cdn.jsdelivr.net/npm/color-js@1.0.3"></script>
<div id="example-7">
  <input
    v-model="colorQuery"
    v-on:keyup.enter="updateColor"
    placeholder="Enter a color"
  >
  <button v-on:click="updateColor">Update</button>
  <p>Preview:</p>
  <span
    v-bind:style="{ backgroundColor: tweenedCSSColor }"
    class="example-7-color-preview"
  ></span>
  <p>{{ tweenedCSSColor }}</p>
</div>
<script>
  var Color = net.brehaut.Color
new Vue({
  el: '#example-7',
  data: {
    colorQuery: '',
    color: {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1
    },
    tweenedColor: {}
  },
  created: function () {
    this.tweenedColor = Object.assign({}, this.color)
  },
  watch: {
    color: function () {
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween(this.tweenedColor)
        .to(this.color, 750)
        .start()
      animate()
    }
  },
  computed: {
    tweenedCSSColor: function () {
      return new Color({
        red: this.tweenedColor.red,
        green: this.tweenedColor.green,
        blue: this.tweenedColor.blue,
        alpha: this.tweenedColor.alpha
      }).toCSS()
    }
  },
  methods: {
    updateColor: function () {
      this.color = new Color(this.colorQuery).toRGB()
      this.colorQuery = ''
    }
  }
})
</script>
<style>
  .example-7-color-preview {
  display: inline-block;
  width: 50px;
  height: 50px;
}
</style>
```



#### 动态状态过渡

```html
<style>
  svg { display: block; }
    polygon { fill: #41B883; }
    circle {
      fill: transparent;
      stroke: #35495E;
    }
    input[type="range"] {
      display: block;
      width: 100%;
      margin-bottom: 15px;
    }
</style>
<div id="app">
  <svg width="200" height="200">
    <polygon :points="points"></polygon>
    <circle cx="100" cy="100" r="90"></circle>
  </svg>
  <label>Sides:{{sides}}</label>
  <input type="range" min="3" max="500" v-model.number="sides">
  <label>Minimum Radius {{minRadius}}%</label>
  <input type="range" min="0" max="90" v-model.number="minRadius">
  <label>Update Interval: {{ updateInterval }} milliseconds</label>
  <input type="range" min="10" max="2000" v-model.number="updateInterval">
</div>
<script>
  new Vue({
    el: "#app",
    data: function () {
      var defaultSides = 10
      var stats = Array.apply(null, { length: defaultSides })
        .map(function () { return 100 })
      return {
        stats: stats,
        points: generatePoints(stats),
        sides: defaultSides,
        minRadius: 50,
        interval: null,
        updateInterval: 500
      }
    },
    watch: {
      sides: function (newSides, oldSides) {
        var sidesDifference = newSides - oldSides
        if (sidesDifference > 0) {
          for (var i = 1; i <= sidesDifference; i++) {
            this.stats.push(this.newRandomValue());
          }
        } else {
          var absoluteSidesDifference = Math.abs(sidesDifference)
          for (var i = 1; i <= absoluteSidesDifference; i++) {
            this.stats.shift()
          }
        }
      },
      stats: function (newStats) {
        TweenLite.to(this.$data, this.updateInterval / 1000,
          { points: generatePoints(newStats) })
      }
    },
    mounted: function () {
      this.resetInterval()
    },
    methods: {
      randomizeStats: function () {
        var vm = this
        this.stats = this.stats.map(function () {
          return vm.newRandomValue()
        })
      },
      newRandomValue: function () {
        return Math.ceil(this.minRadius + Math.random() * (100 - this.minRadius))
      },
      resetInterval: function () {
        var vm = this
        clearInterval(this.interval)
        this.randomizeStats()
        this.interval = setInterval(function () {
          vm.randomizeStats();
        }, this.updateInterval)
      }
    }
  })
  function valueToPoint(value, index, total) {
    var x = 0
    var y = -value * 0.9
    var angle = Math.PI * 2 / total * index
    var cos = Math.cos(angle)
    var sin = Math.sin(angle)
    var tx = x * cos - y * sin + 100
    var ty = x * sin + y * cos + 100
    return { x: tx, y: ty }
  }
  function generatePoints(stats) {
    var total = stats.length;
    return stats.map(function (stat, index) {
      var point = valueToPoint(stat, index, total);
      return point.x + ',' + point.y
    }).join(' ')
  }
</script>
```

#### 把过渡放到组件里

管理太多的状态过渡会很快的增加 Vue 实例或者组件的复杂性，幸好很多的动画可以提取到专用的子组件。

```html
<div id="addNumber">
  <input v-model.number="firstNumber" type="number" step="20"/>
  +
  <input v-model.number="secondNumber" type="number" step="20">=
  {{result}}
  <p>
    <animated-integer v-bind:value="firstNumber"></animated-integer>+
    <animated-integer v-bind:value="secondNumber"></animated-integer>=
    <animated-integer v-bind:value="result"></animated-integer>
  </p>
</div>
<script>
// 这种复杂的补间动画逻辑可以被复用
// 任何整数都可以执行动画
// 组件化使我们的界面十分清晰
// 可以支持更多更复杂的动态过渡
// 策略。
Vue.component('animated-integer',{
  template:'<span>{{tweeningValue}}</span>',
  props:{
    value:{
      type:Number,
      required:true
    }
  },
  data:function(){
    return {
      tweeningValue:0
    }
  },
  watch:{
    value:function(newValue,oldValue){
      this.tween(0,this.value)
    }
  },
  mounted:function(){
    this.tween(0,this.value);
  },
  methods:{
    tween:function(starValue,endValue){
      var vm =this
      function animate(){
        if(TWEEN.update()){
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({tweeningValue:starValue})
      .to({tweeningValue:endValue},500)
      .onUpdate(function(){
        vm.tweeningValue = this.tweeningValue.toFixed(0)
      })
      .start()

      animate()
    }
  }
})
// 所有的复杂度都已经从 Vue 的主实例中移除！
new Vue({
  el: '#addNumber',
  data: {
    firstNumber: 20,
    secondNumber: 40
  },
  computed: {
    result: function () {
      return this.firstNumber + this.secondNumber
    }
  }
})
</script>
```





## 可复用性&组合

### 混合

#### 基础

混合对象可以包含任意组件选项.以组件使用混合对象时,所有混合对象的选项都将被混入该组件本身的选项.

```javascript
//混合对象
var myMixin = {
    created(){
        this.hello();
    },
  	methods:{
        hello(){
            console.log('hello from mixin!')
        }
    }
}
//定义一个使用混合对象的组件
var Component = Vue.extend({
    mixins:[myMixin]
})

var component = new Component() // => "hello from mixin!"

```



#### 选项合并

当组件和混合对象具有`同名选项`时:

- 同名钩子函数将混合为一个数组,然后都被调用,并且`混合对象的钩子`将在`组件自身钩子`**之前**调用

```javascript
var mixin = {
    created(){
        console.log('混合对象钩子先被调用')
    }
}

new Vue ({
    mixins:[mixin],
  	created(){
        console.log('组件钩子被调用')
    }
})
// => "混合对象的钩子被调用"
// => "组件钩子被调用"
```

- 值为对象的选项,例如`methods`,`components`和`directives`,将被混合为同一个对象,当两个对象键名冲突时,取组件`对象`的键值对

```javascript
var mixin = {
    methods:{
        foo(){
            console.log('foo');
        },
      	conflicting(){
        	console.log('from mixin')
    	}
    }
}
var vm = new Vue({
    mixins:[mixin],
  	methods:{
        bar(){
            console.log('bar');
        },
      	conflicting(){
            console.log('from self')
        }
    }
})
vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

:warning:注意:`Vue.extend()`也是同样的策略进行合并



#### 自定义选项合并策略

自定义选项将使用默认策略,可以简单覆盖已有值.

如果想让自定义选项以自定义逻辑合并，可以向 `Vue.config.optionMergeStrategies` 添加一个函数：

```javascript
Vue.config.optionMergeStrategies.myOption = function (toVal,fromVal){
    // return mergedVal
}
```

对于大多数对象选项,可以使用`methods`的合并策略:

```js
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
```

更多高级的例子可以在vuex的1.x混合策略里找到:

```js
const merge = Vue.config.optionMergeStrategies.computed
Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
  if (!toVal) return fromVal
  if (!fromVal) return toVal
  return {
    getters: merge(toVal.getters, fromVal.getters),
    state: merge(toVal.state, fromVal.state),
    actions: merge(toVal.actions, fromVal.actions)
  }
}
```

### 自定义指令

#### 简介

除了默认设置的核心指令(`v-model`和`v-show`),Vue也允许注册自定义指令,

在Vue2.0里面,代码复用的主要形式和抽奖是组件,然后有的情况下,你仍然需要对纯dom元素进行底层操作,这时候就会用到自定义指令.

```html
<!-- 页面加载后 自动获取焦点 -->
<div id="simplest-directive-example">
  <input v-focus>
</div>
<script>
//可复用的全局自定义指令
Vue.directive('focus',{
  // 当绑定元素插入到 DOM 中。钩子函数
  inserted(el){
    el.focus()
  }
})
new Vue({
  el:"#simplest-directive-example"
})
//注册局部指令
new Vue({
  el: "#simplest-directive-example",
  directives: {
    focus: {
      // 钩子函数 当绑定元素插入到 DOM 中。
      inserted: function (el) {
        el.focus();
      }
    }
  }
})
</script>
```



#### 钩子函数

- `bind`:只调用一次,指令第一次绑定到元素时调用,用这个钩子函数可以定义一个在绑定时执行一次的初始化动作.
- `inserted`:被绑定元素插入父节点时调用(父节点存在即可调用,不必存在与document中).
- `update`:所在组件的VNode更新时调用,**但是可能发生在其孩子的VNode更新之前**. 指令的值可能发生了改变也可能没有,但是可以通过比较更新前后的值来忽略不必要的模板更新
- `componentUpdated`: 所在组件的Vnode **及其孩子的VNode**全部更新时调用
- `unbind`:只调用一次,指令与元素解绑时调用



#### 钩子函数的参数

- `el`:指令所绑定的元素,可以用来直接操作DOM.
- `binding`:一个对象,包含以下属性:
  + name:指令名,不包括`v-`前缀
  + value:指令绑定的值,例如`v-my-directive = "hhhh"`,value的值就是`hhhh`
  + oldValue: 指令绑定的前一个值,仅在`update`和`componentUpdate`中可用,无论值是否改变都可以用(可以通过比较更新前后的值来忽略不必要的模板更新)
  + expression:绑定值的字符串形式.例如`v-my-directive="1+1"`,expression的值就是`1+1`
  + arg:传给指令的参数.例如:`v-my-directive:foo`,arg的值就是`foo`.
  + modifiers:一个包含修饰符的对象,例如:`v-my-directive.foo.bar`, 修饰对象modifiers的值是`{foo:true,bar:true}`
- `vnode`:vue编译生成的虚拟节点,[Vue Node APi](https://cn.vuejs.org/v2/api/#VNode-接口)
- `oldVnode`:上一个虚拟节点,仅在`update`和`componentUpdated`钩子中可用.

> :warning:除了 `el` 之外，其它参数都应该是只读的，尽量不要修改他们。如果需要在钩子之间共享数据，建议通过元素的 [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) 来进行。

自定义钩子样例:

```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
<script>
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})
new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})
</script>
```

#### 函数简写

如果只想在`bind`和`update`钩子上重复动作,并且不想关心其他钩子的函数

简写:

```js
Vue.directive('color-swatch',function(el,binding){
    el.style.backgroundColor = binding.value
})
```

#### 对象字面量

如果指令需要多个值，可以传入一个 JavaScript 对象字面量;指令函数能够接受所有合法类型的 JavaScript 表达式。

```html
<div v-demo="{color:'white',text:'hello!'}"</div>
<script>
Vue.directive('demo',function(el,binding){
    console.log(binding.value.color) // white
  	console.log(binding.value.text) // hello
})
</script>
```





### 渲染函数 & JSX

#### 基础

Vue官方推荐绝大部分情况下使用`template`来创建HTML,但是在某些场景中,真的需要javascript的完全变成能力(jsx),这就是**render函数**,它比templete更接近编译器.

>  根据level动态出不同的heading标签组件

```html
<h1>
  <a name="hello-world" href="#hello-world">
    Hello World!
  </a>
</h1>
<!-- 定义组件接口 -->
<anchored-heading :level="1">Hello world!</anchored-heading>
<!-- 通过绑定的level prop动态生成heading标签组件 -->
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</script>
<script>
  Vue.component('anchored-heading', {
  template: '#anchored-heading-template',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
</script>
```

在这种场景中使用 template 并不是最好的选择：首先代码冗长，为了在不同级别的标题中插入锚点元素，我们需要重复地使用 `<slot></slot>`。

虽然模板在大多数组件中都非常好用，但是在这里它就不是很简洁的了。那么，我们来尝试使用 `render` 函数重写上面的例子：

```html
<!-- 定义组件接口 -->
<anchored-heading :level="1">Hello world!</anchored-heading>
<!-- render重写 -->
<script>
  Vue.component('anchored-heading',{
      render(){
          return creatElement(
          'h' + this.level,//tag name标签名称
           this.$slots.default // 子组件的阵列
          )
      },
      props:{
          level:{
              type:Number,
              required:true
          }
      }
  })
</script>
```

这样代码精简很多，但是需要非常熟悉 Vue 的实例属性。在这个例子中,需要知道当不使用`slot`属性向组件传递内容时,比如`anchored-heading`中的`Hello,World!`,这些子元素被存储在实例中的`$slots.default`中.

[实例属性](https://cn.vuejs.org/v2/api/#实例属性)



#### 节点、树 及虚拟DOM



```html
<div>
  <h1>My title</h1>
  Some text content
  <!-- TODO: Add tagline -->
</div>
```

当浏览器读到这些代码时，它会建立一个`Dom树`来保持追踪

HTML 的 DOM 节点树如下图所示：

![DomNode 节点](https://cn.vuejs.org/images/dom-tree.png)

每个元素都是一个节点。每片文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。

高效的更新所有这些节点会是比较困难的,不过vue已经处理好了,可以是在一个模板里:

```html
<h1>
  {{blogTitle}}
</h1>
```

渲染函数里：

```javascript
render(createElement){
    return creatElement('h1',this.blogTitle)
}
```

在这两种情况下，Vue 都会自动保持页面的更新，即便 `blogTitle` 发生了改变。

##### 虚拟Dom

Vue 通过建立一个**虚拟 DOM** 对真实 DOM 发生的变化保持追踪。

```js
return createElement('h1', this.blogTitle)
```

`createElement`返回的**不是一个实际的Dom元素**.它更准确的名字是`createNodeDescription`(创建节点事件?),包含的信息会告诉Vue页面上需要渲染什么样节点,及其子节点.

我们也叫这样的节点为`虚拟节点(Virtual DOM)` ,Vue中将它简写为`VNode`,`虚拟DOM`是Vue组件树简历起来的整个VNode树的称呼



#### `createElement`参数

```javascript
// @returns {VNode}
createElement(
  /* 第一个参数
   * {String | Object | Function}
   * 一个HTML标签字符串,组件选项对象,或者一个返回值类型为String / Object的函数
   * 必要参数
   */
  'div',
  /* {Object}
   * 一个包含模板相关属性对象 
   * 可以在template中使用这些属性.
   * 可选参数
   */
  {
      //....深入data对象
  },
  /* 第三个参数
   * {String|Array}
   * 子节点(VNodes),由 creatElement() 构建而成
   * 或使用字符串来生成"文本节点"
   * 可选参数
   */
  [
    'some worlds',
    createElement('h1','topNews'),
    createElement(MyComponent,{
        props:{
            someProp:'foobar'
        }
    })
  ]
)
```



##### 深入data对象(上方的第二个参数)

就好像在模板语法中,`v-bind:class`和`v-bind:style`会被区别对待,在VNode数据对象中,下列属性名是级别最高的字段.该对象也允许绑定普通的HTML特性,跟DOM属性一样,比如`innerHTML`(这样会取代`v-html`指令).

```js
{
  // 和`v-bind:class`一样的 API
  class: {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: "red",
    fontSize: "14px"
  },
  //正常的HTML特性
  attrs: {
    id: "foo"
  },
  // 组件 props
  props: {
    myProp: "bar"
  },
  // Dom属性
  domProps: {
    innerHTML: "baz"
  },
  // 事件监听基于 on
  // 所以不再支持如 v-on:keyip.enter 修饰器
  // 需要手动匹配 keyCode
  on: {
    click: this.clickHandler
  },
  // 仅对于组件,用于监听原生事件,而不是组件内部使用vm.$emit 触发的时间
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令.注意事项：不能对绑定的旧值设值
  // Vue会持续追踪
  directives: [
    {
      name: "my-custon-directive",
      value: "2",
      expression: "1+1",
      arg: "foo",
      modifiers: {
        bar: true
      }
    }
  ],
  // Scoped slots in the form of
  // { name : props => VNode | Array<VNode>}
  scopedSlots: {
    default: props => creatElement("span", props.text)
  },
  //如果组件是其他组件的子组件,需为插槽指定名称
  slot: "name-of-slot",
  //其他特殊顶层属性
  key: "myKey",
  ref: "myRef"
};
```



##### 完整示例

```js
var getChildrenTextContent = function(children) {
  return children
    .map(function(node) {
      return node.children ? getChildrenTextContent(node.children) : node.text;
    })
    .join("");
};
Vue.component("anchored-heading", {
  render(createElement) {
    // create kebabCase id
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, "-")
      .replace(/(^\-|\-$)/g, "");

    return createElement("h" + this.level, [
      createElement(
        "a",
        {
          attrs: {
            name: headingId,
            href: "#" + headingId
          }
        },
        this.$slots.default
      )
    ]);
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
});
```



##### 约束

**VNodes必须唯一**

组件树中的所有 VNodes 必须是唯一的。这意味着，下面的 render function 是无效的：

```js
render(createElemente){
    var myParagraphVNode = createElmeent('p','hi')
    return createElement('div',[
        //错误 重复的VNodes
      	myParagraphVNode,myParagraphVNode
    ])
}
```

如果需要重复很多次的元素/组件,可以使用工厂函数实现

```js
//利用工厂函数完美有效地渲染了20个重复的段落
render(createElement){
    return createElement('div',
 	 Array.apply(null,{length:20}).map(()=>{
        return createElement('p','hi')
    })
  )
}
```



#### 使用javascript代替模板功能

##### `v-if`和`v-for`

由于使用原生的 JavaScript 来实现某些东西很简单，Vue 的 render 函数没有提供专用的 API。比如，template 中的 `v-if` 和 `v-for`：

```html
<ul v-if="items.length">
	<li v-for="item in items">{{item.name}}</li>  
</ul>
<p v-else>
  No items found.
</p>
```

这些都会在 render函数中被javascript的`if`/`else`和`map`重写:

```js
render(createElement){
  if(this.items.length){
      return createElement('ul',this.itmens.map((item)=>{
        return createElement('li',item.name)
      }))
  } else {
    return createElement('p','No items found.')
  }
}
```

##### `v-model`

render函数中没有与`v-model`相应的api,必须自己来实现相应的逻辑

```js
render(createElement){
    var self = this;
  	return createElement('input',{
        domProps:{
            value:self.value
        },
      	on:{
            input(event){
                self.value = event.target.value
              	self.$emit('input',event.target.value)
            }
        }
    })
}
```



##### 事件 & 按键修饰符

| Modifier(s)                         | Prefix |
| :---------------------------------- | ------ |
| `.passive`                          | `&`    |
| `.capture`                          | `!`    |
| `.once`                             | `~`    |
| `.capture.once ` or `.once.capture` | `~!`   |

例如:
```js
on:{
    '!click':this.doThisInCapturingMode,
    '~keyup':this.doThisOnce,
    '~!mouse':this.doThisOnceInCapturingMode
}
```
对于其他的修饰符，前缀不是很重要，因为你可以在事件处理函数中使用事件方法：

| Modifier(s)                              | Equivalent in Handler                    |
| ---------------------------------------- | ---------------------------------------- |
| `.stop`                                  | `event.stopPropagation()`                |
| `.prevent`                               | `event.preventDefault()`                 |
| `self`                                   | `if(event.target !== event.currentTarget) return` |
| Keys:`.enter`,`.13`                      | `if(event.keyCode !== 13) return `(change`13` to another key code for other key modifiers) |
| Modifiers Keys: `.ctrl`,`.alt`,`.shift`,`.meta` | `if(!event.ctrlKey) return`(change `ctrlKey` to `altKey`,`shiftKey`,or  `metaKey`,respectively) |

一个使用所有修饰符的例子：

```js
on : {
    keyup:function(event){
      // 如果触发事件的元素不是事件绑定的元素
      // 则返回
      if(event.target !== event.currentTarget) return
      // 如果按下去的不是enter键或者没有同时按下shift键 则返回
      if(!event.shiftKey || event.keyCode !== 13) return
      //阻止事件冒泡
      event.stopPropagation()
      //阻止 该元素默认的keyup 事件
      event.preventDefault()
      //...
    }
}
```



##### 插槽

可以利用`this.$slots`获取VNodes列表中的静态内容:

```js
render: function (createElement) {
  // `<div><slot></slot></div>`
  return createElement('div', this.$slots.default)
}
```

还可以从 [`this.$scopedSlots`](https://cn.vuejs.org/v2/api/#vm-scopedSlots) 中获得能用作函数的作用域插槽，这个函数返回 VNodes(子传父)：

```js
render(createElement) {
    //<div><slot :text="msg"></slot></div>
  return createElement('div',[
      this.$scopedSlots.default({
          text:this.msg
      })
  ])
}
```

如果要向子组件传递作用域插槽,可以利用VNode数据中的 `scopedSlots`域(父传子):

```js
render(createElement){
    return createElement('div',[
        createEelment('child',{
        // pass `scopedSlots` in the data object
      	// in the form of { name: props => VNode | Array<VNode> }
      		scopedSlots:{
              default(props){
                  return createElement('span',props.text)
              }
            }
        })
    ])
}
```



####　JSX

写太多`render`函数,会感觉到痛苦

```js
createElement(
  'anchored-heading', {
    props:{
        level:1
   }
 },[
     createElement('span','Hello'),
   	 ' world'
 ]
)
```

模板就如此简单:

```html
<anchored-heading :level="1">
	<span>Hello</span> world!
</anchored-heading>
```

有一个[babel-plugin-transform-vue-js](https://github.com/vuejs/babel-plugin-transform-vue-jsx) 插件,用于在Vue中使用JSX.可以让我们回到更接近模板语法上

```js
import AnchoredHeading form './AnchoredHeading.vue'

new Vue({
    el:"#demo",
  	render (h) {
        return (
          <AnchoredHeading leve={1}>
          	<span>Hello</span> world!
          </AnchoredHeading>
        )
    }
})
```

> :warning:将 `h` 作为 `createElement` 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的，如果在作用域中 `h` 失去作用，在应用中会触发报错。

[JSX映射到javascript](https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage)



#### 函数式组件

上面DEMO的锚点标题组件,没有管理或者监听任何传递给他的状态,也没有声明周期方法,它只是一个接受参数的函数.

在这个例子中，我们标记组件为 `functional`，这意味它是无状态 (没有 `data`)，无实例 (没有 `this` 上下文)。

**函数式组件**:

```js
Vue.component('my-component',{
    funcional:true,
  	//为了弥补缺少的实例
  	// 提供第二个参数作为上下文(this)
  	render(h,context) {
        //...
    },
  	// Props 可选
  	props:{
        //...
    }
})
```

> :warning:在 `2.3.0 之前`的版本中，如果一个函数式组件想要接受 props，则 `props` 选项是**必须**的。在` 2.3.0 或以上的版本`中，**可以省略** `props` 选项，所有组件上的属性都会被`自动解析为 props`。



当标记为`functional`后,组件的render函数之间简单更新增加`context`参数作为上下文,`this.$slots.default` 更新为 `context.children`，之后`this.level` 更新为 `context.props.level`。

组件需要的一切都是通过上下文传递,包括

- `props`: 提供props的对象
- `children`: VNode子节点的数组
- `slots`: slots对象
- `data`: 传递给组件的data对象
- `parent`: 对父组件的引用
- `listeners`:(2.3.0+)一个包含了组件上所注册的`v-on`侦听器的对象.这只是一个指向`data.on`的别名
- `injections` : (2.3.0+)如果使用了[`inject`](https://cn.vuejs.org/v2/api/#provide-inject)选项,则该对象包含了应当被注入的属性.

函数式组件只是一个函数,所以渲染开销也低很多,然而,对持久化实例的缺乏也意味着函数式组件不会出现在`VUE DEVTOOLS` 的组件树里.

在作为包装组件时,它们也同样非常有用:

- 程序化地在多个组件中选择一个
- 将children,props,data传递给子组件之前操作它们.

一个依赖传入props的值的`smart-list`组件例子:

```js
var EmptyList = { /*some code*/ }
var TableList = { /*some code*/ }
var OrderedList = { /*some code*/ }
var UnorderedList = { /*some code*/ }

Vue.component('smart-list',{
    functional: true,
  	render(createElement,context){
        function appropriateListComponent () {
            var items = context.props.items
            
            if(items.length === 0 ) return EmptyList
          	if(typeof items[0] === 'object') return TableList
            if(context.props.isOrdered) return OrderedList
            
            return UnorderedList
        }
      return createdElement(
        appropriateListComponent(),
        context.data,
        context,children
      )
    },
  	props: {
        items:{
            type:Array,
          	required:true
        },
      	isOrdered:Boolean
    }
})
```

##### `slots()`和`children`对比

```html
<my-functional-component>
  <p slot="foo">
    first
  </p>
  <p>
    second
  </p>
</my-functional-component>
```

对于这个组件 使用`children`会返回两个段落标签,而`slots().default`只会传递第二个匿名段落标签,`slots().foo`会传递第一个具名段落标签.同时拥有`children`和`slots()`,因此可以选择让组件通过`slot()`系统分发或简单通过`children`接收,让其他组件去处理



### 插件

#### 开发插件

插件会为 Vue添加全局功能,插件范围没有限制:

1. 添加全局方法或者属性,如[vue-custom-element](https://github.com/karol-f/vue-custom-element)
2. 添加全局资源:指令/过滤器/过渡等,如 [vue-touch](https://github.com/vuejs/vue-touch)
3. 通过全局mixin方法添加一些组件选项,如: [vue-router](https://github.com/vuejs/vue-router)
4. 添加Vue实例方法,通过把它们添加到Vue.prototype上实现.
5. 一个库,提供自己的API,同时提供上面提到的一个或多个功能,如: [vue-router](https://github.com/vuejs/vue-router)

Vue.js的插件应当有一个公开的方法`install`.这个方法第一个参数是`Vue`构造器,第二个参数是一个可选的选项对象.

```js
MyPlugin.install=(Vue,options)=>{
    // 1. 添加全局属性或方法
  	Vue.myGlobalMethod = function(){
        //逻辑...
    }
    
    // 2.添加全局资源
    Vue.directive('my-directive',{
        bind(el,binding,vnode,oldVnode){
            // 逻辑...
        }
      //some code...
    })
  
  	// 3.注入组件
  	Vue.mixin({
        created:function(){
            //逻辑....
        }
      //..some code
    })
  
  	// 4.添加实例方法
  	Vue.prototype.$MyMethod = function(methodOptions){
        //逻辑...
    }
}
```



#### 使用插件

通过全局Vue.use() 使用插件:

```js
//调用 Myplugin.install(vue)
Vue.use(Myplugin)
```

也可以传入一个选项对象:

```js
Vue.use(MyPlugin,{someOption:true})
```

`Vue.use`会自动阻止注册相同的插件多次,届时只会注册一次该插件

Vue.js官方提供的一些插件(如`Vue-router`)在检测到`Vue`是可访问的全局变量时会自动调用`Vue.use()`.然而在例如 CommonJS 的模块环境中，你应该始终显式地调用 `Vue.use()`：

```js
// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
var Vue = require('vue')
var VueRouter = require('vue-router')
// 不要忘了调用此方法
Vue.use(VueRouter)
```

[awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries) 集合了来自社区贡献的数以千计的插件和库。



###　过滤器

Vue.js 允许自定义过滤器,可被用作一些常见的文本格式化。过滤器可以用在两个地方：**mustache插值和`v-bind`表达式**(后者从2.1.0+开始支持) .过滤器应该被添加在JS表达式尾部,由"管道符"(`|`) 指示:

```html
<!-- in mustaches --> 
{{ message | capitalize }}

<!-- in v-bind -->
<div v-bind:id="rawId | formateId"></div>
<script>
 new Vue({
   //....
   filters:{
       capitalize(value){
           if(!value) return ''
           value = value.toString()
           return value.charAt(0).toUpperCase() + value.slice(1)
       }
   }	
 })
</script>
```

过滤器函数总是接收表达式的值(之前的操作链的结果)作为第一个参数.

上方例子中,`capitalize`过滤器将会收到`message`的值作为第一个参数.



过滤器可以串联:

```html
{{ message | filterA | filterB }}
```

在这个例子中,`filterA`被定义为接收单个参数的过滤器函数,表达式`message`的值将作为参数传到函数`filterA`中,然后继续调用同样被定义为接收单个参数的过滤器函数`filterB`,将 `filterA` 的结果传递到 `filterB` 中。



过滤器是javasciprt函数,因此可以接收参数:

```html
{{ message | filterA('arg1',arg2) }}
```

`filterA`被定义为接收三个参数的过滤器函数.其中`message`的值作为第一个参数,普通字符串`arg1`作为第二个参数,表达式`arg2`取值后的值作为第三个参数.





## 规模化

### 路由



#### 官方路由

 [vue-router 库](https://github.com/vuejs/vue-router)

 [vue-router 文档](https://router.vuejs.org/)



#### 简单的路由

[简单的路由](https://github.com/chrisvfritz/vue-2.0-simple-routing-example)



### 状态管理

[Vuex](https://vuex.vuejs.org/zh-cn/)



### 服务端渲染

---没看

[SSR](https://ssr.vuejs.org/zh/)

[Nuxt.js](https://nuxtjs.org/)



## 内在

### 深入响应式原理

数据模型仅仅是JavaScript对象。而当修改数据模型时，视图会进行更新。这使得状态管理非常简单直接。

#### 如何追踪变化

当把一个普通的JavaScript对象传给Vue实例的`data`选项,Vue将遍历此对象所有的属性,并使用 [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) (添加/替换属性),把这些属性全部转为getter/setter, Object.defineProperty是在ES5中无法shim的特性,所以导致VUE不支持IE8以及更低版本浏览器的原因.

用户看不到gette/setter,但是在内部它们让Vue追踪依赖,在属性被访问或修改时通知变化。

> 浏览器控制台在打印数据对象时,getter/setter的格式并不同,所以需要在`vue-devtools`来获取更加友好的检查接口

每个组件实例都有相应的**watch**实例对象,它会在组件渲染的过程中把属性记录为依赖,之后当依赖项的`setter`被调用时,会通知`watcher`重新计算,从而致使它关联的组件得以更新.

![https://cn.vuejs.org/images/data.png](https://cn.vuejs.org/images/data.png)

#### 检测变化的注意事项

受现代JavaScript 的限制(以及废弃`Object.observe`),Vue**不能检测到对象属性的添加或删除**.由于Vue会在初始化实例时对属性执行`getter/setter`转化过程,所以属性必须在`data`对象上存在才能让Vue转换它,这样才能让它试下响应的.例如:

```js
var vm = new Vue({
  data:{
    a:1
  }
})

//`vm.a`是响应的

vm.b=2
//`vm.b`是非响应的
```

Vue不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property).然而它可以使用`Vue.set(object,key,value)`方法将响应属性添加到嵌套的对象上:

```js
Vue.set(vm.someObject,'b',2);
```

您还可以使用`vm.$set`实例方法,这也是全局`Vue.set`方法的别名

```js
this.$set(this.someObject,'b',2)
```

向已有对象上添加一些属性,例如使用`Object.assign()`或`_.extend()`方法来添加属性,但是,添加属性上的新属性不会触发更新,在这种情况下可以创建一个新的对象,让它包含原对象的属性和新的属性:

```js
// 代替`Object.assign(this.someObject,{a:1,b:2})`
this.someObject = Object.assign({},this.someObject,{ a:1, b:2 })
```

也有一些数组相关的问题，之前已经在[列表渲染](https://cn.vuejs.org/v2/guide/list.html#注意事项)中讲过。



#### 声明响应式属性

由于Vue不允许动态添加根级响应式属性,所以必须在初始化实例前声明根级响应式属性,哪怕是一个空值:

```js
var vm = new Vue({
  data:{
    //声明message 为一个空值字符串
    message:''
  },
  template:`<div>{{message}}</div>`
})
// 之后设置`message`
vm.message = 'HELLO!'
```

如果在data选项中未声明`message`,Vue将警告你渲染函数在试图访问的属性不存在.

这样的限制在背后是有其技术原因的,它消除了在依赖项跟踪系统中的一类边界情况,也使Vue实例在类型检测系统的帮助下运行的更高效.而且在代码可维护性方面也有一点重点考虑:`data`对象就像组件状态的概要,提前声明所有的响应式属性,可以让组件代码在以后更新阅读或其他开发人员阅读时更易于被理解



####　异步更新队列

Vue**异步**执行DOM更新,只要观察到数据变化,Vue将开启一个队列,并缓冲在同一事件循环中发生的所有数据改变.如果同一个watcher被多次触发,只会一次推入到队列中.这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作上非常重要,然后,在下一个的事件循环`tick`中,Vue刷新队列并执行实际(已去重的)工作,Vue在内部尝试对异步队列使用原生的`Promise.then`和`MutationObserver`,如果执行环境不支持,会采用`setTimeout(fn,0)`代替.

例如,当设置`vm.someData=  'new value'` ,组件不会立刻重新渲染,当刷新队列时,组件会在事件循环队列清空时的下一个`tick`更新,为了在数据变化之后等待Vue完成更新DOM,可以在数据变化之后立即使用`Vue.nextTick(callback)`.这样回调函数在DOM更新完成后就会调用.例如:

```html
<div id="example">
  {{message}}
</div>
```

```js
var vm = new Vue({
  el:"#example",
  data: {
    message:'123'
  }
})
vm.message = 'new message' //更改数据
// vm.$el.textContent  vm.$el-> node,当前要执行修改的node  textContent -> node及子代的文本
vm.$el.textContent === 'new message' // false 因为还没触发
Vue.nextTic(function(){
  vm.$el.textContent === 'new message' //true
})
```

在组件内使用`vm.$nextTick()`实例方法特别方便,因为它不需要全局的`Vue `,并且回调函数中的`this`将自动绑定到当前的Vue实例上:

```js
Vue.component('example',{
  template:'<span>{{message}}</span>',
  data:function(){
    return {
      message:'没有更新'
    }
  },
  methods:{
    updateMessage:function(){
      this.message = '更新完成'
      console.log(this.$el.textContent) //=>没有更新
      this.$nextTick(function(){
        console.log(this.$el.textContent) // =>更新完成
      })
    }
  }
})
```

