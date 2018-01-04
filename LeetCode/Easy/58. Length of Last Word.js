/**
 * link:https://leetcode.com/problems/length-of-last-word/description/
 */

/**
 * @param {string} s
 * @return {number}
 */
// 需要把空白字符去掉
var lengthOfLastWord = function(s) {
  return s
    .replace(/\s+$/, '')
    .split(' ')
    .pop().length;
};
