/**
 * 方法一:最普通的双循环,定义一个变量数组res用于存放结果
 * 遍历需要去重的数组,如果该元素已存在于res中,则break掉当前的for,进入下一轮
 * 如果没存在就放入res
 * 这样的复杂度是O(n^2)
 */
function unique(a) {
  var res = [];
  for (var i = 0, aLen = a.length; i < aLen; i++) {
    var item = a[i];

    for (var j = 0, jLen = res.length; j < jLen; j++) {
      if (res[j] === item) break;
    }
    if (j == jLen) {
      res.push(item);
    }
  }
  return res;
}
var a = [1, 1, "1", "2", 1];
var ans = unique(a);
console.log(ans); // => [1, "1", "2"]

/**
 * 利用ES5提供的Array.prototype.indexOf方法来简单代码
 * 用indexOf来查找目标元素是否在res数组上,如果存在则不push  不存在则push
 */

function unique(a) {
  var res = [];

  for (var i = 0, len = a.length; i < len; i++) {
    var item = a[i];

    res.indexOf(item) === -1 && res.push(item);
  }
  return res;
}

var a = [1, 1, "1", "2", 1];
var ans = unique(a);
console.log(ans); // => [1, "1", "2"]

/**
 * 用上Array.prototype.filter()
 * filter()的返回值是true时,会将当前元素保存,最终返回一个新的通过测试的元素的集合的数组
 * indexOf查找元素第一次出现的位置,与当前位置做对比
 * 相等则是第一次出现,则返回true
 * 不相等则是第二次或者多次出现了
 * 最后返回的是一个新的通过测试的元素的集合的数组(就是将return的元素组成新数组)
 */
function unique(a) {
  var res = a.filter(function(item, index, array) {
    console.log(array.indexOf(item), index);
    return array.indexOf(item) === index;
  });

  return res;
}

var a = [1, 1, "1", "2", 1];
var ans = unique(a);
console.log(ans); // => [1, "1", "2"]

/**
 * 方法2 将当前的a[i]和后面的数字(a[j])做对比,如果发现相同的,就++i
 * 就是后面已经存在这个数组了,当前循环就可以跳过了
 * 如果没发现相同的,就push进数组里
 * 最后再将相同的在数组的后半部分push进来
 * 其实就是,数组后方没有相同的元素时,将元素push进来
 * 根据console.log,j=++i 也会把外面那层的循环中断掉
 * 加了两个console.log输出i和j ,就可以看到,其实外部的for并没有被打断,
 * 而是内部的for运行到j=++i时,就会打断,并重新运行一次
 */

function unique(a) {
  var res = [];

  for (var i = 0, len = a.length; i < len; i++) {
    // console.log("i"+i);
    for (var j = i + 1; j < len; j++) {
      // 如果发现相同的元素,就直接跳出该轮循环,进入一下轮了
      // 因为后方已经存在了相同的元素了,所以不必再对比
      if (a[i] === a[j]) {
        // console.log("j"+j);
        console.log("中断了");
        j = ++i;
      }
    }

    // 当数组后方没有相同的元素时,将元素push进来
    console.log("没被中断");
    res.push(a[i]);
  }

  return res;
}

var a = [1, 1, "1", "2", 1];
var ans = unique(a);
console.log(ans); // => ["1", "2", 1]

/**
 * 方法3:sort
 * sort排序后,理论上相同的元素会被放在临近,那么只要比较前后位置的元素就可以了
 * 这里是和前一个元素对比 return的是当前的元素
 */
function unique(a) {
  /**
   * 先用concat()返回一个新数组 避免sort()污染了原数组
   * 然后用sort()进行排序
   */

  return a.concat().sort().filter(function(item, index, ary) {
    // !index是将第一个元素(index=0)的元素放进去
    // 后面从第二个元素开始比较,每次比较的对象是前一个元素,当为true时则会暂存元素
    // 最终返回一个通过测试的新数组
    // return !index || item != ary[index - 1];
    // fix bug
    return !index || item !== ary[index - 1];
  });
}
var a = [1, 1, 3, 2, 1, 2, 4];
var ans = unique(a);
console.log(ans); // => [1, 2, 3, 4]

/**
 * 方法3的bug
 * 1和'1'会被排一起,不同的 Object 会被排在一起，因为它们 toString() 的结果相同
 * 所以会出现错误
 * 可以针对出现不同的类型 来写出比较函数
 * return !index || item != ary[index - 1]; 
 * 改写为 item!==ary[index-1] 则可以修复该bug
 */

var a = [1, 1, 3, 2, 1, 2, 4, "1"];
var ans = unique(a);
console.log(ans); // => [1, 2, 3, 4]

