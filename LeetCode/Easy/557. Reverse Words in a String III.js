/**
 * link:https://leetcode.com/problems/reverse-words-in-a-string-iii/description/
 */ 
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  var a= s.split(' '),
   result=[];
  a.forEach(function(value){
    result.push(value.split('').reverse().join(''));
  });
  return result.join(' ');
};