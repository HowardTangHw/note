/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    if (N == 0 || N == 1) return N;
    return fib(N - 1) + fib(N - 2);
};

var fib = function(N) {
    if (N <= 1) return N;
    let first = 0;
    let second = 1;
    let result = 0;
    let i = 2;

    while (i <= N) {
        result = first + second;
        first = second;
        second = result;
        i++;
    }
    return result;
};

// use memo
const memo = {};

var fib = function(N) {
    if (memo[N]) return memo(N);
    if (N == 0 || N == 1) return N;
    const res = fib(N - 1) + fib(N - 2);
    memo[N] = res;
    return res;
};
