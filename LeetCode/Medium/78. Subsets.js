/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let res = [];
    dfs(res, nums, 0, []);
    return res;
};
var dfs = function(res, nums, i, cur) {
    res.push(cur);
    for (; i < nums.length; i++) {
        dfs(res, nums, i + 1, [...cur, nums[i]]);
    }
};
