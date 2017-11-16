# backbone源码解读
> 原文&作者:[aircloud](https://github.com/aircloud/backboneAnalyze)

## 定义全局对象:root为全局属性

```js
var root = (typeof self == 'object' && self.self === self && self) ||
    (typeof global == 'object' && global.global === global && global);
```

self使用的是window.self 会返回window,用于前端环境,而global则是服务端node的全局属性,在这里`self`与`window`是等价的,使用`self`是为了减少字符.



## 模块化处理

> 根据加载的规范 可以看出backbone依赖JQ和underscore

```js
// 如果AMD加载模块存在 则包装成amd加载器可识别的模块
if (typeof define === 'function' && define.amd) {
  define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
    // 工厂模式
    // 包装成模块,输出到root.Backbone下
    root.Backbone = factory(root, exports, _, $);
  });
  // 没有AMD模块,则加载commonJs加载规范,封装成commonJs可识别的模块
} else if (typeof exports !== 'undefined') {
  var _ = require('underscore'),
    $;
  try {
    $ = require('jquery');
  } catch (e) {}
  // commonJs 不需要赋值吗?
  factory(root, exports, _, $);
  // 没有AMD和CMD,则最普通的方式挂载
} else {
  root.Backbone = factory(root, {}, root._, root.jQuery || root.Zepto || root.ender || root.$);
}
```



## 初始化操作

> 学习了JQ的让出所有权,用于处理冲突

```js
  // 冲突处理会用到这个变量
  var previousBackbone = root.Backbone;
  // 防止冲突变量的解决方案
  Backbone.noConflict = function(){
    root.Backbone = previousBackbone;
    return this;
  }
  //使用
  var localBackbone = Backbone.noConflict();   
  var model = localBackbone.Model.extend();
```

