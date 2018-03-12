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
 * groupBy
 * 核心思想与countBy差不多,不过countBy是计算次数,而groupBy则把元素展示出来
 * */

const groupBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i]);
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

/**
 * flatten
 * 与deepFlatten差不多,不过deepFlatten是多维拆到1维
 * 而flatten是可以指定层数的(就是拆多少层)
 * 默认层数为1
 * */

const flatten = (arr, deepth) =>
  deepth !== 1
    ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v, deepth - 1) : v), [])
    : arr.reduce((a, v) => a.concat(v), []);

/**
 * forEachRight
 * 从后边开始循环,其实是利用slice创建一个新数组,因为reverse会污染原数组,
 * */

const forEachRight = (arr, cb) =>
  arr
    .slice(0)
    .reverse()
    .forEach(cb);

/**
 * head
 * 返回数组的第一个数(意义何在???)
 * */

const head = arr => arr[0];

/**
 * last
 * 返回数组最后一个
 * */

const last = arr => arr[arr.length - 1];

/**
 * indexOfAll
 * 查找元素的所有索引值
 * 利用forEach & push
 * */

const indexOfAll = (arr, val) => {
  const indices = [];
  arr.forEach((v, i) => v == val && indices.push(i));
  return indices;
};

/**
 * initial
 * 截取数组从0到length-1个数(就是不要最后那个了)
 * */

const initial = arr => arr.slice(0, -1);

/**
 * initialize2DArray
 * 创建一个二维的数组
 * */

const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

/**
 * initializeArrayWithRange
 * 按照输入的值,初始化数组(按照顺序)
 * initializeArrayWithRange = (end, start = 0, step = 1)
 *    end:结束为止
 *    start:开始为止(默认为0)
 *    step:递增的步数(可以为负数),默认为1
 *    demo:
 *          initializeArrayWithRange(5); // [0,1,2,3,4,5]
 *          initializeArrayWithRange(7, 3); // [3,4,5,6,7]
 *          initializeArrayWithRange(9, 0, 2); // [0,2,4,6,8]
 *          initializeArrayWithRange(0, 9, -2); // [8,6,4,2,0]
 * */

const initializeArrayWithRange = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end + 1 - start) / step) }).map((v, i) => i * step + start);

/**
 * intersection
 * 与difference相反,保留的是两个数组之间共有的
 * */

const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(v => s.has(v));
};

/**
 * intersectionBy
 * 与differenceBy相反,
 * 对比两个经过fn处理的数组,返回相同的元素
 * 返回的是未经过fn处理的数据.
 * */

const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(v => fn(v)));
  return a.filter(v => s.has(fn(v)));
};

/**
 *intersectionWith
 * 返回arr 与val中,通过对比函数(comp)的数
 * Example:
 *         intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)); // [1.5, 3, 0]
 */

const intersectionWith = (a, b, comp) => a.filter(x => b.findIndex(y => comp(x, y) !== -1));

/**
 * isSorted
 * 利用了Array.entries()和for...of,取出键值
 * 如果键是最后一个了,则返回direction
 * 如果途中,有符合递增或递减的数
 * 返回1为递增,返回-1为递减,返回0则没排序
 * */

const isSorted = arr => {
  const direction = arr[0] > arr[1] ? -1 : 1;
  for (let [i, v] of arr.entries())
    if (i === arr.length - 1) return direction;
    else if ((v - arr[i + 1]) * direction > 0) return 0;
};

/**
 * join
 * 将数组转为字符串拼接,还可以定义最后一个用什么符号...
 * */

const join = (arr, separator = ',', end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1 ? acc + val : acc + val + separator,
    ''
  );

/**
 * longestItem
 * 最长的元素
 * */

const longestItmen = (...vals) => [...vals].sort((a, b) => a.length - b.length)[0];

/**
 * mapObject
 * 对数组进行fn处理,最终结果返回一个对象,对象的键为原始值,值为处理过的函数
 * 转化为es5代码会更容易理解
 * */

