/**
 * link:https://leetcode.com/problems/number-complement/description/
 */ 
/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
  return parseInt(num.toString(2).split('').map((x)=>x===0?1:0).join(''),2);
};

// replace 用正则速度快很多
var findComplement = function(num) {
  return parseInt(num.toString(2).replace(/[0|1]/g,(nums)=>Number(nums)^1),2);
};