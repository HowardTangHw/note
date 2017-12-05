/**
 * link:https://leetcode.com/problems/valid-anagram/description/
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (!s || !t) return s == t;
  if (s.length != t.length) return false;
  s = s
    .split('')
    .sort()
    .join('');
  t = t
    .split('')
    .sort()
    .join('');
  return s == t;
};

/* hash */
var isAnagram = function(s, t) {
  if (!s || !t) return s == t;
  if (s.length != t.length) return false;
  var hash = {};
  s = s.split('');
  t = t.split('');

  for (var i = 0; i < s.length; i++) {
    var tc = t[i],
      sc = s[i];
    if (!hash[tc]) hash[tc] = 0;
    if (!hash[sc]) hash[sc] = 0;
    hash[sc]++;
    hash[tc]--;
  }
  for (var k in hash) {
    if (hash[k] != 0) return false;
  }
  return true;
};
