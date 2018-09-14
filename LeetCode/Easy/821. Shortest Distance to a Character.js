/**
 * @param {string} S
 * @param {character} C
 * @return {number[]}
 */
var shortestToChar = function(S, C) {
  let CIndex = -1;
  let result = [];
  for (let i = 0; i < S.length; i++) {
    if (S.charAt(i) === C) CIndex = i;
    if (CIndex < 0) {
      result.push(S.length);
    } else {
      result.push(i - CIndex);
    }
  }

  CIndex = -1;
  for (let i = S.length - 1; i >= 0; i--) {
    if (S.charAt(i) === C) CIndex = i;
    if (CIndex >= 0) {
      result[i] = Math.min(result[i], CIndex - i);
    }
  }

  return result;
};
