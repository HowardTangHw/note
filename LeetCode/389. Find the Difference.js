/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
  var a = s.split('').sort();
  var b = t.split('').sort();
  var l =a.length>b.length?a.length:b.length;
  for(var i =0;i<l;i++){
    if(a[i]!==b[i]){
      return b[i];
    }
  }
};
