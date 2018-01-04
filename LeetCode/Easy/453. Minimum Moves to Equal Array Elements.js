//link:https://leetcode.com/problems/minimum-moves-to-equal-array-elements/description/
/**
 * 给出n个数,每次只能移动n-1个数,如果一直+1的话,最终的值是不能确认的,
 * 但是我们知道最小值,那么我们就可以-1,算出每个数字变成最小值的步数,然后累加起来,就是总步数了
 * 那么问题也可能转化为，将所有数字都减小到最小值所需的步数
 * (n-1)个数加到所有数字统一转化为==>每个数变成最小值所需的步骤的总和
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
  var len = nums.length,
    min = Infinity,
    res = 0;
  for (var i = 0; i < len; i++) {
    min = Math.min(min, nums[i]);
  }
  for (var j = 0; j < len; j++) {
    res += nums[j] - min;
  }
  return res;
};

// 也可以用数组累加的和减去最小值*长度
// 
var minMoves = function(nums) {
  var len = nums.length,
    min = Infinity,
    sum = 0;
  for (var i = 0; i < len; i++) {
    min = Math.min(min, nums[i]);
    sum += nums[i];
  }
  return sum - min * len;
};
