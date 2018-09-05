// link:https://leetcode.com/problems/longest-uncommon-subsequence-i/description/

// 如果两个字符串相等，那么一定没有非共同子序列，反之，如果两个字符串不等，那么较长的那个字符串就是最长非共同子序列，
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var findLUSlength = function(a, b) {
  if (a == b) return -1;
  return a.length > b.length ? a.length : b.length;
};
