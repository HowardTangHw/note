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
 * shuffled[index] 开始时肯定是没值的
 * 随机一个点(rand),判断这个点(rand)是否和当前索引(index)一致,一致时,就在这个位置push(a[index]);
 * 如果不一致,那么(rand)肯定比(index)小,所以shuffled[rand]肯定是存在值的,这时,将值搬到当前的shuffled[index]处,然后将a[index]放入shuffled[rand]中
 */ 

function shuffle(a) {
  var length = a.length,
    shuffled = Array(length);
  for (var index = 0, rand; index < length; index++) {
    rand = ~~(Math.random() * (index + 1));
    if (rand !== index) {
        console.log('交换前',shuffled);
        console.log(index,rand,shuffled[rand])
        //这时候shuffle(index)是还没有值的
        shuffled[index] = shuffled[rand];
        console.log('交换后',shuffled);
    }
    shuffled[rand] = a[index];
  }
  return shuffled;
}
