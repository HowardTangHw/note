/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    return nums.sort((a, b) => b - a)[k - 1];
};

//  Quickselect
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

// https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E9%80%89%E6%8B%A9
// 快速排序中，有一個子過程稱為分區，可以在線性時間裡將一個列表分為兩部分（left和right），分別是小於基準和大於等於基準的元素。
const partition = (arr, left, right) => {
    let pivotIndex = Math.floor(Math.random() * (right - left + 1) + left);
    let pivotValue = arr[pivotIndex];
    let idx = left;
    swap(arr, pivotIndex, right); // move pivot to end;
    for (let i = left; i < right; i++) {
        if (arr[i] < pivotValue) {
            swap(arr, i, idx);
            idx++;
        }
    }
    swap(arr, right, idx); // move pivot to final place
    return idx; // 基准点,左边都比pivot小,右边比pivot大
};

const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};
