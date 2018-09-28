/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxIncreaseKeepingSkyline = function(grid) {
  let zip = args => args[0].map((_, idx) => args.map((e, _) => e[idx]));
  let rowMaxValues = grid.map((e, i) => Math.max(...e));
  let colMaxValues = zip(grid).map((e, i) => Math.max(...e));
  var res = 0;
  grid.forEach((arg, y) => {
    arg.forEach((e, x) => {
      res += Math.min(rowMaxValues[y], colMaxValues[x]) - e;
    });
  });
  return res;
};
