// link:https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/
/**
 * @param {number[]} prices
 * @return {number}
 */

//  只要后一天比前一天便宜,就卖
var maxProfit = function(prices) {
  let ans = 0;
  len = prices.length;
  for (var i = 0; i < len - 1; i++) {
    let sell = prices[i + 1],
      buy = prices[i];
    if (sell > buy) ans += sell - buy;
  }
  return ans;
};
