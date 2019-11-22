/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let res = 0,
        nums = 0,
        hashStr = '';

    for (let n of s) {
        if (hashStr.indexOf(n) === -1) {
            hashStr += n;
            nums++;
            res = res < nums ? nums : res;
        } else {
            hashStr += n;
            hashStr = hashStr.slice(hashStr.indexOf(n) + 1);
            nums = hashStr.length;
        }
    }
    return res;
};
