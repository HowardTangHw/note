/**
 * @param {number} n
 * @return {number}
 */

var numSquares = function(n) {
    const memo = Array(n + 1).fill(0);
    var bfs = function(n) {
        if (memo[n] != 0) return memo[n];
        let val = Math.floor(Math.sqrt(n));
        if (val * val == n) {
            memo[n] = 1;
            return memo[n];
        }

        let res = Number.MAX_SAFE_INTEGER;
        for (let i = 1; i * i < n; i++) {
            // +1 為 i
            res = Math.min(res, bfs(n - i * i) + 1);
        }
        memo[n] = res;
        return res;
    };

    return bfs(n);
};

var numSquares = function(n) {
    var dp = Array(n + 1).fill(0);
    for (let i = 0; i < n + 1; i++) dp[i] = i;
    for (let i = 2; i < n; i++) {
        for (let j = 1; j * j < i; j++) {
            // +1 為 j
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }

    return dp[n];
};

let memo = [];
var numSquares = function(n) {
    if (n == 0) return 0;
    if (memo[n]) return memo[n];
    let res = n;
    for (let i = 1; i * i <= n; i++) {
        let count = numSquares(n - i * i) + 1;
        res = res > count ? count : res;
    }
    memo[n] = res;
    return res;
};
