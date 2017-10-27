/**
 * link:https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/description/
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
  var res = [];
  for (let i = 0; i < nums.length; i++) {
    index = nums[i];
    // 如果nums[i]所在位置存在值,则赋值为-1; 这里取绝对值,
    if (nums[Math.abs(index)-1] > 0) {
      //因为这里会将那个位置的数 改为负数,用于下方循环判断
      nums[Math.abs(index)-1]= -nums[Math.abs(index)-1];
    }
  }

  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] > 0) res.push(i);
  }
  return res;
};
