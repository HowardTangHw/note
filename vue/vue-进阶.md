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
## 过渡效果

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

> 列表的位移过渡

- `<transition-group>`组件还有一个特殊的地方.不仅可以进入和离开动画,还可以改变定位.这个功能需要用到`v-move`**特性**,它会在元素的改变定位的过程中应用,和之前的类名一样,可以通过`name`属性来自定义前缀,也可以通过`move-class`属性手动设置.

-`v-move`对于设置过渡的切换时机和过渡曲线非常有用
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

- 结合之前实现的例子和这个技术结合,就能修复`其他的数字会瞬移到新布局的位置`的bug了

