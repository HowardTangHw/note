/**
 * @param {string[]} strs
 * @return {number}
 */
var isSubseq = (s, t) => {
  let i = 0;
  for (const c of t) {

    if (s[i] === c && ++i === s.length) {
      // 1.判断当前单词是否一致，一致则长度加一
      // 2.当前长度和子序列长度一致时，则退出
      return true
    }
  }
  return false;
};
var findLUSlength = function(strs) {
  let ans = -1;
  next: for (let i = 0; i < strs.length; i++){
    let s = strs[i];
    if (s.length <= ans) {
      // 题目要求获取最大的子序列
      continue;
    }
    for (let j = 0; j < strs.length; j++){
      if (j !== i && isSubseq(s, strs[j])) {
        // 如果是子序列则跳过当前循环
        continue next;
      }
    }
    ans = s.length;
  }
  return ans;
};
