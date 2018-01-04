/**
 * link:https://leetcode.com/problems/next-greater-element-i/description/
 */

/**
 * @param {number[]} findNums
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElement = function(findNums, nums) {
  var result = [];
  for (var i = 0; i < findNums.length; i++) {
    var flag = 0;
    var j = nums.indexOf(findNums[i]);
    for (; j < nums.length; j++) {
      if (nums[j] > findNums[i]) {
        result.push(nums[j]);
        flag = 1;
        break;
      }
    }
    if (flag == 0) result.push(-1);
  }
  return result;
};


/**
 * 利用hash和stack ,在nums中,寻找比自身大的数,如果有则存入hash中
 * 将nums[i]存入stack中
 * stack的最后一位比i小的话,进入循环,
 * stack的最后一位出栈,并且在hash对象中记录下来,key是stack最后一位的值,value是比他大的值
 */ 
var nextGreaterElement = function(findNums,nums){
  var stack=[];
  var obj={};
  for(var i in nums){
    while (stack[stack.length-1]<i){
      obj[stack.pop()]=i;
    }
    stack.push(i);
  }
  return findNums.map(i => obj[i] || -1)
}
var nums1=[1,4,3],
nums2=[5,3,4,2];
nextGreaterElement(nums1,nums2);