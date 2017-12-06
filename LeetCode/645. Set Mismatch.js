// link:https://leetcode.com/problems/set-mismatch/description/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function(nums) {
  var len = nums.length,
    left = -1,
    right = -1;
  for (var i = 0; i < len; i++) {
    if (nums[Math.abs(nums[i]) - 1] < 0) {
      left = Math.abs(nums[i]);
    } else {
      nums[Math.abs(nums[i]) - 1] = -nums[Math.abs(nums[i]) - 1];
    }
  }
  for (var j = 0; j < len; j++) {
    if (nums[j] > 0) {
      right = j + 1;
    }
  }
  return [left, right];
};

// 索引是i-1
// 第一次循环
//[1,2,2,4]
// i=1 --> [-1,2,2,4]
// i=2 --> [-1,-2,2,4]
// i=3 --> [-1,-2,2,4] left=nums[i] 即系2
// i=4 --> [-1,-2,2,-4] left = 2
// 第二次循环 遇到j=2时, 遇到整数,那么right就是j+1 =3
//return [left,right]
