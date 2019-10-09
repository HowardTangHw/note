/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            nums.splice(i, 1);
            i -= 1;
        }
    }
    return nums.length;
};

var removeDuplicates = function(nums) {
    let i = 0;
    let count = 1;
    let left = 0;
    while (i < nums.length) {
        if (nums[left] != nums[i]) {
            left++;
            nums[left] = nums[i];
            count++;
        }
        i++;
    }
    return count;
};
