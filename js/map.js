Array.prototype._map = function (fn, thisArg) {
    //建立一个空数组
    var temp = [];
    //判定传入的是不是callback
    if (typeof fn == "function") {
        //索引值
        var k = 0;
        //长度
        var length = this.length;
        //循环
        for (; k < length; k++) {
            //将return的值push到空数组temp里面,
            //记得贡爷法则,调用的是fn,第一个参数为调用时的this,其他作为参数列表传入
            temp.push(fn.call(thisArg, this[k], k, this));
        }
    }
    else {
        console.error('TypeError: ' + fn + ' is not a function.');
    }
    //将temp返回
    return temp;
}
var newArr = [1, 2, 3]._map(function (k, i, arr) {
    console.log(k, i, arr, this);
    return k + 1;
}, { a: 1 });
console.log(newArr);

