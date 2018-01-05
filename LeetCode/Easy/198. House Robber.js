// link:https://leetcode.com/problems/house-robber/description/
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * 当前不偷的最大收益取决于前面偷了或者没偷两者之间最大的收益
 * 即 n = max(n-1偷了,n-1没偷);
 * 当前偷的收益取决于前面不偷的最大收益
 * 即 n偷了 = n-1不偷 + n可以偷的
 * */

var rob = function(nums) {
  let len = nums.length;
  let a = 0,
    b = 0;
  for (let i = 0; i < len; i++) {
    if (i % 2 == 0) {
      //当前偷了和没偷的利益对比
      a = Math.max(a + nums[i], b);
    } else {
      //看看是当前偷的利益高还是 不偷的利益高
      b = Math.max(a, b + nums[i]);
    }
  }
  return Math.max(a, b);
};


/**
 * link:https://github.com/hanzichi/leetcode/blob/master/Algorithms/House%20Robber/house-robber.js
 * 用@hanzichi的更容易解释
 * d[i][0]存放的是当前不偷的话最大的收益----当前不偷的最大收益取决于前面偷了或者没偷两者之间最大的收益
 * d[i][1]存放的是当前偷的话的最大收益----当前偷的收益取决于前面不偷的最大收益
*/
var rob = function(nums) {
  var len = nums.length;
  if (!len) return 0;

  var dp = [];
  dp[0] = [];
  dp[0][0] = 0, // not steal 1st room
  dp[0][1] = nums[0]; // steal 1st room

  for (var i = 1; i < len; i++) {
    dp[i] = [];
    // 当前不偷的话 最大收益是前面偷了或者没偷两者之间最大的收益
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
    // 当前偷了的话,取决于前面不偷的最大收益
    dp[i][1] = dp[i - 1][0] + nums[i];
  }

  return Math.max(dp[len - 1][0], dp[len - 1][1]);
};