/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */

/**
 * 求的是B数组最大值和最小值的最小可能, 而且可以对A数组进行处理,处理的值为-K <= x <= K
 * 既然求最小可能,那么Max(B)=Max(A)-K Min(B)=Min(B)+K
 */
var smallestRangeI = function(A, K) {
  let maxA = Math.max(...A);
  let minA = Math.min(...A);

  return Math.max(0, maxA - minA - 2 * K);
};
