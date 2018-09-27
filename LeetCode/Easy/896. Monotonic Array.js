/**
 * @param {number[]} A
 * @return {boolean}
 */
var isMonotonic = function(A) {
  return decFn(A) || inc(A);
};

function decFn(A) {
  for (let i = 1; i < A.length; ++i) {
    if (A[i - 1] < A[i]) return false;
  }
  return true;
}

function inc(A) {
  for (let i = 1; i < A.length; ++i) {
    if (A[i - 1] > A[i]) return false;
  }
  return true;
}

let A = [6, 5, 4, 4];
var isMonotonic = function(A) {
  let flag;

  for (let i = 0; i < A.length - 1; i++) {
    const res = A[i] - A[i + 1];
    if (res !== 0) {
      console.log(A[i], A[i + 1]);
      const status = res > 0;
      if (flag !== undefined) {
        console.log(status, flag);
        if (status !== flag) return false;
      } else {
        flag = status;
      }
    }
  }
  return true;
};
isMonotonic(A);
