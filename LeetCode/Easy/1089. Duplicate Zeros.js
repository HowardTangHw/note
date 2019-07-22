/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function(arr) {
    let len = arr.length;
    let index = 0;
    for (let i = 0; index < len; i++) {
        if (arr[i] == 0) {
            arr.push(0);
            index++;
        }
        if (index == len) break;
        arr.push(arr[i]);
        index++;
    }
    arr.splice(0, len);
};
