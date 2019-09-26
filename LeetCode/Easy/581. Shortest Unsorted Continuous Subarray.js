/**
 * @param {number[]} nums
 * @return {number}
 */

// 从左往右是升序的，所以要找到最后一个违反升序原则的索引
// 从右往左是降序的，要找到最前面一个违反降序原则的索引

var findUnsortedSubarray = function(nums) {
    let max = Number.MIN_SAFE_INTEGER;
    let min = Number.MAX_SAFE_INTEGER;
    let left = 0;
    let right = 0;
    let i = 0;
    let j = nums.length - 1;
    while (i < nums.length && j >= 0) {
        if (nums[i] < max) left = i;
        max = Math.max(nums[i], max);
        if (nums[j] > min) right = j;
        min = Math.min(nums[j], min);
        i++;
        j--;
    }
    return left === right ? 0 : left - right + 1;
};
