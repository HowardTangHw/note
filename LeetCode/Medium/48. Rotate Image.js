/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// https://leetcode.com/problems/rotate-image/discuss/159431/javascript-solution-with-example
var rotate = function(matrix) {
    if(!matrix || matrix.length<0) return []; 
    matrix.reverse()
    for(let i =0;i<matrix.length;i++){
        for(let j=i;j<matrix[0].length;j++){
            [matrix[i][j],matrix[j][i]]=[matrix[j][i],matrix[i][j]]
        }
    } 
}
 
