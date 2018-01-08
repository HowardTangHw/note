// link:https://leetcode.com/problems/majority-element/description/
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

// 如果超过一半,那么排序之后,中位数肯定是要返回的值
var majorityElement = function(nums) {
  let len = nums.length,
    n2 = Math.floor(len / 2);
  nums = nums.sort((a, b) => a - b);
  return nums[n2];
};

// 另一种方法
var majorityElement = function(nums) {
  let count = 0,
    major = nums[0];
  for (var i of nums) {
    if (count == 0) {
      major = i;
      count++;
    } else if (major == i) {
      count++;
    } else {
      count--;
    }
  }
  return major;
};
