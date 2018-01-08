//link:https://leetcode.com/problems/intersection-of-two-arrays/description/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  let set = new Set(nums1),
    res = new Set();
  nums2.forEach(v => {
    if (set.has(v)) {
      res.add(v);
    }
  });

  return [...res];
};

var intersection = function(nums1, nums2) {
  const set = new Set(nums1);
  return [...new Set(nums2.filter(n => set.has(n)))];
};
