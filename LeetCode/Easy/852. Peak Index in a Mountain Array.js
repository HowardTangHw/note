/**
 * link:https://leetcode.com/problems/peak-index-in-a-mountain-array/description/
 */

/**
 * @param {number[]} A
 * @return {number}
 */
var peakIndexInMountainArray = function(A) {
  for (let i = 0, len = A.length; i < len; i++) {
    if (A[i] > A[i + 1]) return i;
  }
};

// 二分查找法
var peakIndexInMountainArray = function(A) {
  let l = 0,
    r = A.length - 1,
    mid;
  while (l < r) {
    mid = Math.floor((l + r) / 2);
    console.log(mid);
    if (A[mid] < A[mid + 1]) {
      l = mid;
    } else if (A[mid - 1] > A[mid]) {
      r = mid;
    } else {
      return mid;
    }
  }
  console.log(l, r, mid);
};

// Golden Section Search
let peakIndexInMountainArray = function(A) {
  let gold1 = (l, r) => l + Math.round((r - l) * 0.382);
  let gold2 = (l, r) => l + Math.round((r - l) * 0.618);
  let l = 0,
    r = A.length - 1;
  let [x1, x2] = [gold1(l, r), gold2(l, r)];
  while (x1 < x2) {
    if (A[x1] < A[x2]) {
      l = x1;
      x1 = x2;
      x2 = gold1(x1, r);
    } else {
      r = x2;
      x2 = x1;
      x1 = gold2(l, x2);
    }
  }
  if (A[x1 + 1] > A[x1] && A[x1] > A[x1 - 1]) {
    return r;
  }
  if (A[x1 + 1] < A[x1] && A[x1] < A[x1 - 1]) {
    return l;
  }
  return x1;
};
