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

- State (状态存储)
- Getter (类似计算属性:对状态进行计算)
- Mutation (触发状态变更:同步)
- Action()
- Module




#### **State**

##### 单一状态树

Vuex使用**单一状态树**,用一个对象就包含了全部应用层级状态,至此,它便作为一个"唯一数据源(ssot)"而存在,这也意味着,每个应用将仅仅包含一个store实例.单一状态树让我们能够直接地定位任一特定的状态片段,在调试的过程中也能轻易地取得整个当前应用状态的快照.



单状态树和模块化并不冲突--- mark



##### 在Vue组件中获得Vuex状态

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



#####`mapState` 辅助函数

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



##### 对象展开运算符

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



##### 组件仍然保有局部状态

使用vuex并不意味着你需要将**所有的**状态放入vuex,虽然将所有的状态放到Vuex会使状态变化更显示和易调试,但也会使代码变得冗长和不直观,如果有些状态严格属于单个组件,最好还是作为组件的局部状态.



#### Getter

有时候,我们需要将store 中的state作出派生状态,对它进行处理,例如对列表进行过滤并计数:

```js
computed:{
    doneTodosCount(){
        return this.$store.state.todos.filter(todo => todo.done).length
    }
}
```

如果多个组件使用到此属性,我们要么复制这个函数,或者抽取到一个共享函数然后再多处导入它---这些方法都很蠢

Vuex允许在store中定义`getter`(可以认为是store中的计算属性).就想计算属性一样,getter的返回值会根据它的依赖被缓存起来,且只有当它的依赖值发生了改变才会被重新计算.



Getter接受state作为其第一个参数:

```js
const store = new Vuex.Store({
    state:{
        todos:[
          { id: 1, text: '...', done: true },
      	  { id: 2, text: '...', done: false }
        ]
    },
  	getters : {
        doneTodos: state => {
            return state.todos.filter(todo=>todo.done)
        }
    }
})
```



然后暴露为`store.getters`对象

```js
store.getters.doneTodos //-> [{id:1,text:'...',done:true}]
```



Getter也可以接受其他getter作为第二个参数:

```js
getters:{
    //...
  	doneTodosCount:(state,getters) =>{
        return getters.doneTodos.length
    }
}

store.getters.doneTodosCount // -> 1
```



也可以通过让getter返回一个函数,来实现给getter传参(闭包?),在对store里的数组进行查询时非常有用.

```js
getters:{
    //...
  getTodoById:(state,getters)=>(id)=>{
      return state.todos.find(todo=>todo.id===id)
  }
}

store.getters.getTodoById(2) // -> {id:2,text:'...',done:false}
```



##### `mapGetters`辅助函数

`mapGetters`辅助函数仅仅将是store中的getter 映射到局部计算属性:

```js
import { mapGetters } from 'vuex'
// 在单独构建的版本中辅助函数为 Vuex.mapGetters ?
export default {
  //...
  computed:{
  	//使用对象展开运算符将getter混入computed对象中
    ...mapGetters([
        'doneTodosCount',
      	'anotherGetter',
      	//...
    ])
  }
}
```

如果想将一个getter属性另取一个名字,使用对象形式:

```js
mapGetters({
    //映射`this.doneCount` 为`store.getters.doneTodosCount`
  	doneCount:'doneTodosCount'
})
```



#### Mutation

更改Vuex的store中的状态的唯一方法就是提交mutation。Vuex中的mutation都有一个字符串的**事件类型(type)**和一个**回调函数(handler)**.这个回调函数就是我们实际进行状态更改的地方,并且它会接收state作为第一个参数:

```js
const store = new Vuex.Store({
    state: {
        count:1
    },
  	mutations:{
        increment(state){
            //变更状态
          	state.count++
        }
    }
})
```

不能直接调用一个 mutation handler(不能直接调用mutation中的回调函数),这个选项更像是事件注册:"当触发一个类型为`increment`"的mutation时,调用此函数",要唤醒一个mutation handler,需要以对应的type调用`store.commit`方法:

```js
store.commit('increment');
```



##### 提交负荷(Playload)

可以向`store.commit`传入**额外的参数**,即mutation的**载荷(playload)**:

```js
//...
mutations: {
  increment (state,n){
      state.count += n;
  }
}

store.commit('increment',10);
```

大多数情况下,载荷应该是一个对象,这样就可以包含多个字段并且记录的mutation会更易读:

```js
//...
mutations: {
    increment (state,payload){
        state.count += payload.amount
    }
}

store.commit('increment', {
  amount: 10
})
```



##### 对象风格的提交方式

提交mutation的另一种方式,直接使用包含`type`属性的对象:

