/**
 * link:https://leetcode.com/problems/missing-number/description/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */

// 方法1:利用递增数列求和,然后一个一个数去减,看看少了谁
var missingNumber = function(nums) {
  let len = nums.length,
    sum = (0 + len + 1) * len / 2;
  for (let i of nums) {
    sum -= i;
  }
  return sum;
};

// 方法2:foreach
var missingNumber = function(nums) {
  let result = nums.length;
  nums.forEach((e, i) => {
    result = result + i - e;
  });
  return result;
};

//方法3
var missingNumber = function(nums) {
  nums = nums.sort((a, b) => {
    return a - b;
  });
  for (let i = 0; ; i++) {
    if (i !== nums[i]) return i;
  }
};
