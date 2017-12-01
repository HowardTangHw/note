//link:https://leetcode.com/problems/ransom-note/description/
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
  var hash = {};
  for (var i = 0, len = magazine.length; i < len; i++) {
    var item = magazine[i];
    if (!hash[item]) hash[item] = 0;
    hash[item]++;
  }
  for (var j = 0, _len = ransomNote.length; j < _len; j++) {
    var item = ransomNote[j];
    if (hash[item] == undefined) return false;
    hash[item]--;
    if (hash[item] < 0) return false;
  }

  return true;
};
