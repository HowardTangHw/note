/**
 * link:https://leetcode.com/problems/baseball-game/description/
 */ 
/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function(ops) {
  var result = [],
      len = ops.length;
  for(var i =0;i<len;i++){
    if(!isNaN(ops[i])) result.push(+ops[i]);
    if(ops[i]=='+') result.push((+result[result.length-1])+(+result[result.length-2]));
    if(ops[i]=='D') result.push(result[result.length-1]*2);
    if(ops[i]=='C') result.pop();
  }
  return result.reduce(function(a,b){
    return a+b;
  })
 
};