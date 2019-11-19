/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function(piles) {
  var sortArr = piles.sort((a, b) => b - a);
  let dp = 0;
  for (let i = 0; i < sortArr.length; i++) {
    dp = dp + (i % 2 == 0) ? sortArr[i] : -sortArr[i];
  }
  return dp > 0;
};

// 偶數堆 先手必勝
var stoneGame = function(piles) {
  return true;
};
