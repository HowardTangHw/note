// link:https://leetcode.com/problems/rotated-digits/description/
/**
 * @param {number} N
 * @return {number}
 */
var rotatedDigits = function(N) {
  let res = 0;
  for (let i = 1; i <= N; ++i) {
    if (isGood(i, false)) res++;
  }
  return res;
};

var isGood = (n, flag) => {
  if (n == 0) return flag;
  let d = Math.floor(n % 10);
  if (d == 3 || d == 4 || d == 7) return false;
  if (d == 0 || d == 1 || d == 8) return isGood(Math.floor(n / 10), flag);
  return isGood(Math.floor(n / 10), true);
};

// use Set
var rotatedDigits = function(N) {
  let res = 0;
  for (let i = 1; i <= N; ++i) {
    if (isGood(i)) res++;
  }
  return res;
};
var isGood = n => {
  let d = new Set(n+'');
  if (d.has('3') || d.has('4') || d.has('7')) return false;
  if (!d.has('2') && !d.has('5') && !d.has('6') && !d.has('9')) return false;
  return true;
};
