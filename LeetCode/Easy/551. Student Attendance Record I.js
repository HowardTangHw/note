//link:https://leetcode.com/problems/student-attendance-record-i/description/
/**
 * @param {string} s
 * @return {boolean}
 */

//方法一
var checkRecord = function(s) {
  var arr = s.split('');
  var a = 0,
    l = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == 'A') a++;
    if (arr[i] == 'L') l++;
    if (l >= 3) return false;
    if (arr[i] != 'L') l = 0;
  }
  if (a > 1) return false;
  return true;
};

// 方法二,字符串
var checkRecord = function(s) {
  return s.indexOf('LLL') === -1 && s.indexOf('A') === s.lastIndexOf('A');
};

// 方法3
var checkRecord = function(s) {
  if (s.indexOf('LLL') != -1) return false;
  var str = s;
  str.replace(/A+/g, '');
  if (s.length - str.length > 1) return false;
  return true;
};
