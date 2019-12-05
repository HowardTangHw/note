/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function(flowerbed, n) {
  for (let i = 0; i < flowerbed.length; i++) {
    let left = flowerbed[i - 1] || 0;
    let right = flowerbed[i + 1] || 0;
    if (left == 0 && right == 0 && flowerbed[i] == 0) {
      flowerbed[i] = 1;
      n--;
      if (n == 0) return true;
    }
  }
  return false;
};
