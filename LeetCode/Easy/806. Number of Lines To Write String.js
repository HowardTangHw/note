// link:https://leetcode.com/problems/number-of-lines-to-write-string/description/
/**
 * @param {number[]} widths
 * @param {string} S
 * @return {number[]}
 */
var numberOfLines = function(widths, S) {
  let def = 97,
    line = 1,
    width = 0,
    arr = S.split('');
  for (let i = 0; i < arr.length; i++) {
    let now = arr[i].charCodeAt() - def;
    let w = widths[now];
    width += w;
    if (width > 100) {
      line++;
      width = w;
    }
  }
  return [line, width];
};
