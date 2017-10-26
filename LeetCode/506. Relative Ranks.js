/**
 * link:https://leetcode.com/problems/relative-ranks/description/
 */
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var findRelativeRanks = function(nums) {
  let hash = [];
  nums.forEach((e, i) => {
    hash.push({
      c: e,
      i: i
    });
  });
  hash.sort((a, b) => b.c - a.c);
  hash.forEach((e, i) => {
    if (i == 0) nums[e.i] = 'Gold Medal';
    if (i == 1) nums[e.i] = 'Silver Medal';
    if (i == 2) nums[e.i] = 'Bronze Medal';
    if (i > 2) nums[e.i] = '' + (i + 1);
  });
  return nums;
};
