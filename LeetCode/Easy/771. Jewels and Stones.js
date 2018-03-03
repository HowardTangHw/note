// link:https://leetcode.com/problems/jewels-and-stones/description/

/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
  let j = new Set(J),
    count = 0;
  if (j.size == 0) return 0;
  for (var i = 0; i < S.length; i++) {
    j.has(S[i]) ? count++ : count;
  }
  return count;
};
var numJewelsInStones = function(J, S) {
  let j = new Set(J),
    count = 0;
  if (j.size == 0) return 0;
  return S.split('').reduce((acc, v) => acc + j.has(v), 0);
};
