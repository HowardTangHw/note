/**
 * link:https://leetcode.com/problems/flipping-an-image/description/
 */
/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function(A) {
  let B = [];
  A.forEach(a => {
    let temp = [];
    a.reverse().forEach(e => {
      temp.push(e ^ 1);
    });
    B.push(temp);
  });
  return B;
};

var flipAndInvertImage = function(A) {
  return A.map(row => row.reverse().map(e => e ^ 1));
};
