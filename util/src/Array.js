/**
 * Array
 * link:https://github.com/Chalarangelo/30-seconds-of-code#-array-1
 */

/**
 * chunk-将数组分割开相应大小的小数组
 * Arry.from(arrayLink,(mapFn),(thisArg))
 * arrayLike:想要转换成数组的伪数组对象或可迭代对象。
 * mapFn (可选参数):如果指定了该参数，新数组中的每个元素会执行该回调函数。
 * thisArg (可选参数):可选参数，执行回调函数 mapFn 时 this 对象
 * Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg)
 * */
const chunk = (arr, size) =>
  Array.from(
    {
      // 转为长度为 数组长度/分割大小 (向上取整)
      length: Math.ceil(arr.length / size)
    },
    (v, i) => arr.slice(i * size, i * size + size)
  );
