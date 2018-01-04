/**
 * link:https://leetcode.com/problems/add-digits/description/
 */
/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
  if (num < 10) {
    return num;
  }
  num = Math.floor(num / 10) + num % 10;
  f = addDigits(num);
  return f;
};

addDigits(10);
