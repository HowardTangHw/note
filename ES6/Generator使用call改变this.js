function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj);//这里是内部的指针指向了obj,然后遍历器对象给了f
console.log(f);
f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}
console.log(f);
obj.a // 1
obj.b // 2
obj.c // 3
console.log(obj);