/**
 * link:https://leetcode.com/problems/judge-route-circle/description/
 */

var judgeCircle = function(moves) {
  var result = [0, 0];
  var i, len;
  for (i = 0, len = moves.length; i < len; i++) {
    var move = moves.charAt(i);
    switch (move) {
      case "U":
        v[1]++;
        break;
      case "D":
        v[1]--;
        break;
      case "R":
        v[0]++;
        break;
      case "L":
        v[0]--;
        break;
      default:
        break;
    }
  }
  return result[0] === 0 && result[1] === 0;
};
var judgeCircle = function(moves) {
  var arr = [];
  arr["U"] = 0;
  arr["D"] = 0;
  arr["R"] = 0;
  arr["L"] = 0;
  var m = moves.split("");
  for (var i = 0; i < m.length; i++) {
    arr[m[i]]++;
  }
  return arr["U"] === arr["D"] && arr["R"] === arr["L"];
};