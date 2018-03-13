//link:https://leetcode.com/problems/valid-perfect-square/description/
/**
 * @param {number} num
 * @return {boolean}
 */

// 方法1,利用计算平方根
var isPerfectSquare = function(num) {
  let sqart = num;
  while (sqart * sqart > num) {
    // 这里是要当小于1的时候,处理的,不然就会一直执行超时的...0.555|0 ==> 0
    sqart = ((sqart + num / sqart) / 2) | 0;
  }
  return sqart * sqart === num;
};

// 方法2 也是平方根 利用for

var isPerfectSquare = num => {
  for (let i = 1; i <= (num/i); i++) {
    if (i * i === num) return true;
  }
  return false;
};

