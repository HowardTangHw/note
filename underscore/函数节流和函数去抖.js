const _ = require("./underscore");
// 函数去抖(debounce) 函数去抖就是对于一定时间段的连续的函数调用，只让其执行一次。
// 如果用手指一直按住一个弹簧，它将不会弹起直到你松手为止。
// 也就是说当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。

/**
* 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
* @param idle   {number}    空闲时间，单位毫秒
* @param fn {function}  请求关联函数，实际应用需要调用的函数
* @return {function}    返回客户调用函数
*/

var debounce = function(fn, idle) {
  var last = null;
  return function() {
    var _this = this,
      args = arguments;
    clearTimeout(last);
    last = setTimeout(function() {
      fn.call(_this, args);
    }, idle);
  };
};
function print() {
  console.log("hello world");
}

window.onscroll = debounce(print, 300);

// 函数节流(throttle) 让一个函数不要执行得太频繁，减少一些过快的调用来节流。
/**
 * 如果将水龙头拧紧直到水是以水滴的形式流出，那你会发现每隔一段时间，就会有一滴水流出。
 * 也就是会说预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期。
 */

/**
* 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
* @param delay  {number}    延迟时间，单位毫秒
* @param fn {function}  请求关联函数，实际应用需要调用的函数
* @return {function}    返回客户调用函数
*/
var throttle = function(fn, delay) {
  var last = 0;
  return function() {
    var _this = this,
      args = arguments,
      cur = +new Date();

    if (cur - last > delay) {
      fn.apply(_this, args);
      last = cur;
    }
  };
};

// 函数去抖 函数去抖就是对于一定时间段的连续的函数调用，只让其执行一次。(第一次)
// sample 1: _.debounce(function(){}, 1000)
// 连续事件结束后的 1000ms 后触发
// sample 1: _.debounce(function(){}, 1000, true)
// 连续事件触发后立即触发（此时会忽略第二个参数）
// https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/underscore-1.8.3-analysis.js#L1655

/**
 * 在内部其实就是执行了later later执行后timeou和 context和args的引用都会被清空
 * 这样就可以重新触发下一次事件了.
 * 第一次进来,如果imeediate不是true,则进入了第一次timeout = setTimeout(later, wait);
 * later执行时,判断是否够时间了,不够时间则进入第一个分支,递归自己一下,
 * 到时间后,则timeout和context,args解除引用,并且执行方法.
 * 多次触发的时候,会不断刷新timestamp,那么last也会不断改变
 * 只有当last>=wait的时候,才会触发事件.
 */
_.debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    // 外面的timestamp是点击时候的_.now
    // 这里的last是触发later时间时的_.now
    // 判断两者之间的间距(就是点击事件和触发事件两者的时间差),从而判断是否满足wait执行事件
    // 多次点击时,会刷新timestamp,也会令last重新计算,从新获取now-timestamp;
    var last = _.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function() {
    context = this;
    args = arguments;

    timestamp = _.now();
    //后面会重新设置timeout  所以callNow 只有在immeditae为true 和第一次进来的时候触发
    // 即(timeout还未被重新定义)
    var callNow = immediate && !timeout;
    if (!timeout)
      // 设置了 timeout，所以以后不会进入这个 if 分支了
      timeout = setTimeout(later, wait);

    // 如果是立即触发
    if (callNow) {
      // func 可能是有返回值的
      result = func.apply(context, args);
      // 解除引用
      context = args = null;
    }

    return result;
  };
};

//underscore _.throttle 函数
// 函数节流（如果有连续事件响应，则每间隔一定时间段触发）
// 每间隔 wait(Number) milliseconds 触发一次 func 方法
// 如果 options 参数传入 {leading: false}
// 那么不会马上触发（等待 wait milliseconds 后第一次触发 func）
// 如果 options 参数传入 {trailing: false}
// 那么最后一次回调不会被触发
// **Notice: options 不能同时设置 leading 和 trailing 为 false**
// https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/underscore-1.8.3-analysis.js#L1560
var throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);

    if (!timeout) context = args = null;
  };

  return function() {
    var now = _.now();
    //   只有第一次进来 并且 options.leading ===fasle才会起作用
    if (!previous && options.leading === false) previous = now;

    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;

      result = func.apply(context, args);

      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
