/**
 * link:https://leetcode.com/problems/array-partition-i/discuss/
 */ 
/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function(nums) {
  var arr = nums.sort(function(a,b){return a-b})
      result = 0;
  for(var i =0;i<arr.length;i=i+2){
      result += arr[i];
  }
  return result
};



var arrayPairSum =function(nums){
  var len = nums.length,
      t=0,
      result=0;
  for(var i =0;i<len;i++){
    for(var j=1;j<len;j++){
      if(nums[j-1]>nums[j]){
        t=nums[j-1];
        nums[j-1]=nums[j];
        nums[j]=t;
      }
    }
  }
  for(var k =0;k<nums.length;k=k+2){
    result += nums[k];
}
  return result;
}
