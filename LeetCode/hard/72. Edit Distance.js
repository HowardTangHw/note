/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 * i为word1长度 j为word2长度
 * 定义dp[i][j]则为 word1转换到word2需要噶步骤
 * 如果word1[i]==word2[j] dp[i] [j] = dp[i-1] [j-1] + 1;
 * dp[i] [j] = dp[i] [j-1] + 1;
 * dp[i] [j] = dp[i-1] [j] + 1;
 * dp[i] [j] = dp[i-1] [j-1] + 1;
 * 有三种等式，寻找最小的
 * dp[i] [j] = min(dp[i-1] [j-1]，dp[i] [j-1]，dp[[i-1] [j]]) + 1;
 */

var minDistance = function(word1, word2) {
  const w1Len = word1.length;
  const w2Len = word2.length;
  const dp = initMatrix(w1Len, w2Len);
  dp[0][0] = 0;
  for (let i = 1; i <= w1Len; i++) {
    dp[i][0] = i;
  }
  for (let i = 1; i <= w2Len; i++) {
    dp[0][i] = i;
  }
  for (let i = 1; i <= w1Len; i++) {
    for (let j = 1; j <= w2Len; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
      }
    }
  }
  return dp[w1Len][w2Len];
};
const initMatrix = function(m, n) {
  let matrix = [];

  for (let i = 0; i < m + 1; i++) {
    matrix[i] = new Array(n + 1).fill(0);
  }

  return matrix;
};
