/**
 * link:https://leetcode.com/problems/degree-of-an-array/description/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function(nums) {
  let left = {},
    right = {},
    count = {},
    len = nums.length;
  for (let i = 0; i < len; i++) {
    let x = nums[i];
    if (!(x in left)) {
      left[x] = i;
      count[x] = 0;
    }
    right[x] = i;
    count[x] = count[x] + 1;
  }
  let ans = nums.length;
  let degree = Math.max(...Object.values(count));
  for (let x in count) {
    if (count[x] == degree) ans = Math.min(ans, right[x] - left[x] + 1);
  }
  return ans;
};
var nums = [1, 2, 2, 3, 1];
findShortestSubArray(nums);
