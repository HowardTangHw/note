/**
 * link:https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/description/
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */

/**
 * i从0开始加,取出当前nums[i]的值
 * 例如: nums[0]=10
 * 需要-1 因为在这个数组里是从1开始的
 * 然后将nums[nums[0]]=nums[10-1]的值改为负数,
 * 如果10这个位置的数 为负数,则证明 10是存在的
 * 如果这个位置的数 是整数,则证明是不存在的(因为没经过 取负数的过程) 
 */

var findDisappearedNumbers = function(nums) {
  var res = [];
  for (let i = 0; i < nums.length; i++) {
    var index = nums[i];
    // 如果nums[i]所在位置存在值,则赋值为-1; 这里取绝对值,
    if (nums[Math.abs(index) - 1] > 0) {
      //因为这里会将那个位置的数 改为负数,用于下方循环判断
      nums[Math.abs(index) - 1] = -nums[Math.abs(index) - 1];
    }
  }
  for (let j = 1; j <= nums.length; j++) {
    if (nums[j - 1] > 0) res.push(j);
  }
  return res;
};


/**
 * hash
 * 其实和上面的差不多.. 
 */
var findDisappearedNumbers = function(nums) {
  let len = nums.length;
  let hash = {};
  let res = [];
  nums.forEach(function(element) {
    hash[element] = true;
  }, this);

  for (var i = 1; i <= len; i++) {
    !hash[i] && res.push(i);
  }
  return res;
};
