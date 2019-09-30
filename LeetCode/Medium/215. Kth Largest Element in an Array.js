/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// var findKthLargest = function(nums, k) {
//     return nums.sort((a, b) => b - a)[k - 1];
// };

var findKthLargest = function(nums, k) {
    sort(nums, 0, nums.length - 1, k);
    return nums[nums.length - k];
};

const sort = (arr, left, right, k) => {
    if (left >= right || left > arr.length - k) return;
    let idx = partition(arr, left, right);
    sort(arr, left, idx - 1, k);
    sort(arr, idx + 1, right, k);
};

const partition = (arr, left, right) => {
    const pivotIdx = Math.floor(Math.random() * (right - left + 1) + left);
    let idx = left,
        pivot = arr[pivotIdx];
    swap(arr, right, pivotIdx);
    for (let i = left; i < right; i++) {
        if (arr[i] < pivot) {
            swap(arr, i, idx);
            idx++;
        }
    }
    swap(arr, right, idx);
    return idx;
};

const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}; 
