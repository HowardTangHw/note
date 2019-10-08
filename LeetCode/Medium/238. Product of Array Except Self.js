/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    let res = [];
    for (let i = 0; i < nums.length; i++) {
        res.push(d(nums, i));
    }
    return res;
};
var d = function(nums, i) {
    let res = 1;
    for (let j = 0; j < nums.length; j++) {
        if (j == i) continue;
        res *= nums[j];
    }
    return res;
};

var productExceptSelf = function(nums) {
    let len = nums.length;
    let l = [1],
        r = Array(len).fill(1),
        result = [];

    for (let i = 1; i < nums.length; i++) {
        l[i] = nums[i - 1] * l[i - 1];
    }
    for (let i = nums.length - 2; i >= 0; i--) {
        r[i] = r[i + 1] * nums[i + 1];
    }
    for (let i = len - 1; i >= 0; i--) {
        result[i] = l[i] * r[i];
    }
    return result;
};
