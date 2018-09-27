/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  if (!numRows) return [];
  if (numRows === 1) return [[1]];
  let defaultRows = [[1]];
  for (let i = 1; i < numRows; i++) {
    let nowRows = defaultRows[i - 1];
    let leftRows = [...nowRows, 0];
    let rightRows = [0, ...nowRows];
    defaultRows.push(leftRows.map((r, i) => r + rightRows[i]));
  }
  return defaultRows;
};

var generate = function(numRows) {
  let defaultRows = [];
  for (let i = 0; i < numRows; i++) {
    let tmp = [];
    for (let j = 0; j <= i; j++) {
      if (i == 0 || j == 0 || i == j) tmp.push(1);
      else tmp.push(defaultRows[i - 1][j - 1] + defaultRows[i - 1][j]);
    }
    defaultRows.push(tmp);
  }
  return defaultRows;
};
