// link:https://www.lintcode.com/problem/reverse-3-digit-integer/description
/**
 * @param number: A 3-digit number.
 * @return: Reversed number.
 */
const reverseInteger = function(number) {
  return Number(
    number
      .toString()
      .split('')
      .reverse()
      .join('')
  );
};
