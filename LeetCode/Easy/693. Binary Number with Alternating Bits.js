/**
 * link:https://leetcode.com/problems/binary-number-with-alternating-bits/description/
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function(n) {
  var num = n.toString(2),
    len = num.length;
  for (var i = 1; i < len; i++) {
    if (num[i] === num[i - 1]) return false;
  }
  return true;
};

var hasAlternatingBits = function(n) {
  var num = n.toString(2),
    len = num.length;
  for (var i = 1; i < len; i++) {
    if (!(num[i] ^ num[i - 1])) return false;
  }
  return true;
};


//这个不懂.留着以后查
var hasAlternatingBits = function(n) {
  var check;
  check = n ^ (n >> 1);
  return !(check & (check + 1))
};
