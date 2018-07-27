// link:https://leetcode.com/problems/transpose-matrix/description/

/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var transpose = function(A) {
  let aLen = A.length,
    sLen = A[0].length,
    res = [];
  for (let i = 0; i < sLen; i++) {
    res[i] = [];
    for (let j = 0; j < aLen; j++) {
      res[i][j] = A[j][i];
    }
  }
  return res;
};

// https://github.com/Chalarangelo/30-seconds-of-code#unzip
const transpose = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length)),
    }).map(x => [])
  );
