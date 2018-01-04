// link:https://leetcode.com/problems/remove-element/description/
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let len = nums.length;
  let ans = 0;
  for (var i = len; i--; ) {
    if (val !== nums[i]) {
      ans++;
    } else nums.splice(i, 1);
  }
  return ans;
};
