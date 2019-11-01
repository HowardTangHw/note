/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
// DFS
var findTargetSumWays = function(nums, S) {
    const total = nums.reduce((a, b) => a + b);
    if (total < S) return 0;
    return dfs(nums, 0, S, 0);
};
var dfs = function(nums, sum, S, index) {
    if (index === nums.length) {
        if (S === sum) return 1;
        return 0;
    }
    return (
        dfs(nums, sum + nums[index], S, index + 1) +
        dfs(nums, sum - nums[index], S, index + 1)
    );
};
