/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParity = function(A) {
  let j = [],
    o = [];

  for (let i = 0, len = A.length; i < len; i++) {
    if (A[i] % 2 == 0) {
      o.push(A[i]);
      continue;
    }
    j.push(A[i]);
  }
  return o.concat(j);
};
