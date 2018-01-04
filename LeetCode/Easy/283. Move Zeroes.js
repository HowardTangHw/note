// link:https://leetcode.com/problems/move-zeroes/description/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 一开始以为是从小到大排列,实际上不是,而是要按数组的顺序来排
var moveZeroes = function(nums) {
  nums.sort(function(a, b) {
    return a - b;
  });
  console.log(nums);
  for (var i = 0, len = nums.length; i < len; i++) {
    if (nums[i] === 0) {
      nums.shift();
      nums.push(0);
    }
  }
};
var nums = [0, 1, 0, 3, 12];
moveZeroes(nums);

var moveZeroes = function(nums) {
  for (var i = 0, len = nums.length; i < len; i++) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
    }
  }
};
//那么只能用splice了
//因为前往后的时候,如果用nums[0]的话,就会因为[1,0]而停止了,
// 上面代码,当是[0,0,1]的时候,i=0时,s[0]=0,这是执行splice和push 就会变成[0,1,0];
// 可是这是i++ i就等于1,此时a[1]=1,而最开始的0就没办法判断了
//最后看了下hanzhichi的代码,应该从后往前,这样就不会出现上述问题了
var moveZeroes = function(nums) {
  var i = nums.length;
  while (i--) {
    if (!nums[i]) {
      nums.splice(i, 1);
      nums.push(0);
    }
  }
};
