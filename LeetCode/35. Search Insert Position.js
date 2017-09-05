/**
 * link:https://leetcode.com/problems/search-insert-position/description/
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  var len = nums.length;
  var index = nums.findIndex(function(n) {
    return target <= n;
  });
  index = index >= 0 ? index : len;
  return index;
};
