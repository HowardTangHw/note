//link:https://leetcode.com/problems/longest-palindrome/description/
/**
 * @param {string} s
 * @return {number}
 */
/**
 * 一开始思路错了 ,一开始以为找到所有偶数,加上最大的奇数就可以了
 * 其实不是的,应该将所有奇数都-1,一起加进来
 * 如果数组里面真的有奇数个,那最后要补回1
 * 例如'cccdddddaa' 10个数字,最大回文就是9
 * 应该输出的是'acdddddca'
 */
var longestPalindrome = function(s) {
  let hash = {};
  let arr = s.split('');
  let res = 0;
  let flag = 0;
  arr.forEach(v => {
    hash[v] = ~~hash[v] + 1;
  });
  for (let key in hash) {
    let k = hash[key];
    if (k % 2 == 0) res += k;
    if ((k + 1) % 2 == 0) {
      res += k - 1;
      flag = 1;
    }
  }

  return flag ? res + 1 : res;
};
