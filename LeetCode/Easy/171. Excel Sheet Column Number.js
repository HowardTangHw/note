/**
 * link:https://leetcode.com/problems/excel-sheet-column-number/discuss/
 */

/**
 * @param {string} s
 * @return {number}
 */
/**
 * AA->27
 * 26进1
 * ABC
 * (A*26+B)*26+C
 */ 
var titleToNumber = function(s) {
  let arr = s.split('');
  let sum = 0;
  arr.forEach(e => {
    if (sum) sum = sum * 26  + e.charCodeAt() - 64;
    if (!sum) sum = e.charCodeAt() - 64;
  });
  return sum;
};
