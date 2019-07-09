/**
 * @param {string} S
 * @return {string}
 */

var removeOuterParentheses = function(S) {
    let depth = 0;
    let res = '';

    S.split('').forEach(v => {
        if (v === ')') depth--;
        if (depth > 0) res += v;
        if (v === '(') depth++;
    });
    return res;
};
