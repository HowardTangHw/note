// function Person(){
//     this.name='aaa';
// }
// Person.prototype={
//     constructor:Person,
//     say:function(){
//         console.log(this.name);
//     }
// }
// var b = new Person();
// b.say();
// console.log(Person.prototype.constructor);
// class Person{
//     constructor(){
//         this.name='aaa';
//     }
//     say(){
//         console.log(this.name);
//     }
// }
// const b = new Person();
// const c = new Person();
// console.log(b.__proto__===c.__proto__);
function Person() {
    this.name = 'aaa';
    this.age = 'bbb';
}

Person.prototype.getName = function () {
    console.log(this.name);
}
// 构造函数的继承
function cPerson() {
    Person.call(this);
    this.name='bbb';
}
// 继承原型
cPerson.prototype = Person.prototype;

var a =new cPerson();
//a.getName()
console.log(a.__proto__);