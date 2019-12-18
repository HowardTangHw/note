/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  if (nums.length == 0) return [];
  let res = [];
  let right = k - 1,
    window = [];
  for (let i = 0; i < k; i++) {
    window.push(nums[i]);
  }

  while (right < nums.length) {
    res.push(Math.max(...window));
    right++;
    window.shift();
    window.push(nums[right]);
  }
  return res;
};

var maxSlidingWindow = function(nums, k) {
  // queue[0]為該區間最大值的下標
  let queue = [];
  let l = nums.length;
  let res = [];
  for (let i = 0; i < l; i++) {
    // sort
    while (queue.length > 0 && nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop();
    }
    // 區間不符合，去掉頭
    if (queue.length && i - queue[0] >= k) queue.shift();
    queue.push(i);
    // 在區間裏 拿出最大值queue[0];
    if (i >= k - 1) {
      res.push(nums[queue[0]]);
    }
  }

  return res;
};
