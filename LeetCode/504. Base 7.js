//link :https://leetcode.com/problems/base-7/description/
/**
 * @param {number} num
 * @return {string}
*/
/**
 * 10进制-->7进制
 * 不断取余数,存到数组里
 * 要从下网上,所以要reverse
 */ 
var convertToBase7 = function(num) {
  var flag = num > 0 ? "" : "-",
    res = [],
    base = 7;
  if (num === 0) return "0";
  num = Math.abs(num);
  while (num) {
    res.push(num % base);
    num = ~~(num / base);
  }
  return flag + res.reverse().join("");
};
