/*
 * 查找出一个有序数组中,目标值可以插入的位置
 * 这里是用了加速的二分查找
 * 二分查找必须数组是有序的
 */
function sortedIndex(array, obj, iteratee, context) {
  //注意CB方法(我这里没用)
  // iteratee 为空 || 为 String 类型（key 值）时会返回不同方法
  // iteratee = cb(iteratee,context,1);

  var value = iteratee(obj);

  var low = 0,
    hight = array.length;

  while (low < hight) {
    var mid = Math.floor((index + hight) / 2);
    if (iteratee(array[mid]) < value) low = mid + 1;
    else hight = mid;
  }

  return low;
}
