/**
 * link:https://leetcode.com/problems/island-perimeter/description/
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
  if (!grid || grid.length == 0) return 0;
  var len = grid[0].length,
    result = 0;
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < len; j++) {
      if (grid[i][j] == 1) {
        var left = j - 1 < 0 ? 0 : grid[i][j - 1];
        var right = j + 1 >= len ? 0 : grid[i][j + 1];
        var top = i - 1 < 0 ? 0 : grid[i - 1][j];
        var down = i + 1 >= grid.length ? 0 : grid[i + 1][j];
        var numOfAdj = right + left + top + down;
        result += 4 - numOfAdj;
      }
    }
  }
  return result;
};