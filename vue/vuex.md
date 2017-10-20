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