//  ES5 代码
var mapObject = function mapObject(arr, fn) {
  // 自执行函数,最后返回的是一个对象,原因在下面
  return (function(a) {
    // 这里的a 是undefined,用它转化为数组,第一个值为arr,第二个值存放的是经过fn处理的值
    // return如果有多个值,只保留后面那个,所以最终的返回值是一个经过reduce处理的对象{}
    return (
      (a = [arr, arr.map(fn)]),
      // a[0]为原数组,
      a[0].reduce(function(acc, val, ind) {
        // 原始值作为键名,值为a[1]即经过fn处理的arr,并且要返回acc,原因同上
        return (acc[val] = a[1][ind]), acc;
      }, {})
    );
  })();
};

const mapObject = (arr, fn) =>
  (a => (
    (a = [arr, arr.map(fn)]), a[0].reduce((acc, val, i) => ((acc[val] = a[1][i]), acc), {})
  ))();

/**
 * maxN
 * 最大的N个值
 * */

const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

/**
 * minN
 * 最小的N个值
 * */

const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);

/**
 * nthElement
 * 返回数组的第N个元素(意义不明...是因为处理了负数?)
 * */

const nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n)[0]);

/**
 * partition
 * 分割,将数组分割,
 * 分割的依据是每个元素通过fn处理,最后相同的值放在同一个数组里.
 * */

const partition = (arr, fn) =>
  arr.reduce(
    (acc, value, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );

/**
 * pull
 * 利用includes筛选剩下的值,然后给arr,
 * 会对原数组进行变更
 * Array.includes也可以用Set来代替的吧.
 * */

const pull = (arr, ...args) => {
  let argState = Array.isArray(args[0]) ? args[0] : args;
  let pulled = arr.filter((v, i) => !argState.includes(v));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};

/**
 * pullAtIndex
 * 和上面差不多,
 * 根据输入的索引数组,移除相关下标的值
 * removed存放的是要移除的值,pulled存放的是剩下的值
 * */

const pullAtIndex = (arr, pullArr) => {
  let removed = [];
  let pulled = arr
    .map((v, i) => (pullArr.includes(i) ? removed.push(v) : v))
    .filter((v, i) => !pullArr.includes(i));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
  return removed;
};

/**
 * pullAtValue
 * 根据输入值,移除原数组内相同的值
 * */

//  自己根据上面的修改的
// const pullAtValue = (arr, pullArr) => {
//   let removed = [];
//   let pulled = arr.map((v, i) => (pullArr.includes(v) ? (removed.push(v),v) : v)).filter((v, i) => !pullArr.includes(v));
//   arr.length = 0;
//   pulled.forEach(v => arr.push(v));
//   return removed;
// };

const pullAtValue = (arr, pullArr) => {
  let removed = [],
    pushToRemove = arr.forEach((v, i) => (pullArr.includes(v) ? removed.push(v) : v)),
    mutateTo = arr.filter((v, i) => !pullArr.includes(v));
  arr.length = 0;
  mutateTo.forEach(v => arr.push(v));
  return removed;
};

/**
 * pullBy
 * 原始数组,和对比数组,两者通过fn处理后,筛选出原始数组有,输入数组没有的数据
 * 第一步,判断args中,最后一个参数是否为function,
 * 第二步,用fn处理args
 * 第三部,在已处理的args中,有没有fn(arr[v])的值
 * */

const pullBy = (arr, ...args) => {
  const length = args.length;
  let fn = length > 1 ? args[length - 1] : undefined;
  fn = typeof fn === 'function' ? (args.pop(), fn) : undefined;
  let argState = (Array.isArray(args[0]) ? args[0] : args).map(val => fn(val));
  let pulled = arr.filter((v, i) => !argState.includes(fn(v)));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};

/**
 * reducedFilter(data,keys,fn)
 * 筛选符合fn的data,提取出相关的keys
 * */

const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );

/**
 * reduceSuccessive
 * 对累加器和数组中的每个元素（从左到右）应用一个函数，返回经过函数处理后的数组。
 * 传入的acc,作为一个数组[acc],传进reduce里面,就会成为res的第一个值
 * 所以fn也会对第一个值进行处理
 * arr.reduce中的res其实就是[acc],就是最后需要返回的数组
 */
const reduceSuccessive = (arr, fn, acc) =>
  arr.reduce((res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i, arr)), res), [acc]);

/**
 * reduceWhich
 * 返回数组的最小值(默认)
 * 可以设置第三个参数(a,b)=>b-a,返回最大值
 * */

