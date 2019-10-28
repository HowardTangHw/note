/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// DP
// [1,1,1]
// [1,2,3]
// [1,3,6]
var uniquePaths = function(m, n) {
    let martix = new Array(m).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < m; i++) martix[i][0] = 1;
    for (let i = 0; i < n; i++) martix[0][i] = 1;

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            martix[i][j] = martix[i - 1][j] + martix[i][j - 1];
        }
    }

    return martix[m - 1][n - 1];
};
