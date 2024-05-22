/**
 * @param {number[][]} matches
 * @return {number[][]}
 */
var findWinners = function(matches) {
  var n = matches.length;
  let max = 0
  var result = [[], []];
  if (n <= 0) return result;
  if(n<=1) return [[matches[0][0]],[matches[0][1]]]
  for (let i = 0; i < n; i++) {
    let [w, l] = matches[i]
    max = Math.max(max, w, l)
  }
  let tag = new Array(max + 1).fill(-1)
  console.log(tag);
  for (let i = 0; i < matches.length; i++){
    var fail = matches[i][1];
    var winner = matches[i][0];
    if (tag[winner]==-1) {
      tag[winner] = 0
    }
    if (tag[fail]==-1) {
      tag[fail] = 0;
    }
    tag[fail] += 1;
  }

  for (let i = 1; i < tag.length; i++){
    if (tag[i] === 0) {
      result[0].push(i)
    }
    if (tag[i] === 1) {
      result[1].push(i)
    }
  }


  return result;
};
