/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
/**
 * dp[i][j] = a[i] == b[j] ? 1 + dp[i + 1][j + 1] : 0;
 * dp[i][j] : max lenth of common subarray start at a[i] & b[j];
 */

// Dp martix
var findLength = function(A, B) {
    let Alen = A.length;
    let Blen = B.length;
    if (Alen == 0 || Blen == 0) return 0;
    let max = 0;
    let dp = Array(Alen + 1)
        .fill(0)
        .map(() => Array(Blen + 1).fill(0));
    for (let i = Alen - 1; i >= 0; i--) {
        for (let j = Blen - 1; j >= 0; j--) {
            if (A[i] === B[j]) {
                dp[i][j] = 1 + dp[i + 1][j + 1];
                max = Math.max(max, dp[i][j]);
            }
        }
    }
    return max;
};
