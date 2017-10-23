# Vuex笔记

[官方文档](https://vuex.vuejs.org/zh-cn/)



## Vuex是什么?

Vuex 是一个专为Vue.js应用程序开发的**状态管理模式**,采用集中式存储管理应用的所有组件状态,并以相应的规则保证状态以一种可预测的方式发生变化.Vuex也集成到Vue官方调试工具[vue-devtool](https://github.com/vuejs/vue-devtools)中,提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。



### 什么是"状态管理模式"?

一个简单的vue技术应用就包含了--state,view,actions

```js
new Vue({
    //state
  data(){
      return {
          count:0
      }
  },
  //view
  template:`
	<div>{{ count }}</div>
	`,
  // actions
  methods:{
      increment(){
          this.count++
      }
  }
})
```

状态自管理应用包含以下几个部分:

- state : 驱动应用的数据源;
- view  :  以声明方式将**state**映射到视图;
- actions,响应在**view**上的用户输入导致的状态变化



**单向数据流**



![单向数据流](https://vuex.vuejs.org/zh-cn/images/flow.png)

但当我们的应用遇到**多个组件共享状态**时,单向数据流的简洁性很容易被破坏:

- 多个视图依赖同一状态
- 来自不同视图的行为需要变更同一状态.



问题一:

传参的方法对于多层嵌套的组件将会非常繁琐,并且对于兄弟组件间的状态传递无能为力.

问题二:

经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝

以上的这些模式都很脆弱,导致代码无法维护.



所以,需要把组件的共享状态抽取出来,以一个全局单例模式管理.在这种模式下,组建树构成一个巨大的"视图",不管在树的哪个位置,任何组件都能获取状态或者触发行为!

另外,通过定义和隔离状态管理中的各种概念并强制遵守一定的规则,代码将会变得更结构化且易维护.

Vuex是专门为vue.js设计的状态管理库,利用vue.js的细粒度数据响应机制来进行高效的状态更新.

![](https://vuex.vuejs.org/zh-cn/images/vuex.png)





### 什么情况下应该使用Vuex?

Vuex 可以帮助我们管理共享状态,但也附带了更多的概念和框架.这需要对短期和长期效益进行权衡.

- 如果不打算开发大型单页应用,vuex会显得繁琐冗余.
- 一个简单的 [global event bus](https://cn.vuejs.org/v2/guide/components.html#非父子组件通信) 就足够所需了.
- 如果需要构建一个中大型单页应用,需要考虑如何更好的在组建外部管理状态,vuex将会成为自然而然的选择




### 开始

Vuex应用的核心就是store(仓库)."store"基本上就是一个容器,它包含着应用中大部分的**状态(state)**。 Vuex和单纯的全局对象有以下两点不同:

1. Vuex的状态存储是响应式的.当Vue组件从store中读取状态的时候,若store中的状态发生变化,那么相应的组件也会相应地得到高效更新.
2. 不能直接改变store中的状态.改变store中的状态的唯一途径就是显示**提交(commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。



#### 最简单的Store

安装Vuex之后,让我们创建一个store.创建过程直接了当,仅需要提供一个初始state对象和一些mutation:

```js
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

const stroe = new Vuex.Store({
    state:{
        count:0
    },
  	mutations:{
        increment(state){
            state.count++
        }
    }
})
```

现在,可以通过`store.state`来获取状态对象,以及通过`store.commit`方法触发状态变更:

```js
store.commit('increment')

console.log(store.state.count) // -> 1
```

我们要通过提交`mutation`的方式,而非直接改变`store.state.count`,是因为我们想要更明确地追踪到状态的变化.这个简单的约定能够让意图更加明显,这样,在阅读代码的时候,能更容易地解读应用内部的状态改变.此外,这样也让我们有机会去实现一些能记录每次状态改变,保存状态快照的调试工具.有了它,我们甚至可以实现如时间穿梭般的调试体验.

由于 store 中的状态是响应式的,在组件中调用store中的状态简单到仅需要在计算属性中返回即可.触发变化也仅需在组件中的methods中提交mutation.



### 核心概念

- State
- Getter
- Mutation
- Action
- Module



#### 单一状态树

Vuex使用**单一状态树**,用一个对象就包含了全部应用层级状态,至此,它便作为一个"唯一数据源(ssot)"而存在,这也意味着,每个应用将仅仅包含一个store实例.单一状态树让我们能够直接地定位任一特定的状态片段,在调试的过程中也能轻易地取得整个当前应用状态的快照.



单状态树和模块化并不冲突--- mark



#### 在Vue组件中获得Vuex状态

由于Vuex的状态存储是响应式的,从store实例中读取状态最简单的方式就是在**计算属性(computed)**中返回某个状态:

```js
//创建一个 Counter 组件
const Counter = {
    template:`<div> {{ count }} </div>`,
  	computed: {
        count(){
            return store.state.count
        }
    }
}
```

每当`store.state.count`变化的时候,都会重新求取计算属性,并且触发更新相关联的DOM.

然而,这种模式导致组件依赖全局状态单例,在模块化的构建系统中,在每个需要使用state的组件中需要频繁地导入,并且在测试组件时需要模拟状态.



Vuex通过`store`选项,提供了一种机制将状态从根组件"注入"到每个子组件中

```js
const app = new Vue({
  el:'#app',
  // 把store 对象提供给"store"选项,这可以把store的实例注入所有的子组件中
  store,
  components:{ Counter },
  template:`
	<div class="app">
		<counter></counter>
	</div>
	`
})
```

通过在根实例中注册`store`选项,该store实例会注入到根组件下的所有子组件中,且子组件能通过`this.$store`访问到。

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
      count() {
          return this.$store.state.count
      }
  }
}
```



#### `mapState` 辅助函数

当一个组件需要获取多个状态时,将这些状态都声明为计算属性会有些重复和冗余,为了解决这个问题,可以使用`mapState`辅助函数生成计算属性:

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  //...
  computed:mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,
      
      // 传字符串参数 'count' 等同于 `sate => state.count`
      countAlias:'count',
    
     // 为了能够使用`this` 获取局部状态,必须使用常规函数
      countPlusLocalState (state) {
          return state.count + this.localCount
      }
  })
}
```

当映射的计算属性的名称与state的子节点名称相同时,我们也可以给`mapState`传一个字符串数组.

```js
computed : mapState([
    // 映射 this.count 为 store.state.count
  'count'
])
```



#### 对象展开运算符

`mapState`函数返回的是一个对象.如何将它与局部计算属性混合使用呢? 通常我们需要一个工具函数将多个对象合并为一个,以使我们可以最终对象传给computed属性.但是自从有了[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread),可以极大地简化写法:

```js
computed:{
  localComputed(){ /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
      //...
  })
}
```



#### 组件仍然保有局部状态

使用vuex并不意味着你需要将**所有的**状态放入vuex,虽然将所有的状态放到Vuex会使状态变化更显示和易调试,但也会使代码变得冗长和不直观,如果有些状态严格属于单个组件,最好还是作为组件的局部状态.