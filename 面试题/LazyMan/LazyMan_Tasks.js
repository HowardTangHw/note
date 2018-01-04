/*
* 普通的队列机制 关键的函数的next
* 如果有sleepFirst  则改push为unshift就好了
* 这里运用的是队列,先进先出
*/

function _LazyMan(name) {
  this.tasks = [];
  var self = this;
  var fn = function() {
    console.log('Hi! This is ' + name + '!');
    self.next();
  };
  this.tasks.push(fn);
  setTimeout(function() {
    self.next();
  }, 0); // 在下一个事件循环启动任务
}
/* 事件调度函数 */
_LazyMan.prototype.next = function() {
  var fn = this.tasks.shift();
  fn && fn();
};
_LazyMan.prototype.eat = function(name) {
  var self = this;
  var fn = function() {
    console.log('Eat ' + name + '~');
    self.next();
  };
  this.tasks.push(fn);
  return this; // 实现链式调用
};
_LazyMan.prototype.sleep = function(time) {
  var self = this;
  var fn = function() {
    setTimeout(function() {
      console.log('Wake up after ' + time + 's!');
      self.next();
    }, time * 1000);
  };
  this.tasks.push(fn);
  return this;
};
/* 封装 */
function LazyMan(name) {
  return new _LazyMan(name);
}
LazyMan('Hank')
  .sleep(1)
  .eat('dinner');
