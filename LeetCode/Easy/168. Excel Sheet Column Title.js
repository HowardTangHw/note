/**
 * link:https://leetcode.com/problems/excel-sheet-column-title/description/
 */

/**
 * @param {number} n
 * @return {string}
 */
//使用String.fromCharCode
//A在Unicode 中是64+1开始
var convertToTitle = function(n) {
  var uArr = [];
  while (n) {
    if (!(n % 26)) {
      uArr.unshift(26 + 64);
      n = n / 26 - 1;
    } else {
      uArr.unshift(n % 26 + 64);
      n = ~~(n / 26);
    }
  }
  return String.fromCharCode(...uArr);
};
