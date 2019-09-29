/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let res = [];
    backTracking(res, '', 0, 0, n);
    console.log(res);
    return res;
};
var backTracking = function(res, str, open, close, n) {
    // console.log(str);
    if (str === n * 2) {
        res.push(str);
        return;
    }
    if (open < n) {
        backTracking(res, str + '(', open + 1, close, n);
    }
    if (close < open) {
        backTracking(res, str + ')', open, close + 1, n);
    }
};

// (((
// ((()
// ((())
// ((()))
// (()
// (()(
// (()()
// (()())
// (())
// (())(
// (())()
// ()
// ()(
// ()((
// ()(()
// ()(())
// ()()
// ()()(
// ()()()
