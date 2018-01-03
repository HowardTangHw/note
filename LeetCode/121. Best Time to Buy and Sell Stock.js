// link:https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let ans = 0,
    buy = prices[0],
    len = prices.length;
  for (var i = 1; i < len; i++) {
    let sell = prices[i];
    if (sell > buy) {
      if (ans < sell - buy) {
        ans = sell - buy;
      }
    } else {
      buy = sell;
    }
  }
  return ans;
};

var maxProfit = function(prices) {
  let maxSoFar = 0,
    maxCur = 0,
    len = prices.length;
  for (var i = 1; i < len; i++) {
    maxCur = Math.max(0, prices[i] - prices[i - 1]);
    maxSoFar = Math.max(maxCur, maxSoFar);
  }
  return maxSoFar;
};
