/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let res = 0,
        nums = 0,
        hashStr = '';

    for (let n of s) {
        if (hashStr.indexOf(n) === -1) {
            hashStr += n;
            nums++;
            res = res < nums ? nums : res;
        } else {
            hashStr += n;
            hashStr = hashStr.slice(hashStr.indexOf(n) + 1);
            nums = hashStr.length;
        }
    }
    return res;
};

// 雙指針窗口
var lengthOfLongestSubstring = function(s) {
  let res = 0,
    left = 0,
    right = 0,
    window = {};
  while (right < s.length) {
    let c1 = s[right];
    window[c1] = (window[c1] || 0) + 1;
    right++;
    while (window[c1] > 1) {
      let c2 = s[left];
      window[c2]--;
      left++;
    }
    res = Math.max(res, right - left);
  }
  return res;
};
