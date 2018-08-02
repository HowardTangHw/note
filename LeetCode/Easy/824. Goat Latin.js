// link:https://leetcode.com/problems/goat-latin/description/
/**
 * @param {string} S
 * @return {string}
 */
var toGoatLatin = function(S) {
  let sArr = S.split(' '),
    vowels = 'aeiou',
    result = [];
  for (let i = 0, len = sArr.length; i < len; i++) {
    let word = sArr[i].split('');
    if (vowels.indexOf(word[0].toLowerCase()) == -1) word.push(word.shift());
    word.push(...['m', 'a']);
    let len = i + 1;
    word.concat(Array(len).fill('a'));
    result.push(word.join(''));
  }
  return result.join(' ');
};
var toGoatLatin = function(S) {
  let suffix = 'a',
    vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  S = S.split(' ');

  for (let i = 0; i < S.length; i++) {
    if (vowels.includes(S[i][0])) {
      S[i] += 'ma';
    } else {
      S[i] = S[i].slice(1) + S[i][0] + 'ma';
    }
    S[i] += suffix;
    suffix += 'a';
  }

  return S.join(' ');
};
