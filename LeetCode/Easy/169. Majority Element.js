/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  let hash = {},
    len = nums.length,
    n2 = len / 2;
  for (var i = 0; i < len; i++) {
    let now = nums[i];
    if ((hash[now] = ~~hash[now] + 1) > n2) return now;
  }
};