```js
store.commit({
  type:'increment',
  amount:10
})
```

使用这种风格提交时,整个对象都会作为**载荷(playload)**传给mutation函数,因此handler保持不变:

```js
mutations: {
  increment (state, playload) {
      state.count += playload.amount
  }
}
```



##### Mutation 需要遵守 Vue 的响应规则

既然Vuex的store中的状态是响应式的,那么当我们变更状态时,监视状态的Vue组件也会自动更新.这也意味着Vuex中的 mutation也需要与使用Vue一样遵守一些注意事项:

1. 提前在store中初始化好所有所需要的属性

2. 当需要在对象上添加新属性时,应该:

   - 使用`Vue.set(obj, 'newProp',123)`

   - 以新对象替换老对象

     ```js
     state.obj = {...state.obj,newProp:123};
     ```





#####  使用常量替代Mutation事件类型

这样可以使 linter之类的工具发挥作用,同时把这些常量放在单独的文件中可以让代码合作者对整个app包含的mutation一目了然:

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'

// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
    state:{...},
    mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
	[SOME_MUTATION](state){
        // mutate state
    }
   }
})
```



##### Mutation必须是同步函数

原则:**Mutation必须是同步函数**

```js
mutations: {
  someMutation (state) {
      api.callAsyncMethod(()=>{
          state.count++
      })
  }
}
```

在vue-devtools的mutation日志中,每一条mutation被记录,devtools都需要捕捉到前一状态和后一状态的快照

在上面的例子中mutation中的异步函数的回调,让这一行为不可能完成:

因为当mutation触发的时候,回调函数还没被调用(因为是异步)。devtool没有办法知道回调函数什么时候真正被调用---实际上任何在回调函数中进行的状态的改变都是不可追踪的(还是要这样理解:实际上任何**异步**回调函数进行状态改变都是不可以被追踪的)

> vuex中为什么把把异步操作封装在action，把同步操作放在mutations？
>
> 尤雨溪:
>
>  区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。
>
> 事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。
>
> 异步竞态怎么处理那是用户自己的事情。
>
> vuex 真正限制你的只有 mutation 必须是同步的这一点（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。
>
> 同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。
>
> 如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。
>
> 
>
> 链接：https://www.zhihu.com/question/48759748/answer/112823337



##### 在组件中提交Mutation

可以在组件中使用`this.$store.commit('xxx')`提交mutation,或者使用`mapMutations`辅助函数将组件中的methods映射为`store.commit`调用(需要在根节点`store`).

```js
import { mapMutations } from 'vuex'

export default {
  //...
  methods:{
      ...mapMutations({
        'increment',//将this.increment()映射为this.$store.commit('increment')
        // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
      ...mapMutations({
         add: 'increment' 
        // 将 `this.add()` 映射为 `this.$store.commit('increment')`
         })
      })
  }
}
```



#####  下一步 : Action

在mutation中混合异步调用会导致程序很难调试.例如:当你能调用了两个包含异步回调的 mutation 来改变状态，你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。在 Vuex 中，**mutation 都是同步事务**：

```js
store.commit('increment')
// 任何由 "increment" 导致的状态变更都应该在此刻完成。
```



#### Action

Action 类似于 mutation,不同在于:

- Action提交的是mutation,而不是直接变更状态.
- Action可以包含任意异步操作.

```js
const stroe = new Vuex.Store({
    state: {
        count:0
    },
  	mutations: {
        increment (state) {
            state.count++
        }
    },
  	actions: {
        increment(context) {
            context.commit('increment');
        }
    }
})
```

Action 函数接受一个与store实例具有相同方法和属性的**context对象**,因此可以调用`context.commit`提交一个mutation ,或者通过`context.state`和`context.getters`来获取state和getters.

因为是**context对象**,可以用到[参数解构](https://github.com/lukehoban/es6features#destructuring)来简化代码（特别是需要调用 `commit` 很多次的时候）：

```js
actions:{
  increment({commit}){
    commit('increment');
  }
}
```



##### 分发Action

Action 通过`store.dispatch`方法触发:

```js
store.dispatch('increment');
```

与mutation的区别?

- **Mutation必须同步执行**
- **Action不受约束,可以在它内部执行异步操作**

```js
actions: {
  incrementAsync({ commit }) {
    setTimeout(()=>{
        commit('increment')
    },1000)
  }
}
```

Actions  支持同样的载荷方式(playload/传参)和对象方式进行分发:

```js
// 以载荷形式分发
store.dispatch('incrementAsync',{
    amount: 10
})

