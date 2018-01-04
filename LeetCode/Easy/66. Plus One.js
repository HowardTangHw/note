/**
 * link:https://leetcode.com/problems/plus-one/description/
 */
/**
 * 题目与415.Add String几乎一样,415更难
 * link:https://leetcode.com/problems/add-strings/description/
 */

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let i = digits.length,
    carry = 0,
    dis = 0;
  digits[len - 1]++;
  // 处理进位
  while (i--) {
    dis = digits[i] + carry;
    digits[i] = dis % 10;
    carry = ~~(dis / 10);
  }
  if (carry) digits.unshift(carry);
  return digits;
};
