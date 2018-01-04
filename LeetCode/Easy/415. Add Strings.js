/**
 * link:https://leetcode.com/problems/add-strings/description/
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
/**
 * return +(+num1)+(+num2) 会出问题,
 * 因为JS的精度问题?
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number
 * Number.isSafeInteger()
 * 确定传递的值是否为安全整数 ( -(253 - 1) 至 253 - 1之间)。
 */
var addStrings = function(num1, num2) {
  let [i, j] = [num1.length - 1, num2.length - 1];
  let res = '';
  let add = 0;
  for (; i >= 0 || j >= 0; i--, j--) {
    let a = i >= 0 ? +num1[i] : 0;
    let b = j >= 0 ? +num2[j] : 0;
    let sum = a + b + add;
    res = sum % 10 + res;
    add = ~~(sum / 10);
  }

  add && (res = add + res);
  return res;
};


/**
 * 补0
 */
var addStrings = function(num1, num2) {
  let [i, j] = [num1.length - 1, num2.length - 1];
  let cha = i - j,
    len = Math.max(i, j);
  if (cha > 0) {
    num2 = '0'.repeat(cha) + num2;
  } else {
    num1 = '0'.repeat(Math.abs(cha)) + num1;
  }
  let res = '';
  let add = 0;
  for (; len >= 0; len--) {
    let a = +num1[len];
    let b = +num2[len];
    let sum = a + b + add;
    res = sum % 10 + res;
    add = ~~(sum / 10);
  }

  add && (res = add + res);
  return res;
};
