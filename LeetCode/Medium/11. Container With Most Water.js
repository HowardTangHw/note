/**
 * @param {number[]} height
 * @return {number}
 */
// 暴力解法,所有的都算一次
var maxArea = function(height) {
  let maxArea = 0;
  for (let i = 0; i < height.length; i++) {
    for (let j = 0; j < height.length; j++) {
      maxArea = Math.max(maxArea, Math.min(height[i], height[j]) * (j - i));
    }
  }
  return maxArea;
};

// Two Pointer Approach
// 指针矮的就要换掉,换成比较高的,希望找到高度优势比宽度优势大的
var maxArea = function(height) {
  let maxArea = 0,
    l = 0,
    r = height.length - 1;
  while (l < r) {
    maxArea = Math.max(maxArea, Math.min(height[l], height[r]) * (r - l));
    if (height[l] > height[r]) {
      r--;
    } else {
      l++;
    }
  }
};
