//link:https://leetcode.com/problems/longest-word-in-dictionary/description/
/**
 * @param {string[]} words
 * @return {string}
 */

//  正常
var longestWord = function(words) {
  words.sort();
  let set = new Set(words),
    res = '';
  for (const w of words) {
    let isVaild = true,
      key = '';
    for (let i = 0, len = w.length - 1; i < len; i++) {
      key += w[i];
      if (!set.has(key)) {
        isVaild = false;
        break;
      }
    }
    if (isVaild && w.length > res.length) {
      res = w;
    }
  }
  return res;
};
