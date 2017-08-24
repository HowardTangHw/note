//https://github.com/hanzichi/underscore-analysis/issues/15

function shuffle(a) {
  var b = [];
  for (var i = 0, len = a.length; i < len; i++) {
    var index = Math.floor(Math.random() * a.lenth);
    b.push(a[index]);
    a.slice(index, 1);
  }
}
//Fisher–Yates 飞雪椰子
// 其实就是 当前的i 和随机的j做出互换
function shuffle(a) {
  var _a = a.concat();
  for (var i = 0, len = a.length; i < len; i++) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = _a[i];
    _a[i] = _a[j];
    _a[j] = tmp;
  }
  return _a;
}
//_.shuffle
//每次随机的rand 都是在shuffled内的
// 当rand!=index(就是随机的值和当前索引值不同的时候),将shuffled[rand]位置的数,搬去shuffled[index]中
//然后shuffled[rand]的位置改为原数组当前索引值的值(这样就不会存在重复了,因为index不断++ a[index]的值只会出现一次)
//如果rand和index相同(因为没赋值,shuffled[index]此时为undefined 所以把a[index]放进去就可以了)
/**
 * 其实就是判断shuffled[rand]有没有值(就是index===rand)! 如果有值就搬去shuffled[rand]=shuffled[index]中,因为shuffled[index]是undefined的
 * 然后将a[index]的值放到shuffled[rand]处
 */ 

function shuffle(a) {
  var length = a.length,
    shuffled = Array(length);
  for (var index = 0, rand; index < length; index++) {
    rand = ~~(Math.random() * (index + 1));
    if (rand !== index) {
        console.log('交换前',shuffled);
        console.log(index,rand,shuffled[rand])
        shuffled[index] = shuffled[rand];
        console.log('交换后',shuffled);
    }
    shuffled[rand] = a[index];
  }
  return shuffled;
}
