/**********************************************/
var arr = [1, 2, 3];
Array.prototype.merge =function (fn,chars) {
    return this.map(fn).join(chars);
}

var add =function(num){
    return function(item){
        return item+num;
    }
}

// var newStr = arr.merge(function(item){
//     return item +2
// },'-');
// 这里传入的是add(2),是立马执行函数add(),num=2,并且返回的是一个函数,利用闭包将num保存起来了,
//fn=function(item){return item+num}
var newStr = arr.merge(add(2),'-');
console.log(newStr);