const reduceWhich = (arr, compartor = (a, b) => a - b) =>
  arr.reduce((a, b) => (compartor(a, b) > 0 ? b : a));

/**
 * remove
 * Removes elements from an array for which the given function returns false.
 * 返回的数组都是通过fn的,而原数组保留的都是未通过fn的
 * example:
 * let a =[1,2,3,4]
 * remove(a,n=>n%2===0) //[2,4]
 * a                    //[1,3]
 */

const remove = (arr, fn) =>
  Array.isArray(arr)
    ? arr.filter(fn).reduce((acc, val) => {
        arr.slice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];

/**
 * sample
 * 数组随机出一个数
 * */

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * sampleSize
 * 随机输出一个数组(数组长度为第第二个参数默认为1)
 * 第二个参数输入超出输入数组长度,则打乱数组输出
 * 用了 Fisher-Yates algorithm 打乱数组
 * */

const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};

/**
 * shuffle
 * 打乱数组 使用Fisher-Yates
 */

const shuffle = arr => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

/**
 * similarity
 * remove values that are not part of values
 * */

const similarity = (arr, values) => arr.filter(v => values.includes(v));

/**
 * sortedIndex
 * 找出输入值,在原数组中插入的位置
 * 原数组必须是有序的
 * 返回值应插入到数组中的最高索引，以保持其排序顺序
 * */

const sortedIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.findIndex(el => (isDescending ? n >= el : n <= el));
  return index == -1 ? arr.length : index;
};

/**
 * sortedLastIndex
 * sortedLastIndex存在疑点
 * issue:https://github.com/Chalarangelo/30-seconds-of-code/issues/629
 * 找出输入值,在原数组中最后插入的位置
 * 返回值应插入到数组中的最高索引，以保持其排序顺序
 * */

const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.reverse().findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - 1 - index;
};

/**
 * sortedIndexBy
 * 输入数组,目标值,函数,
 * 经过函数处理,
 * 根据提供的迭代器函数，返回值应该插入到数组中的最低索引，以便维护其排序顺序。
 * */

const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el => (isDescending ? val >= fn(el) : val <= fn(el)));
  return index === -1 ? arr.length : index;
};

/**
 * sortedLastIndexBy
 * 输入数组,目标值,函数,
 * 经过函数处理,
 * 根据提供的迭代器函数，返回值应该插入到数组中的最高索引，以便维护其排序顺序。
 */

const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el => (isDescending ? val <= fn(el) : val >= fn(el)));
  return index === -1 ? 0 : arr.length - index;
};

/**
 * stableSort
 * 与sort大致相同,但是有一点不同就是
 * 如果比较的项相等，则保留它们的初始顺序。
 * 例如:
 * const arr = [0,'1', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * stableSort(arr, (a,b) => b-a); // [10, 9, 8, 7, 6, 5, 4, 3, 2, "1", 1, 0]
 * const arr = [0, 1,'1', 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * stableSort(arr, (a,b) => b-a); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1,"1", 0]
 */

const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a, b) || a.index - b.index)
    .map(({ item }) => item);

/**
 * symmetricDifference
 * 等差对分也叫对称差集
 * 对称差集：集合A与集合B的对称差集定义为集合A与集合B中所有不属于A∩B的元素的集合，记为A△B,也就是说A△B={x|x∈A∪B,x∉A∩B}，即A△B=(A∪B)—(A∩B).也就是A△B=（A—B）∪（B—A）
 * */

const symmetricDifference = (a, b) => {
  let sA = new Set(a),
    sB = new Set(b);
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
};

/**
 * symmetricDifferenceBy
 * 与上面一样,不过是经过fn处理(就是筛选fn值后的等差对分)
 * */
const symmetricDifferenceBy = (a, b, fn) => {
  let sA = new Set(a.map(v => fn(v))),
    sB = new Set(b.map((v = fn(v))));
  return [...a.filter(x => !sB.has(fn(x))), ...b.filter(x => !sA.has(fn(x)))];
};

/**
 * symmetricDifferenceWith
 * 与上面差不多,不过这次的是compare(对比函数),输入的值是两个
 * */

const symmetricDifferenceWith = (a, b, comp) => [
  ...a.filter(v => b.findIndex(d => comp(v, d)) === -1),
  ...b.filter(v => a.findIndex(d => comp(v, d)) === -1)
];

