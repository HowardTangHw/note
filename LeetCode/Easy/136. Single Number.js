/**
 * link:https://leetcode.com/problems/single-number/description/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */

var singleNumber = function(nums) {
  return +nums
    .concat()
    .sort()
    .filter(function(value, index, array) {
      return value != array[index - 1] && value != array[index + 1];
    });
};

/**
 * 这道题中,只有一个是single Number,可以使用异或运算符
 * 口诀：相同取0，相异取1
 * 这道题中:
 * 规则,a^b,a<b则相加, a=b则为0 a>b则相减
 */

var singleNumber = function(nums){
  var res;
  for(var i=0;i<nums.length;i++){
    res ^= nums[i];
  }
  return res;
}
