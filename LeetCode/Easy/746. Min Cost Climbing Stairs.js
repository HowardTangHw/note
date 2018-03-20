// link;https://leetcode.com/problems/min-cost-climbing-stairs/description/
/**
 * @param {number[]} cost
 * @return {number}
 */
// dp,d[i][0]存放前面走路与不走路的最小值,d[i][1]存放这一层不走的最小值
var minCostClimbingStairs = function(cost) {
  let dp = [[0, 0]];
  let n = cost.length;
  for (let i = 1; i < n + 1; i++) {
    // 需要初始化...
    dp[i] = [];
    dp[i][0] = Math.min(dp[i - 1][0] + cost[i - 1], dp[i - 1][1] + cost[i - 1]);
    dp[i][1] = dp[i - 1][0]; // not taking current step
  }
  return Math.min(dp[n][0], dp[n][1]);
};

//从后往前
var minCostClimbingStairs = function(cost) {
  let f2 = 0,
    f1 = 0;
  for (let i = cost.length - 1; i >= 0; --i) {
    let f0 = cost[i] + Math.min(f2, f1);
    f2 = f1;
    f1 = f0;
  }
  return Math.min(f2, f1);
};
