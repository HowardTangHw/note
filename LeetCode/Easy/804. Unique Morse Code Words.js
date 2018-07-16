/**
 * link:https://leetcode.com/problems/unique-morse-code-words/description/
 */
/**
 * @param {string[]} words
 * @return {number}
 */
const letters = 'abcdefghijklmnopqrstuvwxyz';
const morseCode = [
  '.-',
  '-...',
  '-.-.',
  '-..',
  '.',
  '..-.',
  '--.',
  '....',
  '..',
  '.---',
  '-.-',
  '.-..',
  '--',
  '-.',
  '---',
  '.--.',
  '--.-',
  '.-.',
  '...',
  '-',
  '..-',
  '...-',
  '.--',
  '-..-',
  '-.--',
  '--..',
];
const mapMorse = new Map(morseCode.map((code, index) => [letters[index], code]));
var uniqueMorseRepresentations = function(words) {
  const transformations = new Set();
  words.forEach(word => {
    transformations.add(
      word
        .split('')
        .map(l => mapMorse.get(l))
        .join('')
    );
  });
  return transformations.size;
};

//

var uniqueMorseRepresentations = function(words) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const morseCode = [
    '.-',
    '-...',
    '-.-.',
    '-..',
    '.',
    '..-.',
    '--.',
    '....',
    '..',
    '.---',
    '-.-',
    '.-..',
    '--',
    '-.',
    '---',
    '.--.',
    '--.-',
    '.-.',
    '...',
    '-',
    '..-',
    '...-',
    '.--',
    '-..-',
    '-.--',
    '--..',
  ];
  const lettersArr = letters.split('');
  let morseMap = {},
    result = [],
    final = [];
  for (let i = 0; i < lettersArr.length; i++) {
    morseMap[lettersArr[i]] = morseCode[i];
  }
  words.forEach(function(word) {
    let temp,
      str = word.split('');
    str.forEach(function(key) {
      temp += morseMap[key];
    });
    result.push(temp);
  });

  result.forEach(function(key) {
    if (!final[key]) {
      final[key] = 1;
    } else {
      final[key] += 1;
    }
  });
  return Object.keys(final).length;
};
