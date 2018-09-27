/**
 * @param {number[][]} nums
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function(nums, r, c) {
  if (r * c !== nums.length * nums[0].length) return nums;
  let result = [];
  // 将二维数组转1维
  let onNums = flatten(nums);
  for (let i = 0; i < r; i++) {
    result[i] = onNums.slice(i * c, (i + 1) * c);
  }
  return result;
};

const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
