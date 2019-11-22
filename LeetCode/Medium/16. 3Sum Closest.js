/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  nums.sort((a, b) => a - b);
  let len = nums.length;
  let result = nums[0] + nums[1] + nums[len - 1];
  for (let i = 0; i < len - 2; i++) {
    let start = i + 1;
    let end = len - 1;
    while (start < end) {
      let sum = nums[i] + nums[start] + nums[end];
      if (sum > target) {
        end--;
      } else {
        start++;
      }
      if (Math.abs(sum - target) < Math.abs(result - target)) {
        result = sum;
      }
    }
  }
  return result;
};
