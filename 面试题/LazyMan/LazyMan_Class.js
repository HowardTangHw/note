/**
 * 利用下Class ,async,await封装下LazyMan_Promise
 */
class _LazyMan {
  constructor(name) {
    this.Getters = [];
    let getter = this.makePromise(function() {
      console.log('HI!This is' + name + '!');
    });
    this.Getters.push(getter);

    // 执行任务
    var self = this;
    // 默认第一个已经resolve了
    var sequence = Promise.resolve();
    // 利用事件循环机制
    // 作用就是等到当前列表的任务都挂载到Getters时再执行
    setTimeout(() => {
      for (let i = 0, len = self.Getters.length; i < len; i++) {
        // 现在要执行的任务(这里应该存放的是一个返回Promise对象的函数)
        let newPromiseGetter = self.Getters[i];
        let thenFunc = function() {
          return newPromiseGetter();
        };
        // 就是这里, 后面的sequence是前一个promise对象,然后将后一个要执行的任务放进去,最后将返回promise替换
        sequence = sequence.then(thenFunc);
      }
    }, 0);
  }
  // 抽离出makePromise
  makePromise(fn, time = 0) {
    return async function(params) {
      let PromiseObj = new Promise((resolve, reject) => {
        setTimeout(() => {
          fn();
          resolve();
        }, time * 1000);
      });
      return await PromiseObj;
    };
  }

  eat(name) {
    let getter = this.makePromise(function() {
      console.log('Eat' + name + '~~');
    });
    this.Getters.push(getter);
    return this; //链式调用
  }

  sleep(time) {
    let getter = this.makePromise(function() {
      console.log('Wake up after ' + time + 's!');
    }, time);
    this.Getters.push(getter);
    return this; //链式调用
  }
}

function LazyMan(params) {
  return new _LazyMan(params);
}
LazyMan('Hank')
  .sleep(1)
  .eat('dinner');
