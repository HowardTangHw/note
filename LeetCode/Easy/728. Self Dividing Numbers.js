//link:https://leetcode.com/problems/self-dividing-numbers/discuss/
/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function(left, right) {
  let arr = [];
  for (var i = left; i <= right; i++) {
    var num = ('' + i).split('');
    var flag = true;
    num.forEach(v => {
      if (i % v !== 0) flag = false;
    });
    flag && arr.push(i);
  }
  return arr;
};

//
/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function(left, right) {
  var result = [];
  //从left到right的每一个数n，看是否n每一位都能整除n，如果是，就将n加入result数组
  //n每一位都不能是0
  for (var i = left; i <= right; i++) {
    var tmpI = i,
      digit = 0,
      isDividingNum;
    while (tmpI) {
      isDividingNum = 1;
      digit = tmpI % 10;
      if (!digit || i % digit != 0) {
        isDividingNum = 0;
        break;
      }

      tmpI = (tmpI - digit) / 10;
    }

    if (isDividingNum) {
      result.push(i);
    }
  }

  return result;
};
