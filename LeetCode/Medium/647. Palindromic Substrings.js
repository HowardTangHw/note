// DP
// https://www.jianshu.com/p/786aee10a001
var countSubstrings = function(s) {
    let len = s.length;
    let DP = [...Array(len)].map(i => Array(len).fill(false));
    let count = 0;

    // 默认本身就是一个回文
    // 处理了长度1~2的
    for (let i = 0; i < len; i++) {
        DP[i][i] = true;
        count++;
    }

    // 处理长度大于2的
    for (let i = 1; i < len; i++) {
        for (let j = 0; j + i < len; j++) {
            if (i == 0) {
                DP[j][j + i] = s[j] === s[j + i];
            } else {
                DP[j][j + i] = s[j] === s[j + i] && DP[j + 1][j + i - 1];
            }
            if (DP[j][j + i]) count++;
        }
    }
    return count;
};

var countSubstrings = function(s) {
    let len = s.length,
        odd = 0,
        even = 0;

    for (let i = 0; i < len; i++) {
        even += count(s, len, i, i + 1);
        odd += count(s, len, i, i + 2);
    }
    return len + odd + even;

    function count(s, len, left, right) {
        let c = 0;
        while (left >= 0 && right < len && s[left] === s[right]) {
            c++;
            left--;
            right++;
        }
        return c;
    }
};