// 以对象形式分发
store.dispatch({
    type:'incrementAsync',
  	amount:10
})
```



购物车示例,涉及到**调用异步API和分发多重mutation**:

```js
actions: {
    checkout ({commit,state},products) {
        //把当前购物车的物品备份起来
      const savedCartItems = [...state.cart.added]
      // 发出结账请求,然后清空购物车
      commit(types.CHECKOUT_REQUEST)
      // 购物API接受一个成功回调和一个失败回调 ==>再去触发mutations 改变状态
      shop.buyProducts(
        products,
        //成功操作
        ()=> commit(types.CHECKOUT_SUCCESS),
        //失败操作
        ()=> commit(types.CHECKOUT_FAILURE,savedCartItems)
      )
    }
}
```



一系列的异步操作,最终都会通过提交mutation来记录action产生的副作用(状态变更).



##### 组合Action

Action 通常是异步的,那么怎么知道Action什么时候结束?如何才能组合多个action,以处理更复杂的异步流程?

首先,在`stopre.dispatch`中可以处理被触发的action的处理函数返回的Promise,并且`store.dispatch`仍旧返回Promise:

```js
actions:{
    actionA({ commit }) {
		return new Promise((resolve,reject)=>{
          setTimeout(()=>{
              commit('someMutation')
              resolve()
        	},1000)
        })
    }
}
```

现在可以使用promise

```js
store.dispatch('actionA').then(()=>{
    //....
})
```



在另一个action中也可以:

```js
actions :{
    //...
  	actionB({ dispatch, commit }){
        return dispatch('actionA').then(()=>{
            commit('someOtherMutation')
        })
    }
}
```



可以利用[async/await](https://tc39.github.io/ecmascript-asyncawait/)新特性,可以组合action:

```js
//假设 getData() 和getOtherData()返回的是promise

actions: {
  async actionA ({ commit }) {
      commit('gotData' , await getData())
  },
  async actionB ({dispatch,commit}){
      await dispatch('actionA')//等待actionA完成
      commit('gotOtherData', await getOhterData())
  }
}
```

> 一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。



自己的理解:

因为需要在 devTools追踪到状态的变化,而在mutation中,执行异步的话,当mutation完成时,异步可能还没完成,这时候,就无法追踪到状态的变化了.

这时需要Action,因为在Aciton中,等于完成异步操作后,再进行一个mutation,再进行状态的变化,使状态的变化是处于可追踪的状态.



`store.dispatch`==>进行异步操作==>最后在action中触发`commit`(触发mutation进行状态变更)==>使devTools可跟踪到状态的变化



#### Module

由于使用的是单一状态树,应用的所有状态会集中到一个比较大的对象,当应用变得非常复杂时,store对象就有可能变得相当臃肿.

为了解决这个问题,需要将store分割成**模块( module )**.每个模块拥有自己的state,mutation,action,getter甚至是嵌套的字母快---从上往下进行同样方式进行分割:

```js
const moduleA = {
  state:{...},
  mutations:{...},
  actions:{...},
  getters:{...}
}

const moduleB={
  state:{...},
  mutations:{...},
  actions:{...},
  getters:{...}
}

const store = new Vuex.Store({
  modules:{
           a:moduleA,
           b:moduleB
          }       
})
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```



##### 模块的局部状态

对于模块内部的mutation和getter,接收第一个参数是**模块的局部状态对象**

```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment(state) {
      //这里的'state'是局部模块局部的状态--->就是moduleA.state
      state.count++;
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  }
};
```

对于模块内部的action,局部状态通过`context.state`暴露出来,根节点状态则为`context.rootState`:

```js
const moduleA = {
  // ...
  getters: {
    //第三个参数为根节点的状态
    sumWithRootCount(state, getters, rootState) {
      return state.count + rootState.count;
    }
  }
};
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```



##### 命名空间

默认情况下,模块内部的action,mutation和getter是注册在**全局命名空间**的--这样使得多个模块能够对同一mutation或者action作出相应.

如果希望模块具有更高的封装度和复用性,可以通过添加`namespaced:true`的方式使其成为命名空间.当模块注册后,它的所有getter,action及mutation都会自动根据模块注册的路径调整命名:

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      //模块内容(module,assets)
      state: {
        /* some code */
      }, //模块内状态已经是嵌套的,使用`namespaced`属性不会对其产生印象
      getters: {
        isAdmin() {
          /*some code*/
        } //-> getters['account/isAdmin']
      },
      actions: {
        login() {
          /* some code */
        } //-> dispatch('account/login')
      },
      mutations: {
        login() {
          /* some code */
        } //-> commit('account/login')
      },

      //嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: {
            /* some code */
          },
          getters: {
            profile() {
              /* some code */
            } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          //使用命名空间
          namespaced: true,

          state: {
            /* some code */
          },
          getters: {
            popular() {
              /* some code */
            } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
});
```



