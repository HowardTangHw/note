/**
 * https://github.com/hanzichi/underscore-analysis/issues/23
 */

// 斐波那契数列
"use strict";
var N = 10;
let fibonacciNumber = [];

for (let i = 0; i < N; i++) {
  if (i < 2) fibonacciNumber[i] = i;
  else fibonacciNumber[i] = fibonacciNumber[i - 2] + fibonacciNumber[i - 1];
}
console.log(fibonacciNumber);
//如果给定范围,这无疑是最好的方法.

//我们考虑每次独立求解
function fibonacci(n) {
  return n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1);
}

//可是这样算,就会每次都会有大量的重复的递归调用,我们可以利用闭包,缓存中间的运算结果,提升运算效率
let fibonacci = (function() {
  //缓存过程中计算结果
  let cache = {};
  return function(n) {
    //没有被计算过
    if (!cache[n]) cache[n] = n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1);
    return cache[n];
  };
})();

//单独将缓存机制独立出一个函数
let memoize = function(func){
  let cache={};
  return function(key){
    if(!cache[key])
      cache[key]=func.apply(this,arguments);
    return cache[key];
  }
}

let fibonacci = memoize(function(n) {
  return n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1);
});


//underscore
// Memoize an expensive function by storing its results.
//「记忆化」，存储中间运算结果，提高效率
// 参数 hasher 是个 function，用来计算 key
// 如果传入了 hasher，则用 hasher 来计算 key
// 否则用 key 参数直接当 key（即 memoize 方法传入的第一个参数）
// _.memoize(function, [hashFunction])
// 适用于需要大量重复求值的场景
// 比如递归求解菲波那切数
// @http://www.jameskrob.com/memoize.html
// create hash for storing "expensive" function outputs
// run expensive function
// check whether function has already been run with given arguments via hash lookup
// if false - run function, and store output in hash
// if true, return output stored in hash
_.memoize = function(func, hasher) {

  // cache 对象被当做 key-value 键值对缓存中间运算结果
  memoize.cache = {};

  var memoize = function(key) {
    // 储存变量，方便使用
    var cache = memoize.cache;

    // 求 key
    // 如果传入了 hasher，则用 hasher 函数来计算 key
    // 否则用 参数 key（即 memoize 方法传入的第一个参数）当 key
    var address = '' + (hasher ? hasher.apply(this, arguments) : key);

    // 如果这个 key 还没被 hash 过（还没求过值）
    if (!_.has(cache, address))
      cache[address] = func.apply(this, arguments);

    // 返回
    return cache[address];
  };
  // 返回一个函数（经典闭包）
  return memoize;
};