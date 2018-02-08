/**
 * Array
 * link:https://github.com/Chalarangelo/30-seconds-of-code#-array-1
 */

/**
 * chunk-将数组分割开相应大小的小数组
 * Arry.from(arrayLink[,mapFn,thisArg])
 *    arrayLike:想要转换成数组的伪数组对象或可迭代对象。
 *    mapFn (可选参数):如果指定了该参数，新数组中的每个元素会执行该回调函数。
 *    thisArg (可选参数):可选参数，执行回调函数 mapFn 时 this 对象
 *    Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg)
 * */

const chunk = (arr, size) =>
  Array.from(
    {
      // 转为长度为 数组长度/分割大小 (向上取整)
      length: Math.ceil(arr.length / size)
    },
    // 分割
    (v, i) => arr.slice(i * size, i * size + size)
  );

/**
 * comp
 * 移除假值
 * 使用filter去除out falsey值(false,null,0,"",undefined,NaN)
 * Array.filter(callback[, thisArg])
 *    callback:用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。返回true表示保留该元素（通过测试），false则不保留。
 *    thisArg (可选参数):执行 callback 时的用于 this 的值。
 * */

const compact = arr => arr.filter(Boolean);

/**
 * countBy
 * 根据输入的fn,对数组排列
 * 数组首先利用map,进行fn的处理,
 * 如果fn是函数,则进行函数的处理(Math.floor),如果不是,则是属性名( property name) 例子:'length',
 * 然后再通过reduce分类,并且转换为对象(传入initialvalue,作为第一个参数)。
 * 引入传入了initialvalue,reduce第一次执行的时候,acc为initialValue
 * arr.reduce(callback[, initialValue])
 *    callback：执行数组中每个值的函数，包含四个参数：
 *        accumulator：累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue。
 *        currentValue：数组中正在处理的元素。
 *        currentIndex：数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。
 *        array：调用reduce的数组
 *    initialValue (可选参数):[可选] 用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
 * */

const countBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

/**
 * countOccurrences
 * 统计事件,在输入的数组中,target出现的次数,
 * 这里要输入initialvalue初始化acc,否则他将会从数组第一个数开始累加
 * 例如:[3,2,4],第一次返回的acc则为3,或者3+1
 * */

const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);

/**
 * deepFlatten
 * 递归拆分数组:将多维的数组利用递归拆分为一维的
 * */

const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

/**
 * difference
 * 利用Set和Filter 返回a数组有,b数组没有的数据
 * */

const difference = (a, b) => {
  let set = new Set(b);
  return a.filter(v => !set.has(v));
};

/**
 * differenceBy
 * 对比两个经过fn处理的数组,对比之间的差异,返回a有b没有的数据
 * 返回的是未经过fn处理的数据.
 */

const differenceBy = (a, b, fn) => {
  let set = new Set(b.map(v => fn(v)));
  return a.filter(v => !set.has(fn(v)));
};

/**
 * differenceWith
 * 返回arr 与val中,不通过对比函数(comp)的数
 * Example:
 *          differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)); // [1, 1.2]
 */

const differenceWith = (arr, val, comp) => arr.filter(a => val.findIndex(b => comp(a, b)) === -1);

/**
 * drop
 * 切割字符串,第二个参数作为索引(默认为1)开始切割到数组最后一个元素
 * 包括开始索引的元素
 * 如果入参大于数组长度,则返回一个空的数组
 */

const drop = (arr, n = 1) => arr.slice(n);

/**
 * dropRight
 * 和上面一样,切割字符串,不过是从数组的末尾开始
 * 默认值为1
 * */

const dropRight = (arr, n = 1) => arr.slice(0, -n);

/**
 * dropWhile
 * 从数组第一个元素开始删除元素,直到函数返回的是true
 * 返回剩余的函数
 * */

const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(0);
  return arr;
};

/**
 * dropRightWhile
 * 从数组最后一个元素开始删除元素,直到函数返回的是true
 * 返回剩余的数组
 * */

const dropRightWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1);
  return arr;
};

/**
 * everyNth
 * 将数组n倍数个抽出来
 * 因为filter的index 从0开始,所以需要特别的处理
 * 个人认为(i+1) % nth===0更好理解?也不知道有没有bug....
 * */

// const everyNth = (arr, nth) => arr.filter((e, i) => (i + 1) % nth === 0);
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

/**
 * filterNonUnique
 * 返回在数组中只出现一次的数
 * */

const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

/**
 * findLastIndex
 * 返回最后一个通过函数的索引
 * 先通过map,将数组每个元素转化为[索引值,值]的形式
 * 再利用filter筛选符合函数运行的值
 * 利用slice选出最后一个
 * 需要[0][0] 因为返回的是[[i,v]]
 * 需要返回的是index
 */

const findLastIndex = (arr, fn) =>
  arr
    .map((v, i) => [i, v])
    .filter(value => fn(value[1], value[0], arr))
    .slice(-1)[0][0];

export default { ary, call };
