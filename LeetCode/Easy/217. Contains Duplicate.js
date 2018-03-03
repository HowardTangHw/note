//link:https://leetcode.com/problems/contains-duplicate/description/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  let hash = [],
    len = nums.length;
  if (!len) return false;
  for (let i = 0; i < len; i++) {
    if (hash[nums[i]]) {
      return true;
    } else {
      hash[nums[i]] = 1;
    }
  }
  return false;
};
