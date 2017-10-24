/**
 * link:https://leetcode.com/problems/happy-number/description/
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
  if (n <= 0) return false;
  while (true) {
    let sum = 0;
    while (n != 0) {
      sum += (n % 10) * (n % 10);
      n = Math.floor(n / 10);
    }
    if (!Math.floor(sum / 10)) {
      if (sum == 1 || sum == 7) return true;
      else return false;
    }
    n = sum;
  }
};


var isHappy =function(n){
  while(n>6){
    let  next = 0;
    while(n){next+=(n%10)*(n%10); n= Math.floor(n/10);}
    n = next;
}
return n==1;
}