/**
 * @param {number} N
 * @return {boolean}
 */
let memo = {};
var divisorGame = function(N) {
    return Alice(N);
};
var Alice = function(n) {
    if (n == 1) return false;
    if (memo[n] !== undefined) return memo[n];
    for (let i = 1; i < n; i++) {
        if (n % i == 0) {
            if (!Bob(n - i)) {
                memo[n] = true;
                return true;
            }
        }
    }
    memo[n] = false;
    return false;
};

var Bob = function(n) {
    if (n == 1) return false;
    if (memo[n] !== undefined) return memo[n];
    for (let i = 1; i < n; i++) {
        if (n % i == 0) {
            if (!Alice(n - i)) {
                memo[n] = true;
                return true;
            }
        }
    }
    memo[n] = false;
    return false;
};

var divisorGame = function(N) {
    return N % 2 == 0;
};
