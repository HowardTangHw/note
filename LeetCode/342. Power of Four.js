// link:https://leetcode.com/problems/power-of-four/description/
/**
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function(num) {
  while (num > 1) {
    num = num / 4;
  }
  return num == 1;
};

/* 运用对数 */
// 4的a次方等于num
// 那么a = log4 Num 4为底数
var isPowerOfFour = function(num) {
  if (!num) return false;
  // 求对数,后面为底
  var a = Math.log(num) / Math.log(4);
  // 有浮点精度问题
  return Math.pow(4, Math.ceil(a)) === num || Math.pow(4, Math.floor(a)) === num;
};
