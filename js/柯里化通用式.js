// var currying = function (fn) {
//     // 获取arguments,从第一个开始(就是不要fn)
//     var args = [].slice.call(arguments, 1);
//     return function () {
//         // 将第一次的arguments和之后的arguments拼接为新的数组
//         var _args = args.concat([].slice.call(arguments));
//         return fn.apply(null, _args);
//     }
// }
// var sum = currying(function() {
//     var args = [].slice.call(arguments);
//     return args.reduce(function(a, b) {
//         return a + b;
//     })
// }, 10)

// console.log(sum(20, 10));  // 40
// console.log(sum(10, 5));   // 25
//////////////////////////////
/*也可以利用es6的...*/ 

var currying =  (fn,...arg)=>{
    var args = arg;
    return  (...arg)=> {
        // 将第一次的arguments和之后的arguments拼接为新的数组
        var _args = args.concat(arg);
        return fn.apply(null, _args);
    }
}


var sum = currying((...arg)=>{
    var args = arg;
    return args.reduce((a, b)=>{
        return a + b;
    })
},10)
console.log(sum(20, 10));  // 40
console.log(sum(10, 5));   // 25