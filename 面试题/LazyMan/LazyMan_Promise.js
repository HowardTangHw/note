// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!
//
// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~
//
// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~
//
// LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
//
// 以此类推。

/******************************************************************/
/*                           Promise                              */
function _LazyMan(name) {
  this.promiseGetters = [];
  var makePromise = function() {
    var promiseObj = new Promise((resolve, reject) => {
      console.log('HI!This is' + name + '!');
      resolve();
    });
    return promiseObj;
  };
  this.promiseGetters.push(makePromise);

  // 在各个Promis的then函数中,将任务序列串联起来
  // 就是自动执行,一个执行完之后再执行下一个
  var self = this;
  // 默认第一个已经resolve了
  var sequence = Promise.resolve();

  // 利用事件循环机制
  // 作用就是等到当前列表的任务都挂载到promiseGetters时再执行
  setTimeout(() => {
    for (let i = 0, len = self.promiseGetters.length; i < len; i++) {
      // 现在要执行的任务(这里应该存放的是一个返回Promise对象的函数)
      let newPromiseGetter = self.promiseGetters[i];
      // 原作者这里加多层外壳,是为了处理for循环的bug(引用类型)----后来发现这里是var 的问题,把后续的var改为let就OK了,
      // 其实只要将var 改let就好了吧
      //   var thenFunc = (function (newPromiseGetter) {
      //     return function  () {
      //         return newPromiseGetter()
      //     }
      // })(newPromiseGetter);
      let thenFunc = function() {
        return newPromiseGetter();
      };
      // 就是这里, 后面的sequence是前一个promise对象,然后将后一个要执行的任务放进去,最后将返回promise替换
      sequence = sequence.then(thenFunc);
    }
  }, 0);
}

_LazyMan.prototype.eat = function(name) {
  var makePromise = function() {
    var promiseObj = new Promise((resolve, reject) => {
      console.log('Eat' + name + '~~');
      resolve();
    });
  };
  this.promiseGetters.push(makePromise);
  return this; //链式调用
};

_LazyMan.prototype.sleep = function(time) {
  var makePromise = function() {
    var promiseObj = new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log('Wake up after ' + time + 's!');
        resolve();
      }, time * 1000);
    });

    return promiseObj;
  };

  this.promiseGetters.push(makePromise);

  return this;
};

/* 封装 */

function LazyMan(name) {
  return new _LazyMan(name);
}

LazyMan('Hank')
  .sleep(1)
  .eat('dinner');

/******************************************************************/
