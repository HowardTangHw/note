/**
 * @param A: sorted integer array A
 * @param B: sorted integer array B
 * @return: A new sorted integer array
 */
const mergeSortedArray = function(A, B) {
  return A.concat(B).sort((a, b) => a - b);
};

const mergeSortedArray = function(A, B) {
  let reusltArr = [];
  while (A.length != 0 || B.length != 0) {
    if ((A[0] && B[0] && A[0] <= B[0]) || (A[0] && B[0] == undefined)) {
      reusltArr.push(A.shift());
    }
    if ((A[0] == undefined && B[0]) || (A[0] && B[0] && A[0] >= B[0])) {
      reusltArr.push(B.shift());
    }
  }
  return reusltArr;
};
