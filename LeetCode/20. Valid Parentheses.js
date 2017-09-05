//link:https://leetcode.com/problems/valid-parentheses/description/
/**
 * @param {string} s
 * @return {boolean}
 */
/**
 * 思路:stack
 * 用一个数组存放s[i-1]的值(就是存放前一个值)
 * 判断s[i]与s[i-1]是否嵌套(用前一个和现在的相匹配),如果是嵌套,则不push进去,并且将s[i-1]pop掉
 * 最后判断存放的数组是否为空,如果为空则证明所有嵌套都匹配上了
 * 就是,暂存数组里面理应存放的都是左半边的'(','[','{', 只要多出来了或者存在右半边括号,则数组长度不为0,不相匹配
 */

var isValid = function(s) {
  var s1 = [],
    matchArray = [];
  (matchArray["{"] = "}"), (matchArray["["] = "]"), (matchArray["("] = ")");
  for (var i = 0, len = s.length; i < len; i++) {
    if (!s1.length) s1.push(s[i]);
    else {
      if (s[i] === matchArray[s1[s1.length - 1]]) s1.pop();
      else {
        s1.push(s[i]);
      }
    }
  }
  return !s1.length;
};
