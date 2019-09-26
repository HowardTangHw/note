/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if (nums.length == 1) return nums[0];
    let maxNum = nums[0];
    for (let i = 0; i < nums.length; i++) {
        let res = nums[i];
        for (let j = i + 1; j <= nums.length; j++) {
            if (res > maxNum) maxNum = res;
            res = res + nums[j];
        }
    }
    return maxNum;
};

var maxSubArray = function(nums) {
    for (let i = 1; i < nums.length; i++) {
        nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
    }

    return Math.max(...nums);
};
