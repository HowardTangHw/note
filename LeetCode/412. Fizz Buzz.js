/**
 * 412. Fizz Buzz
 * Write a program that outputs the string representation of numbers from 1 to n.
 * But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”. For numbers which are multiples of both three and five output “FizzBuzz”.
 * https://leetcode.com/problems/fizz-buzz/description/
 */
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function(n) {
  var res = [],
    a;
  for (var i = 1; i < n + 1; i++) {
    a = i % 3 == 0 ? "Fizz" : "";
    a += i % 5 == 0 ? "Buzz" : "";
    a += a === "" ? i : "";
    res.push(a);
  }
  return res;
};
fizzBuzz(3);
