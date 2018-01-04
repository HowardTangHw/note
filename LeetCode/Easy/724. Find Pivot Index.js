/**
 * link:https://leetcode.com/problems/find-pivot-index/description/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
  var right = nums.reduce(function(sum, value) {
    return sum + value;
  }, 0);
  var left = 0,
    len = nums.length;
  for (var i = 0; i < len; i++) {
    right = right - nums[i];
    if (left === right) return i;
    left = left + nums[i];
  }
  return -1;
};
