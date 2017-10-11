/**
 * https://leetcode.com/problems/max-consecutive-ones/description/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
  var len = nums.length,
    // arr = [];
    num=0
  result = [];
  for (var i = 0; i < len + 1; i++) {
    if (nums[i] == 0 || i == len) {
      // result.push(arr.length);
      // arr = [];
      result.push(num);
      num = 0;
    }
    // if (nums[i] == 1) arr.push(1);
    if (nums[i] == 1) num++;
  }
  return Math.max(...result);
};

// 方法2
var findMaxConsecutiveOnes = function(nums) {
  let ans = 0,
    sum = 0;
  // 补零
  nums.push(0);
  for (let item of nums) {
    if (item) {
      sum++;
    } else {
      ans = Math.max(ans, sum);
      sum = 0;
    }
  }
  return ans;
};

// 方法3
var findMaxConsecutiveOnes = function(nums) {
  var str = nums.join('').split('0').map(function(value){
    return value.length;
  })
  return Math.max(...str);
}
