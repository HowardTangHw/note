/**
 * @param {number} num
 * @return {number[]}
 */
var cache = {
    0: 0,
    1: 1
};
var countBits = function(num) {
    let res = [];
    for (let i = 0; i <= num; i++) {
        res.push(bitCount(i));
    }
    return res;
};

var bitCount = function(n) {
    if (cache[n]) return cache[n];
    const cacheKey = n;
    let res = 0;

    while (n != 0) {
        res += n % 2;
        n = Math.floor(n / 2);
    }

    cache[cacheKey] = res;
    return res;
};

function countBits(num) {
    const result = [];
    for (let i = 0; i <= num; i++) {
        let position = i % 2;
        let groupCt = (i / 2) | 0;
        let base = result[groupCt] || 0;
        result.push(base + position);
    }
    return result;
}
