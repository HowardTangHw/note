//link:https://leetcode.com/problems/first-unique-character-in-a-string/description/
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  var sArr = s.split(''),
    hash = {};
  sArr.forEach((v, i) => {
    if (hash[v] != undefined) hash[v] = hash[v] - i;
    if (!hash[v]) hash[v] = i;
  });

  for (var i in hash) {
    if (hash[i] >= 0) return hash[i];
  }
  return -1;
};

var firstUniqChar = function(s) {
  for (i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      return i;
    }
  }
  return -1;
};

//第三种 利用charCodeAt;
let firstUniqChar = function(s) {
  let states = Array(26).fill(-1),
    order = [];
  for (var i = 0; i < s.length; i++) {
    var char = s.charCodeAt(i) - 97;
    if (states[char] === -1) {
      order.push(char);
      states[char] = i;
    } else {
      states[char] = -2;
    }
  }

  for (var i = 0; i < order.length; i++) {
    let char = order[i];
    let index = states[char];
    if (index > -1) return index;
  }
  return -1;
};
var s = 'leetcode';
firstUniqChar(s);