/**
 * 方法4(Object)
 * 键值对法(如果数组元素全是基础类型number值,是最高效的)
 * avaScript 中的 Object 对象来当做哈希表
 * 跟 sort 一样，可以去重完全由 Number 基本类型组成的数组。
 * 其实就是将数组放入到对象seen中
 * 如果对象中不存在以数组的值为键名的键值对,(利用hasOwnProperty判断)
 * 则放入seen[item]=true (这句话会返回true,这是filter就会把这个item记录下来)
 * 其实就是重复的键名则返回false
 */

function unique(a) {
  var seen = {};

  return a.filter(function(item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

var a = [1, 1, 3, 2, 1, 2, 4];
var ans = unique(a);
console.log(ans); // => [1, 3, 2, 4]

/**
 * 还是和方法三一样的问题，
 * 因为 Object 的 key 值都是 String 类型，所以对于 1 和 "1" 无法分别，
 * 我们可以稍微改进下，将类型也存入 key 中。 
 * 就是加入类型判断
 * 例如'Number' 1 和'String'1相比 
 * key值就不一样了
 */

function unique(a) {
  var ret = [];
  var hash = {};
  for (var i = 0, len = a.length; i < len; i++) {
    var item = a[i];

    //加入类型
    var key = typeof item + item;

    // 如果hash[key]不存在的话,应该是===undefined的
    //如果存在了 下方已经赋值 hash[key]=1;
    if (hash[key] !== 1) {
      ret.push(item);
      hash[key] = 1;
    }
  }
  return ret;
}

var a = [1, 1, 3, 2, "4", 1, 2, 4, "1"];
var ans = unique(a);
console.log(ans); // => [1, 3, 2, "4", 4, "1"]

/**
 * 虽然解决了讨厌的 1 和 "1" 的问题，但是还有别的问题！
 * 例如 多个Object 或者String 等到
 * 但是如果数组元素全部是基础类型的 Number 值，键值对法应该是最高效的！
 */

var a = [{ name: "hanzichi" }, { age: 30 }, new String(1), new Number(1)];
var ans = unique(a);
console.log(ans); // => [Object, String]

/**
 * 方法5 (ES6)
 * ES6 部署了 Set 以及 Array.from 方法，太强大了！
 * Set结构会返回一个成员唯一的,没有重复的值的Set对象
 * 然后用Array.from和拓展运算符将他变为数组
 * 其实用拓展运算符[...array]更方便
 */

function unique(a) {
  // return Array.from(new Set(a));
  return [...new Set(a)];
}

var a = [{ name: "hanzichi" }, { age: 30 }, new String(1), new Number(1)];
var ans = unique(a);
console.log(ans); // => [Object, Object, String, Number]

/**
 * 方法6 unique封装的方法
 * 
 * contains:
 *          判断数组或者对象中（value 值）是否有指定元素
 *          如果是 object，则忽略 key 值，只需要查找 value 值即可
 *          即该 obj 中是否有指定的 value 值
 *          返回布尔值
 * 
 * underscore 中的实现方式和上面的方法一相似。
 */

for (var i = 0, length = getLength(array); i < length; i++) {
  var value = array[i],
    // 如果指定了迭代函数
    // 则对数组每一个元素进行迭代
    computed = iteratee ? iteratee(value, i, array) : value;

  // 如果是有序数组，则当前元素只需跟上一个元素对比即可
  // 用 seen 变量保存上一个元素
  if (isSorted) {
    // 如果 i === 0，则直接 push
    // 否则比较当前元素是否和前一个元素相等
    if (!i || seen !== computed) result.push(value);
    // seen 保存当前元素，供下一次对比
    seen = computed;
  } else if (iteratee) {
    // 如果 seen[] 中没有 computed 这个元素值
    if (!_.contains(seen, computed)) {
      seen.push(computed);
      result.push(value);
    }
  } else if (!_.contains(result, value)) {
    // 如果不用经过迭代函数计算，也就不用 seen[] 变量了
    result.push(value);
  }
}
//外面的循环遍历数组元素，
//对于每个元素，如果数组有序，则和前一个元素比较，如果相同，则已经出现过，不加入到结果数组中，否则则加入。
//而如果有迭代函数，则计算传入迭代函数后的值，对值去重，调用 _.contains 方法，而该方法的核心就是调用 _.indexOf 方法，和我们上面说的方法一异曲同工。

function unique(a) {
  return a.concat().sort().filter(function(value, index, array) {
    return !index || value !== array[index - 1];
  });
}
var a = [{ name: "hanzichi" }, { age: 30 }, new String(1), new Number(1)];
var ans = unique(a);
console.log(ans); // => [Object, String]

function unique(arr) {
  return arr.concat().sort().filter(function(value, index, arr) {
    return !index || value !== arr[index - 1];
  });
}
