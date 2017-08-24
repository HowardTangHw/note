function a(){
    this.color='blue'
    this.symbol=Symbol('symbol');
}
var triangle = {a:1, b:2, c:3};
a.prototype=triangle;
var c = new a;

// for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。
// 可以通过hasOwnProperty方法,来判断是否
// for(var value in c)
// {
// 	if(c.hasOwnProperty(value))
//     {
//         console.log(value);
//     }
// }

// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。
// var d =Object.keys(c);
// console.log(d)

// Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。
// var d =Object.getOwnPropertyNames(c);
// console.log(d);

//Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。
// console.log(Object.getOwnPropertySymbols(c));

// Reflect.ownKeys(obj)
console.log(Reflect.ownKeys(c));