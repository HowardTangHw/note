// let {keys, values, entries} = Object;
// let obj = { a: 1, b: 2, c: 3 };
// for (let key of Object.keys(obj)) {
//   console.log(key); // 'a', 'b', 'c'
// }

// for (let value of Object.values(obj)) {
//   console.log(value); // 1, 2, 3
// }

// for (let [key, value] of Object.entries(obj)) {
//   console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
// }
// var obj = Object.create({},{p:{value:42,enumerable:true}});
// console.log(Object.values(obj));
// console.log(Object.values({ [Symbol()]: 123, foo: 'abc' }));
// console.log(Object.values('foo'));

// let z = { a: 3, b: 4 };
// let n = Object.assign({},z);
// console.log(n);
// var oldA={
//   a:10,
//   b:20,
//   name:'oldA'
// }
// var newA=(...oldA);
// console.log(newA);

// const obj = {
//   foo: 123,
//   get bar() { return 'abc' }
// };

// console.log(Object.getOwnPropertyDescriptors(obj));

// const source = {
//   set foo(value) {
//     console.log(value);
//   }
// };

// const target2 = {};
// console.log(Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source)))
// console.log(Object.getOwnPropertyDescriptor(target2, 'foo'))


// var a ={
//   'a':1,
//   'b':2
// }
// var b ={
//   "property1": {
//     value: true,
//     writable: true,
//     enumerable:true
//   },
//   "property2": {
//     value:2,
//     enumerable:true
//   }
// }
// console.log(Object.defineProperties(a,b));

const COLOR_RED    = Symbol();
const COLOR_GREEN  = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return true;
    case COLOR_GREEN:
      return false;
    default:
      throw new Error('Undefined color');
    }
}
console.log(getComplement(COLOR_GREEN));