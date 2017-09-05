/**
 * link:https://leetcode.com/problems/search-insert-position/description/
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  var len = nums.length;
  var index = nums.findIndex(function(n) {
    return target <= n;
  });
  index = index >= 0 ? index : len;
  return index;
};

//binary search
var searchInsert = function(nums, target) {
  var index = binary(0, nums.length - 1);
  function binary(low, high) {
    if (low <= high) {
      if (nums[low] >= target) {
        return low;
      }
      if (nums[high] < target) {
        return high+1;
      }
      if (nums[high] === target) {
        return high;
      }
    }
    var mid = Math.ceil((low+high)/2);
    if(nums[mid]===target){
      return mid;
    }
    if(nums[mid]<target){
      return binary(mid+1,high);
    }
    if(nums[mid]>target){
      return binary(low,mid-1);
    }
  }
  return index;
};
