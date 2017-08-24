// const s = new Set();

// [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

// for (let i of s) {
//   console.log(i);
// }
// // 2 3 5 4

// const set = new Set([1, 2, 3, 4, 4]);
// console.log(set.size);

// // 去除数组的重复成员
// [...new Set(array)]

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
console.log(union);