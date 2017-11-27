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

1. 存起冲突的Backbone(就是其他插件使用了backbone的名字)ps:应该基本上没有吧...
2. `noConflict`方法,将`this. Backbone`释放给冲突的插件,然后将自身的`Backbone`return, 这里的this是函数的调用者.
3. 使用的时候,用变量将this(Backbone)接收就好了.



## addMethod &&addUnderscoreMethods  将Underscore的方法,加入到类中

### addMethod

```js
/**
 * underscore中有一个比较好的设计,传参个数相同的话,每一个参数的意义(在不同的函数中)都是相同的
 * 第一个参数一定代表目标对象
 * 第二个参数一定代表作用函数(有的函数可能只有一个参数)
 * 在有三个参数的情况下，第三个参数代表上下文this
 * 另外如果有第四个参数，第三个参数代表初始值或者默认值，第四个参数代表上下文this。
 */

var addMethod = function(length, method, attribute) {
  /**
   * addMethod 是将underscore方法返回
   * length为传参个数,method为具体的方法名字,attribute为目标对象
   */

  switch (length) {
    case 1:
      return function() {
        return _[method](this[attribute]);
      };
    case 2:
      return function(value) {
        return _[method](this[attribute], value);
      };
    case 3:
      return function(iteratee, context) {
        return _[method](this[attribute], cb(iteratee, this), context);
      };
    case 4:
      return function(iteratee, defaultVal, context) {
        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
      };
    // length不在这里面的情况下
    default:
      return function() {
        var args = slice.call(arguments);
        args.unshift(this[attribute]);
        return _[method].apply(_, args);
      };
  }
};
```

### addUnderscoreMethods

```js
var addUnderscoreMethods = function(Class, methods, attribute) {
  /**
   * 将方法列表,添加到目标(Class)的原型链上
   * methods是一个对象集,key为方法名,value为参数个数
   */

  _.each(methods, function(length, method) {
    if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
  });
};
```

使用:

```js
var modelMethods = {keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
      omit: 0, chain: 1, isEmpty: 1};
//混入一些underscore中常用的方法
addUnderscoreMethods(Model, modelMethods, 'attributes');
```



##  cb

```js
/**
 * underscore中迭代器要求都是函数,而cb就是处理非函数的情况
 * 例如:`collection.sortBy('attr')` 或者 `collection.findWhere({id: 1})` 这种调用方式.
 * 这里就像一个适配器,将非函数转化为函数,使其满足underscore迭代器要求
 */ 
//  iteratee为参数,instance为this?
var cb = function(iteratee,instance){
  if (_.isFunction(iteratee)) return iteratee;
  // 如果是一个对象,并且在model的原型链中没有这个对象
  if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
  // 如果是String类型,返回model.attribute[iteratee] 就是model的attribute当中的方法?
  if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
  // 都不是的话则返回他
  return iteratee;
}
// _.matches 返回一个断言函数 这个函数会给你一个断言 可以用来辨别 给定的对象是否匹配attrs指定键/值属性。
var modelMatcher = function(attrs) {
  var matcher = _.matches(attrs);
  return function(model) {
    // model.attributes是否匹配attrs?
    return matcher(model.attributes);
  };
};
```



## Backbone.Events

Backbone的Events实际上就是一个观察者模式(发布订阅模式)的实现,并且巧妙的是,还可以作为mixin混入到自己写的object中



backbone的Events是一个对象,其中的方法(on\listenTo\off\stopListening\once\listenToOnce\trigger)都是对象方法.

总体上,backbone的Events实现了监听/触发/解除对自己对象本身的事件,也可以让一个对象监听/解除监听另一个对象的事件