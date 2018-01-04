/**
 * link:https://leetcode.com/problems/distribute-candies/description/
 */ 
/**
 * @param {number[]} candies
 * @return {number}
 */
// 给兄妹分糖果，糖果数量表示为偶数长度的数组，不同的数字代表不同的糖果，每个数字代表一颗糖果。现要求兄妹分得的糖果数量一样多，但是妹妹的种类必须尽量多。返回妹妹获得的糖果种类数。
var distributeCandies = function(candies) {
  var arr = candies.sort(),
  len = arr.length;
  result = 0;
  for(var i =0;i<len;i++){
    if(arr[i]!=arr[i-1]) result++;
  }
  return Math.min(result,len/2);
};

//set
var distributeCandies = function(candies) {
  return Math.min(new Set(candies).size,candies.length/2)
};
