/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestEqualSubarray = function (nums, k) {
  let n = nums.length;
  let pos = new Map();
  for (let i = 0; i < n; i++) {
    if (!pos.has(nums[i])) {
      pos.set(nums[i], []);
    }
    pos.get(nums[i]).push(i);
  }

  let ans = 0;
  for (let vec of pos.values) {
    for (let l = 0, r = 0; r < vec.length; r++) {
      // ver[r] - ver[l] 为实际长度
      // r-l为count[x]
      // 实际长度-x的个数，剩下的就是要删去元素的个数
      while (vec[r] - vec[l] - (r - l) > k) {
        l++;
      }
      ans = Math.max(r - l + 1, ans);
    }
  }
  return ans;
};
