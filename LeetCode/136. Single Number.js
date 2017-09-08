/**
 * link:https://leetcode.com/problems/single-number/description/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */

var singleNumber = function(nums) {
  return +nums
    .concat()
    .sort()
    .filter(function(value, index, array) {
      return value != array[index - 1] && value != array[index + 1];
    });
};
