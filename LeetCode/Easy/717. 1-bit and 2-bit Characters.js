/**
 * link:https://leetcode.com/problems/1-bit-and-2-bit-characters/description/
 */
/**
 * @param {number[]} bits
 * @return {boolean}
 */

/**
 * 如果是1,则加两位,因为1后面肯定是1或者是0的
 * 如果是0,则自加0,再看看后一位是不是,
 * 其实就是判断2 bits是否完整,完整且+0则是正确的
 */
var isOneBitCharacter = function(bits) {
  let len = bits.length - 1;
  let i = 0;
  while (i < len) {
    i += bits[i] + 1;
  }
  return i === len;
};
var isOneBitCharacter = function(bits) {
  let len = bits.length;
  if (len == 1) return bits[0] === 0;
  let flag = len % 2 === 0;
  if (flag) {
    return !bits[len - 2];
  }
  return bits[len - 3] === 1;
};
