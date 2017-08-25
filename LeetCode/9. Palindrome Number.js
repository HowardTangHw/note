/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  return x.toString() === x.toString().split("").reverse().join("");
};

function isPalindrome(x) {
  if (x < 0 || (x != 0 && x % 10 === 0)) return false;
  var x1 = x,
    res = 0;
  while (x1 >= 1) {
    res = res * 10 + x1 % 10;
    x1 = Math.floor(x1 / 10);
  }
  return res === x;
}

