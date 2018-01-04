/**
 * link:https://leetcode.com/problems/assign-cookies/description/
 */

/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
  g.sort(function(a, b) {
    return a - b;
  });
  s.sort(function(a, b) {
    return a - b;
  });
  var a = 0,
//   这里只能是cookies的长度,用每一个孩子需要的蛋糕和蛋糕分量比
    sLen = s.length;
  for (var i = 0; i <= sLen; i++) {
    if (g[a] <= s[i]) a++;
  }
  return a;
};
/**
 * 在蛋糕中找满足当前学生的蛋糕
 * 找到后删除蛋糕数组; 
 */ 
var findContentChildren = function(g, s) {
  g.sort(function(a, b) {
    return a - b;
  });
  s.sort(function(a, b) {
    return a - b;
  });
  var a = 0;
  var sLen=g.length>s.length?s.length:g.length;
  for (var i = 0; i < sLen&&s.length>0; i++) {
    var index = s.findIndex(function(e) {
     return e >= g[a];
    });
    if(index!=-1){
        s.splice(index,1);
        a++
    }
  }
  return a;
};
