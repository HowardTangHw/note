// link:https://leetcode.com/problems/find-smallest-letter-greater-than-target/description/
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */

//普通方法 96ms
var nextGreatestLetter = function(letters, target) {
  // 首先将字母转为数字
  var targetNum = target.charCodeAt();
  for (var i = 0; i < letters.length; i++) {
    if (letters[i].charCodeAt() > targetNum) return letters[i];
  }
  return letters[0];
};

//二分查找法 Runtime: 109 ms
var nextGreatestLetter = function(letters, target) {
  // 首先将字母转为数字
  var targetNum = target.charCodeAt();
  var arr = [];
  for (var i = 0; i < letters.length; i++) {
    arr.push(letters[i].charCodeAt());
  }
  var left = 0,
    right = letters.length - 1,
    mid;
  var res = -1;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === targetNum) {
      res = mid + 1;
    }
    if (arr[mid] > targetNum) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  if (res != -1) return letters[res] || letters[0];
  return letters[left] || letters[0];
};


//使用new Set() Runtime: 115 ms

var nextGreatestLetter = function(letters, target) {
  var targetNum = target.charCodeAt();
  var set = new Set(letters);
  for (var x of set) {
    if (x.charCodeAt() > targetNum) return x;
  }
  return letters[0];
}