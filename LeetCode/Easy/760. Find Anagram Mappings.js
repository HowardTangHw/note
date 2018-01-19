/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
/**
 * Hash Map
 */

var anagramMappings = function(A, B) {
  let hash = {};
  let res = [];
  B.forEach((v, i) => {
    hash[v] = i;
  });
  A.forEach(v => {
    res.push(hash[v]);
  });
  return res;
};
