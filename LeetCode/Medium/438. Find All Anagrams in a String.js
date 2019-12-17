/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

// 雙指針滑動窗口
// https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/solution/hua-dong-chuang-kou-tong-yong-si-xiang-jie-jue-zi-/

var findAnagrams = function(s, t) {
  let res = [],
    left = 0,
    right = 0,
    len = t.length;
  let window = {};
  let needs = {};
  for (let i = 0; i < t.length; i++) {
    let word = t[i];
    window[word] = 0;
    needs[word] = (needs[word] || 0) + 1;
  }
  let match = 0;
  while (right < s.length) {
    let c1 = s[right];
    if (needs[c1]) {
      window[c1]++;
      if (needs[c1] === window[c1]) {
        match++;
      }
    }
    right++;
    while (match === Object.keys(needs).length) {
      if (right - left === len) {
        res.push(left);
      }
      let c2 = s[left];
      if (needs[c2]) {
        window[c2]--;
        if (window[c2] < needs[c2]) {
          match--;
        }
      }
      left++;
    }
  }
  return res;
};
