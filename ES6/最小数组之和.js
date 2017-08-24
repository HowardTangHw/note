/**
 * segmentfault上的问题
 * @link :https://segmentfault.com/q/1010000010573083/a-1020000010574045
 * 给定一个整数数组,找一个具有最小和的子数组
 * 做法:
 *      判断是否存在小于0的数,如果存在,则把他们放在一个数组里返回
 *      如果上面的数组不存在,则返回正数中的最小的数
 * 
 * 
 *  */

function minArrFnc(arr) {
  var ltArr = [];
  var minNum = arr[0];
  for (var i of arr) {
    if (Array.isArray(i)) {
      var c = minArrFnc(i);
      Array.isArray(c)
        ? (ltArr = [...ltArr, ...c])
        : (minNum = minNum > c ? c : minNum);
    } else {
      i < 0 ? ltArr.push(i) : "";
      minNum < i ? minNum : i;
    }
  }
  if (ltArr.length > 0) {
    return ltArr;
  } else {
    return minNum;
  }
}
var arr = [-1, 1, [-2, [-4, -5], -3], 2, 3, 4];
console.log(minArrFnc(arr));