##### 在命名空间模块内访问全局内容（Global Assets）

想要使用全局的state和getter,`rootState`和`rootGetter`会作为第三和第四参数传入getter,也可以通过`context`对象的属性传入action.

若需要在全局命名空间内分发action或提交mutation,将`{ root:true }`作为第三参数传给`dispatch`或`commit`(就是传入这个属性以访问根dispatch或commit)

```js
 modules : {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的getter中,getters被局部化了
      // 可以使用getter的第四个参数来调用`rootGetters`
      someGetter(state, getters, rootState, rootGetters) {
        getters.someOtherGetter; // -> 'foo/someOtherGetter' 访问局部
        rootGetters.someOtherGetter; // -> 'someOtherGetter' 访问根节点
      },
      someOtherGetter: state => {
        /* some code */
      }
    },

    actions: {
      // 在这个模块中, dispatch 和commit 也被局部化了
      // 可以接受{root:true} 属性作为第三个属性,以便用来访问根的dispatch或commit
      someAction({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter; // -> 'foo/someGetter'
        rootGetters.someGetter; // -> 'someGetter'

        dispatch('someOtherAction'); // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }); // -> 'someOtherAction' 第三个参数 以便用来访问根的dispatch

        commit('someMutation'); // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }); // -> 'someMutation'第三个参数 以便用来访问根的commit
      }
    },
    someOtherAction (ctx, payload) { /*some code*/ }
  }
};
```



##### 带命名空间的绑定函数

使用`mapState`,`mapGetters`, `mapActions` 和 `mapMutations`函数来绑定命名空间模块时比较繁琐,

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo',
    'some/nested/module/bar'
  ])
}
```

对于这种情况,可以将namespaced的名称字符串作为第一个参数传递给函数,这样做所有绑定都会自动将该模块作为上下文.

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo',
    'bar'
  ])
}
```

还可以使用`createNamespacedHelpers`创建基于某个命名空间辅助函数.它返回一个对象,对象里有新的绑定在给定命名空间值上的组件绑定辅助函数:

```js
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module');

export default {
  computed: {
    // 在some/nested/module中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions(['foo', 'bar'])
  }
};
```



##### 给插件开发者的注意事项

如果你开发的[插件（Plugin）](https://vuex.vuejs.org/zh-cn/plugins.html)提供了模块并允许用户将其添加到 Vuex store，可能需要考虑模块的空间名称问题。对于这种情况，你可以通过插件的参数对象来允许用户指定空间名称：

```js
// 通过插件的参数对象得到空间名称
// 然后返回 Vuex 插件函数
export function createPlugin (options = {}) {
  return function (store) {
    // 把空间名字添加到插件模块的类型（type）中去
    const namespace = options.namespace || ''
    store.dispatch(namespace + 'pluginAction')
  }
}
```



##### 模块动态注册

在store创建**之后**,可以使用`store.registerModule`方法注册模块:

```js
//注册模块 mymodule
store.registerModule('myModule', {
  //...
});

//注册嵌套模块 nested/myModule
store.registerModule(['nested', 'myModule'], {
  //...
});

```

之后就可以通过 `store.state.myModule` 和 `store.state.nested.myModule` 访问模块的状态。

模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如，[`vuex-router-sync`](https://github.com/vuejs/vuex-router-sync) 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。

你也可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。



##### 模块重用

需要将一个模块多次复用,或者多个实例

- 创建多个 store，他们公用同一个模块 (例如当 `runInNewContext` 选项是 `false` 或 `'once'` 时，为了[在服务端渲染中避免有状态的单例](https://ssr.vuejs.org/en/structure.html#avoid-stateful-singletons))
- 在一个 store 中多次注册同一个模块

如果使用一个纯对象来声明模块的状态,那么在这个状态对象会通过引用被共享,导致状态对象被修改时store或模块间数据互相污染的问题.

实际上这和 Vue 组件内的 `data` 是同样的问题。因此解决办法也是相同的——使用一个函数来声明模块状态(return一个对象)（仅 2.3.0+ 支持）：

```js
const MyReusableModule = {
  state () {
    return {
      foo: 'bar'
    }
  },
  // mutation, action 和 getter 等等...
}
```



在module中,如果一个模块要多次复用的话,那么他的state啊mutation啊都是公用的,(因为是引用类型),那么为了避免这种状况,就每一次return一个新的对象,在内存中开辟一个新的空间