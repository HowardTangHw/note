/**
 * link:https://leetcode.com/problems/max-area-of-island/discuss/
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  if (grid == null || grid.length == 0) {
    return 0;
  }
  var area = 0,
    max = 0;
  var m = grid.length,
    n = grid[0].length;
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (grid[i][j]==1) {
        dfs(i, j);
        max = Math.max(max, area);
        area = 0;
      }
    }
  }

  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 0) {
      return area;
    }
    grid[i][j] = 0;
    area++;
    dfs(i + 1, j);
    dfs(i, j + 1);
    dfs(i - 1, j);
    dfs(i, j - 1);
  }
  return max;
};
var grid = [[1]];

maxAreaOfIsland(grid);

