// link:https://leetcode.com/problems/fair-candy-swap/description/
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */

/**
 * SA + y - x = SB - y + x
 * 2y = SB-SA +2x
 * y = (SB-SA)/2 + x
 *
 * 所以 如果Alice给了X个糖果的话,她应该得到Y个 Y=(SB-SA)/2 + x
 *
 * 通过数学的方式,将本来两个变量的东西 转换为一个变量
 */
var fairCandySwap = function(A, B) {
  let Sa = 0,
    Sb = 0;
  for (let i = 0; i < A.length; i++) {
    Sa += A[i];
  }
  for (let i = 0; i < B.length; i++) {
    Sb += B[i];
  }
  let delta = (Sb - Sa) / 2;
  let setB = new Set(B);

  for (let i = 0; i < A.length; i++) {
    if (setB.has(A[i] + delta)) return [A[i], A[i] + delta];
  }

  return null;
};
