//link https://leetcode.com/problems/reverse-integer/description/
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  var minn = -(1 << 30) * 2;
  var maxn = (1 << 30) * 2 - 1;
  var flag = x > 0 ? 0 : 1;
  var length = x.toString().length - flag,
    r = 0;
  var a = Math.abs(x);
  for (var i = 0; i < length; i++) {
    r = r * 10 + parseInt(a % 10);
    a = Math.floor(a / 10);
  }
  if (flag) r *= -1;
  if (r < minn || r > maxn) return 0;
  else return r;
};
x = 1534236469;
reverse(x);