/**
 * tail
 * Return Array.slice(1) if the array's length is more than 1, otherwise, return the whole array.
 */
const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);

/**
 * take
 * 从0开始切割到n 与drop不一样
 * */

const take = (arr, n = 1) => arr.slice(0, n);

/**
 * takeRight
 * 从最后一个开始切割
 * */

const takeRight = (arr, n = 1) => arr.slice(arr.length - n);

/**
 * takeWhile
 * 从0开始直到函数返回`true`的时候停止,最后返回被移除的值(即为`false`的值);
 * */

const takeWhile = (arr, func) => {
  for (let i in arr) if (func(arr[i])) return arr.slice(0, i);
  return arr;
};

/**
 * takeRightWhile
 * 从数组的末端开始移除值,直到函数返回`true`的时候停止,最后返回被移除的值(即为`false`的值);
 * */

const takeRightWhile = (arr, func) => {
  // 源代码是实用 for(let i of arr.reverse().keys()) 我感觉没必要,直接用for in 了.
  for (let i in arr.reverse())
    if (func(arr[i])) return arr.reverse().slice(arr.length - i, arr.length);
  return arr;
};

/**
 * union
 * 合并数组
 * */

const union = (a, b) => Array.from(new Set([...a, ...b]));

/**
 * unionBy
 * 将提供的函数应用于两个数组的每个元素后，返回两个数组中任何一个数组中存在的每个元素。
 * 返回a的值,和在应用函数中,b有a没有的值
 * */

const unionBy = (a, b, func) => {
  let s = new Set(a.map(x => func(x)));
  return Array.from(new Set([...a, ...b.filter(x => !s.has(func(x)))]));
};

/**
 * unionWith
 * 返回a的值,和在比较函数中,b有a没有的值
 * */

const unionWith = (a, b, comp) =>
  Array.from(new Set([...a, ...b.filter(y => a.findIndex(x => comp(x, y)) === -1)]));

/**
 * uniqueElements
 * 去重
 * */

const uniqueElements = arr => [...new Set(arr)];

/**
 * zip
 * 创建一个数组,将输入的数组根据索引值分类
 * ['a', 'b'], [1, 2], [true, false]  ==> [['a', 1, true], ['b', 2, false]]
 * */

const zip = (...arr) => {
  const maxLen = Math.max(...arr.map(x => x.length));
  return Array.from({ length: maxLen }).map((_, i) => {
    return Array.from({ length: arr.length }, (_, k) => arr[k][i]);
  });
};

/**
 * zipObject
 * 压缩成对象
 * */

const zipObject = (props, values) =>
  props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});

/**
 * zipWith
 * 如果最后一个函数,就将他利用函数处理,否则与zip没区别
 * 如果是函数 就将..arr中的每个数组的值作为传参传进fn里面
 * 例如arr= [1, 2], [10, 20], [100, 200]
 * 那么fn就有三个参数fn(1,10,100),fn(2,20,200);最后将结果放回新建的Array里面
 * */

const zipWith = (...arr) => {
  const fn = typeof arr[arr.length - 1] === 'function' ? arr.pop() : undefined;
  return Array.from(
    { length: Math.max(...arr.map(x => x.length)) },
    (_, i) => (fn ? fn(...arr.map(array => array[i])) : arr.map(array => array[i]))
  );
};

/**
 * unzip
 * 解压,与上面的相反
 * acc的长度由数组中最大那个决定,然后将每一项都初始化为数组
 * 利用forEach,根据索引值push值 从而进行解压
 * acc[i]代表的是一个数组
 * */

const unzip = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({ length: Math.max(...arr.map(x => x.length)) }).map(x => [])
  );

/**
 * unzipWith
 * 将unzip的数组再通过fn处理
 * */

const unzipWith = (arr, fn) =>
  arr
    .reduce(
      (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
      Array.from({ length: Math.max(...arr.map(x => x.length)) }).map(x => [])
    )
    .map(val => fn(...val));

/**
 * without
 * 筛选(去掉)出具有指定值之一的数组元素(保留没有指定值的数组)。
 * */

const without = (arr, ...args) => arr.filter(v => !args.includes(v));

/**
 * xProd
 * 通过从数组中创建每个可能的对创建一个新的数组。
 * */

const xProd = (a, b) => a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

export default { ary, call };
