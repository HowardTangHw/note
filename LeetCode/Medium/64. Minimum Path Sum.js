/**
 * @param {number[][]} grid
 * @return {number}
 */

// Time Limit Exceeded
var minPathSum = function(grid) {
    if (grid.lenth < 0) return 0;
    let yMax = grid[0].length - 1;
    let xMax = grid.length - 1;
    let result = Number.MAX_VALUE;
    var dfs = function(grid, xMax, yMax, x, y, count) {
        if (x === xMax && y === yMax)
            result = Math.min(result, count + grid[x][y]);
        if (x > xMax || y > yMax) return;
        let nowVal = grid[x][y];
        dfs(grid, xMax, yMax, x + 1, y, nowVal + count);
        dfs(grid, xMax, yMax, x, y + 1, nowVal + count);
    };
    dfs(grid, xMax, yMax, 0, 0, 0);
    return result;
};

// DP
var minPathSum = function(grid) {
    let yMax = grid[0].length;
    let xMax = grid.length;
    for (let i = 0; i < xMax; i++) {
        for (let j = 0; j < yMax; j++) {
            if (j !== 0 && i !== 0) {
                grid[i][j] =
                    grid[i][j] + Math.min(grid[i - 1][j], grid[i][j - 1]);
            } else if (j !== 0) {
                grid[i][j] += grid[i][j - 1];
            } else if (i !== 0) {
                grid[i][j] += grid[i - 1][j];
            }
        }
    }
    return grid[xMax - 1][yMax - 1];
};
