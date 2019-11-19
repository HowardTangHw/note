var NumArray = function(nums) {
  this.nums = nums;
  this.dp = Array(nums.length).fill(0);
  this.dp[0] = nums[0];
  for (let i = 1; i <= nums.length; i++) {
    this.dp[i] = this.dp[i - 1] + nums[i];
  }
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
  return this.dp[j] - this.dp[i] + this.nums[i];
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
