class MyBaseClass {}
let MyMixins = superClass =>
  class extends superClass {
    foo() {
      console.log('foo from MyMixins');
    }
  };
class MyClass extends MyMixins(MyBaseClass) {}

let a = new MyClass();
a.foo();
