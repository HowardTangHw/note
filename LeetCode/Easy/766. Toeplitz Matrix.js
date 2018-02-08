//link:https://leetcode.com/problems/toeplitz-matrix/description/
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function(matrix) {
  let sLen = matrix[0].length,
    aLen = matrix.length;
  if(aLen==1) return true;
  for (var i = 0; i < aLen-1; i++) {
    for (var j = 0; j < sLen-1; j++) {
      if (matrix[i][j] !== matrix[i + 1][j + 1]) return false;
    }
  }
  return true;
};
