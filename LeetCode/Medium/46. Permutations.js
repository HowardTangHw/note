// backtrack
var permute = function(nums) {
    const res = [];
    backtrack(nums, res);
    return res;
};

function backtrack(nums, res, n = 0) {
    if (n === nums.length) {
        res.push(nums.slice(0));
        return;
    }
    for (let i = n; i < nums.length; i++) {
        [nums[i], nums[n]] = [nums[n], nums[i]];
        backtrack(nums, res, n + 1);
        [nums[n], nums[i]] = [nums[i], nums[n]];
    }
}
