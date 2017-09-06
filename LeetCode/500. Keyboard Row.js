/**
 * link:https://leetcode.com/problems/keyboard-row/description/
 */

/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
  var key = ["qwertyuiop", "asdfghjkl", "zxcvbnm"],
    result = [];
  words.forEach(function(w) {
    let set = new Set();
    let word = w.toLowerCase();
    for (let k of word) {
      for (var i = 0; i < key.length; i++) {
        if (key[i].indexOf(k) !== -1) set.add(i);
      }
    }
    if(set.size==1)result.push(w);
  });
  return result ;
};
