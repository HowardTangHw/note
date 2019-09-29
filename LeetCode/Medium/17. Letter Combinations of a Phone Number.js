/**
 * @param {string} digits
 * @return {string[]}
 */
const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
};
var letterCombinations = function(digits) {
    let res = [];
    const len = digits.length;
    if (len <= 0) return [];
    backTracking(res, digits, '', len, 0);
    return res;
};

var backTracking = function(res, digits, str, len, warpIndex) {
    if (str.length === len) {
        res.push(str);
        return;
    }
    let mapKey = map[digits[warpIndex]];
    for (let c of mapKey) {
        backTracking(res, digits, str + c, len, warpIndex + 1);
    }
};
