/**
 * https://leetcode.com/problems/nim-game/description/
 * http://blog.csdn.net/ironyoung/article/details/49100457
 */

/**
 * 因为只能拿1-3颗,
 * 1个石子，先手全部拿走；
 * 2个石子，先手全部拿走；
 * 3个石子，先手全部拿走；
 * 4个石子，后手面对的是先手的第1，2，3情况，后手必胜；
 * 5个石子，先手拿走1个让后手面对第4种情况，后手必败；
 * 6个石子，先手拿走2个让后手面对第4种情况，后手必败；
 * 所以4的倍数的时候,后手必胜,
 * 非4的倍数的时候,先手必胜
 * （石子数量为4的倍数）后手的获胜策略十分简单，每次取石子的数量，与上一次先手取石子的数量和为4即可；
 * （石子数量不为4的倍数）先手的获胜策略也十分简单，每次都令取之后剩余的石子数量为4的倍数（4*0=0，直接拿光），他就处于后手的位置上，利用上一行的策略获胜。
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function(n) {
  return n % 4 != 0;
};