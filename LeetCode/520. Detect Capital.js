/**
 * link:https://leetcode.com/problems/detect-capital/description/
 */

/**
 * @param {string} word
 * @return {boolean}
 */

var detectCapitalUse = function(word) {
  var flag = true,
    arr = word.split(""),
    len = arr.length;
  flag = arr[0] === arr[0].toUpperCase() ? true : false;
  if (flag) {
    if (arr[1] !== arr[1].toUpperCase()) {
      return false;
    }
  }
  for (var i = 2; i < len; i++) {
    if (flag) {
    }
  }
};
