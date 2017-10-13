/**
 * link:https://leetcode.com/problems/detect-capital/description/
 */

/**
 * @param {string} word
 * @return {boolean}
 */

//方法1:正则
var detectCapitalUse = function(word) {
  var reg = new RegExp("^[A-Z]+$|^[a-z]+$|^[A-Z][a-z]+$");
  return reg.test(word);
};

//方法2:首先判断是不是全部大写,如果不是,根据规则,除了首字母外,其余的都应该是小写
var detectCapitalUse = function(word) {
  var w = word.split(""),
    len = w.length;
  //全部大写判断 'AAA'
  var allUpper = true;
  for (let i = 0; i < len; i++) {
    if (w[i] != w[i].toUpperCase()) {
      allUpper = false;
      break;
    }
  }
  //除了第一个外,其余的应该都是小写 'aaa'||'Aaa';
  var allLowerOrFirstUpper = true;
  for (let i = 1; i < len; i++) {
    if (w[i] != w[i].toLowerCase()) {
      allLowerOrFirstUpper = false;
      break;
    }
  }
  return allUpper || allLowerOrFirstUpper;
};

//方法3:

var detectCapitalUse = function(word) {
  var w = word.split(""),
    len = w.length,
    n = 0;
  //判断有多少个大写
  for (var i = 0; i < len; i++) if (w[i] == w[i].toUpperCase()) n++;

  //如果只有一个大写 返回判断是不是首字母大写,
  if (n == 1) return w[0] == w[0].toUpperCase();

  //如果n=0 ,则全部为小写,否则判断n是不是和字符串长度一样(判断是不是全是大写)
  return n == 0 || n == len;
};
