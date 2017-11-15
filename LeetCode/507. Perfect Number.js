/**
 * link:https://leetcode.com/problems/perfect-number/discuss/
 * 求除了本身外,所有商之和等于本身
 * 只要开平方根就可以了,因为例如 28 ,输入2,输出14,那么2和18都是它的商
 */

/**
 * @param {number} num
 * @return {boolean}
 */
var checkPerfectNumber = function(num) {
  let sqr = Math.sqrt(num),
    sum = 1;
  for (let i = 2; i <= sqr; i++) {
    if (num % i == 0) sum += i + num / i;
  }
  return num > 1 && sum === num;
};
