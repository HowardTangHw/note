//link:https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

//  hash
var twoSum = function(numbers, target) {
  var hash = {};
  var res = [];
  numbers.forEach((v, i) => {
    hash[v] = i;
  });
  for (var i = 0; i < numbers.length; i++) {
    var now = numbers[i];
    if (hash[target - now]) {
      return [i + 1, hash[target - now] + 1];
    }
  }
};

//
var twoSum = function(numbers, target) {
  var l = 0,
    len = numbers.length,
    r = len - 1;
  while (l < r) {
    var now = numbers[l] + numbers[r];
    if (now > target) {
      r--;
    } else if (now < target) {
      l++;
    } else {
      return [l + 1, r + 1];
    }
  }
};
