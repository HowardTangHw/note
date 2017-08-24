//dir ===  1 => 从前往后找  findIndex
//dir === -1 => 从后往前找  findLastIndex
// 找出符合条件(predicate)的第一个值(findIndex),或者最后一个值(findLastIndex)
function creatPredicateIndexFinder(dir) {
  return function(array, predicate, context) {
    //  predicate = cb (predicate,context);
    var length = array.length; // var length = getLength(array);
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array)) return index;
    }
    return -1;
  };
}

var findIndex = creatPredicateIndexFinder(1);
var findLastIndex = creatPredicateIndexFinder(-1);
function a(value, index, array) {
  if (value > 3) return true;
}
var array = [1, 2, 3, 10,11];
findIndex(array, a);
findLastIndex(array,a);