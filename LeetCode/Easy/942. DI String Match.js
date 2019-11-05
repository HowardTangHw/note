/**
 * @param {string} S
 * @return {number[]}
 */
// greedy
// 当长度为4得时候，我们需要填入的是0,1,2,3,4
// 当遇到 `I`的时候 我们需要填入最小的数，以满足后续的 `I` 因为A[i]<A[i+1];
// 当我们遇到 `D`的数,我们要填入最大的数,以满足后续的所有情况(同上)
// 这跟`贪心`很相似,我们选择一些最能满足下一个循环的情况的数字
var diStringMatch = function(S) {
    let result = Array(S.length).fill(0),
        left = 0,
        right = S.length;
    for (let i = 0; i < S.length; i++) {
        let cur = S[i];
        result[i] = cur === 'I' ? left++ : right--;
    }
    result[S.length] = right;
    return result;
};
