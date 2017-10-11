/**
 * link:https://leetcode.com/problems/construct-the-rectangle/description/
 */

/**
 * @param {number} area
 * @return {number[]}
 */
var constructRectangle = function(area) {
  var a = Math.ceil(Math.sqrt(area));
  while (area % a !== 0) {
    a--;
  }
  b = area / a;
  return [Math.max(a,b), Math.min(a,b)];
};
var area = 2;
constructRectangle(2);
