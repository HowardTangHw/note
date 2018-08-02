// link:https://leetcode.com/problems/rotate-string/description/
/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
var rotateString = function(A, B) {
  return A.length === B.length && (A + A).includes(B);
};

var rotateString = function(A, B) {
  let C = B + B;
  let i = C.indexOf(A);
  if (!~i) return false;
  let D = C.slice(i + B.length) + C.slice(0, i);
  return D == A;
};
