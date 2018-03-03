//link:https://leetcode.com/problems/intersection-of-two-arrays-ii/description/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  let result = [],
    hash = {};
  nums1.forEach(v => {
    hash[v] = hash[v] + 1 || 1;
  });
  nums2.forEach(v => {
    if (hash[v]) {
      result.push(v);
      hash[v]--;
    }
  });
  return result;
};
