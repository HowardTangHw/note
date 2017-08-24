// Generator function to create the indexOf and lastIndexOf functions
// _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
// _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
function createIndexFinder(dir, predicateFind, sortedIndex) {
  //API 调用形式
  // _.indexOf(array, value, [isSorted])
  // _.indexOf(array, value, [fromIndex])
  // _.lastIndexOf(array, value, [fromIndex])
  return function(array, item, index) {
    var i = 0,
      length = array.length;

    //如果index 是number类型
    //则规定查找位置的起始点
    //如果第三个参数不是[isSorted] (其实就是[fromIndex])
    //只能遍历查找了
    if (typeof index == "number") {
      if (dir > 0) {
        //这个dir是外面的,利用了闭包,>0时是正向查找
        i = index >= 0 ? index : Math.max(index + length, i);
      } else {
        //dir<0 返现查找
        //如果是反向查找,重置length属性值
        length =
          index >= 0 ? Math.min((index = 1), length) : index + length + 1;
      }
    } else if (sortedIndex && index && length) {
      /*
       * 能使用二分查找加速的条件
       * 有序 & index !== 0 && length !==0
       * 在外部调用的时候,在srotedIndex出放 _.sortIndex
       * 用 _.sortIndex 找到有序数组中 item 正好插入的位置
       */
      index = sortedIndex(array, item);

      /*
        * 如果正好插入的位置的值和item刚好相等
        * 说明该位置就是item第一次出现的位置
        * 返回下标
        * 否则即是没有找到,返回-1
        */
      return array[index] === item ? index : -1;
    }

    /*
    * 特殊值判断,如果要查找的元素是NAN类型
    * 利用了_is.NaN (首先是个number,然后不等于自身)
    */
    if (item !== item) {
      // index = predicateFind(slice.call(array, i, length), _.isNaN);
      index = predicateFind(slice.call(array, i, length), function(obj) {
        return Object.toString.call(obj) === "[object Number]" && isNaN(obj);
      });
      return index >= 0 ? index + i : -1;
    }

    /**
     * O(n)遍历数组
     * 寻找和item相同的元素
     * 因为排除了Nan的情况 可以放心的用`===`来判断是否相等了
     */

    for (
      index = dir > 0 ? i : length - 1;
      index >= 0 && index < length;
      index += dir
    ) {
      if (array[index] === item) return index;
    }

    return -1;
  };
}
