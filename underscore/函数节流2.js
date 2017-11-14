/**
 * @desc   函数节流。
 * 适用于限制`resize`和`scroll`等函数的调用频率
 *link:https://github.com/proYang/outils/blob/master/src/function/throttle.js
 * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}   noTrailing     可选，默认为false。
 *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
 *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
 *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
 * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                    执行去节流功能时，调用`callback`。
 * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
 *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
 *
 * @return {Function}  新的节流函数
 */

function throttle(delay, noTrailing, callback, debounceMode) {
  // 计数器
  var timeoutID;

  //  最后执行任务的时间,用于判断是否够时间了.满足时间才会开始新一个任务
  var lastExec = 0;

  //'noTrailing'默认为false
  if (typeof noTrailing !== 'boolean') {
    // 因为空了个位置,要填回来(noTrailing空了)
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  //`wrapper`函数封装了所有的 节流/去抖函数
  // debounceMode填没填 是用来判断是不是去抖模式
  // debounceMode为去抖模式,如果为true则是执行一次,要够时间后(等待clearTimout),清除了计数器后,再调用wrapper就立即执行
  // 如果为false 则是一直刷新计数器,要等待最后那次触发后delay秒才能exec()
  function wrapper() {
    var self = this;

    // 时间差 ,用于节流模式的,节流模式下debounceMode 为undefined;
    // 多次触发时,看是不是够时间了,够时间则执行以下callback
    var elapsed = Number(new Data()) - lastExec;
    var args = arguments;

    // 回调执行并且 更新最后执行实现
    function exec() {
      lastExec = Number(new Date());
      callback.apply(self, args);
    }

    // debounceMode为去抖模式,如果为true则是执行一次,
    // 要够时间后(等待clear()),清除了计数器后,再调用wrapper就立即执行exec();
    function clear() {
      //清空他, 只有清空了 才能进入下面那步
      timeoutID = undefined;
    }

    // 当debounceMode 且 timeoutID 已经被undefined了 才能回执行
    if (debounceMode && !timeoutID) {
      exec();
    }

    // 多次调用时,把计数器清掉,下面再开
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    // 这里是节流模式,没填debounceMode并且时间差大于延时(已经超时了!),这里也是noTrailing==true时,
    if (debounceMode === undefined && elapsed > delay) {
      // 立即执行
      exec();
      // noTrailing 没填或者为false,时,就是要开启计数器了,
    } else if (noTrailing !== true) {
      //开启计时器,
      // 首先判断去抖模式,如果去抖模式是true,则要delay秒后清掉计时器,
      // 即在delay秒内,都不能执行了,要等到计时器清掉才可以,
      // 如果去抖模式没填或者为false,则返回回调,
      // 如果去抖函数没填,则返回剩余的时间(节流),否则则传delay(去抖);
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      );
    }
  }

  //返回函数
  return wrapper;
}

//正确使用
//节流模式
throttle(300, fn);

//去抖
function debounce(delay, cb) {
  return throttle(delay, cb, false);
}
