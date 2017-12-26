// link:https://leetcode.com/problems/reverse-string-ii/description/
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */

var reverseStr = function(s, k) {
  let strArray = s.split('');
  function reverse(arr, start, end) {
    while (start < end) {
      let temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      ++start;
      --end;
    }
  }
  let start = 0;
  // 用于判断长度比不比K长  如果比K长 则可以调换顺序
  let end = Math.min(k - 1, s.length - 1);
  while (start <= s.length) {
    reverse(strArray, start, end);
    start += 2 * k;
    end = Math.min(start + k - 1, s.length - 1);
  }
  return strArray.join('');
};
