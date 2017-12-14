
## 18. Class的基本语法

###18.1 简介

JavaScript 语言中,生成实例对象的传统方法是通过构造函数:

 ```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function() {
  return '(' + this.x + ',' + this.y + ')';
};
var p = new Point(1, 2);
 ```

这种原型链的写法,与传统的面向对象写法(比如C++和JAVA)差异很大,很容易让人困惑.

ES6提供了更接近传统语言的写法,引入了Class(类)这个概念,作为对象的模板,通过`class`关键字,可以定义类.

基本上,ES6的`class`可以看作只是一个语法糖,它的绝大部分功能,ES5都可以做到,新的`class`写法只是让对象原型的写法更加清晰,更像面向对象变成的语法而已,上面的代码可以改写为:

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
}
```

上面代码定义了一个"类",里面有一个`constructor`方法,这就是构造方法,而`this`,这就是构造方法,而`this`关键字则代表实例对象.就是其实ES6中的`constructor`构造方法就是ES5中的构造函数.

`Point`类除了构造方法,还可以定义其他方法,其他的方法其实就是原型链上的属性方法

```js
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

使用的时候也是对类使用`new`命令,跟构造函数的用法完全一致.

```js
class Bar {
  doStuff() {
    console.log('stuff');
  }
}

var b = new Bar();
b.doStuff() // "stuff"
```

构造函数的`prototype`属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。

```js
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

在类的实例上面调用方法，其实就是调用原型上的方法。

```js
class B {}
let b = new B();

b.constructor === B.prototype.constructor // true
```

上面代码中,`b`是`B` 类的实例,它的`constructor`方法就是`B`类原型的`constructor`方法。



由于类的方法都定义在`prototype`对象上面，所以类的新方法可以添加在`prototype`对象上面。`Object.assign`方法可以很方便地一次向类添加多个方法。

```js
class Point {
  constructor() {
    //some code;
  }
}

Object.assign(Point.prototype, {
  toString() {},
  toValue() {}
});
```

`prototype`对象的`constructor`属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

```js
Point.prototype.constructor === Point // true
```

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```js
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

上面代码中，`toString`方法是`Point`类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。

```js
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

上面代码采用 ES5 的写法，`toString`方法就是可枚举的。

类的属性名，可以采用表达式。

```js
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
```

上面代码中，`Square`类的方法名`getArea`，是从表达式得到的。

ps:感觉这块越来越绕了,其实就是语法糖,类的`constructor`就是对应构造函数,其他的属性方法就是原型的属性方法,但是也有不同点,类的内部定义的方法,都是不可枚举的,而ES5原型链的写法,是可枚举的



### 18.2 严格模式

类和模块的内部,默认是严格模式,所以不需要使用`use strict`指定运行模式.

考虑到未来所有的代码,其实都是运行在模块之中,所以ES6实际上把整个语言升级到了严格模式



### 18.3 constructor 方法

`constructor`方法是类的默认方法,通过`new`命令生成对象实例时,自动调用该方法。

一个类必须有`constructor`方法,如果没有显示定义,一个空的`constructor`方法会被默认添加.

```js
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

上面代码中，定义了一个空的类`Point`，JavaScript 引擎会自动为它添加一个空的`constructor`方法。

`constructor`方法默认返回实例对象（即`return this`），完全可以指定返回另外一个对象

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

上方代码,`construcotr`函数返回一个全新的对象,结果导致实例对象不是`FOO`类的实例。

类必须使用`new`调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```



### 18.4 类的实例对象

生成类的实例对象的写法,与ES5完全一样,也是使用`new`命令.如果忘记加上`new`,像函数那样调用`Class`,将会报错

```js
class Point {
  // ...
}

// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);
```

与ES5一样,实例的属性除非显式定义在其本身(即定义在`this`对象上),否则都是定义在原型上(即定义在`class`上).

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
}

var point = new Point(2, 3);

point.toString(); //(2,3)

point.hasOwnProperty('x'); //true;
point.hasOwnProperty('y'); //true;
point.hasOwnProperty('toString'); //false;
point.__proto__.hasOwnProperty('toString'); //true
```

上面代码中，`x`和`y`都是实例对象`point`自身的属性（因为定义在`this`变量上），所以`hasOwnProperty`方法返回`true`，而`toString`是原型对象的属性（因为定义在`Point`类上），所以`hasOwnProperty`方法返回`false`。这些都与 ES5 的行为保持一致。

```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```

上面代码中，`p1`和`p2`都是`Point`的实例，它们的原型都是`Point.prototype`，所以`__proto__`属性是相等的。

这也意味着，可以通过实例的`__proto__`属性为“类”添加方法。

> `__proto__` 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 `Object.getPrototypeOf` 方法来获取实例对象的原型，然后再来为原型添加方法/属性.

```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```

上面代码在`p1`的原型上添加了一个`printName`方法，由于`p1`的原型就是`p2`的原型，因此`p2`也可以调用这个方法。而且，此后新建的实例`p3`也可以调用这个方法。这意味着，使用实例的`__proto__`属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。



ps: 这章就是ES5原型链的知识..





### 18.5 Class表达式

与函数一样,类也可以使用表达式的形式定义.

```js
const MyClass = class Me {
  getClssName() {
    return Me.name;
  }
};
```

上面代码使用表达式定义了一个类,需要注意的是,这个类的名字是`MyClass`而不是`Me`,`Me`只在Class的内部代码可用,指代当前类

```js
let inst = new MyClass();
inst.getClassName(); //Me
Me.name; //ReferenceError: Me is not defined
```

上面代码表示,`Me`只在Class内部有定义(`Me`其实就是代替的`this`?)

如果类的内部没用到的话，可以省略`Me`，也就是可以写成下面的形式。

```js
const MyClass = class { /* ... */ };
```

采用 Class 表达式，可以写出**立即执行的 Class**。

```js
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

上面代码中，`person`是一个立即执行的类的实例。(就是匿名类会立即执行?)



### 18.6 不存在变量提升

类不存在变量提升(hoist),这一点与ES5完全不同.

```js
new Foo(); // ReferenceError
class Foo {}
```

上面代码中,`Foo`类使用在前,定义在后,这样会报错,因为ES6不会把类的声明提升到代码头部,这种规范与继承有关,必须要整子类在父类之后定义.

```js
{
  let Foo = class {};
  class Bar extends Foo {}
}
```

上面的代码不会报错,因为`Bar`继承`Foo`的时候,`Foo`已经有定义了,但是,如果存在`class`的提升,上面代码就会报错,因为`class`会被提升到代码头部,而`let`命令是不断提升的,所以导致`Bar`继承`Foo`的时候,`Foo`还没有定义



### 18.7 私有方法

私有方法是常见的需求,但Es6不提供,只能通过变通方法实现模拟

一种做法实在命名上加以区别.

```js
class Widget {
  //公有方法
  foo(baz) {
    this._bar(baz);
  }

  //私有方法
  _bar(baz) {
    return (this.snaf = baz);
  }

  //...
}
```

上面代码中,`_bar`方法前面的下划线,表示这是一个只限于内部使用的私有方法.但是,这种命名是不保险的,在类的外部,还是可以调用到这个方法。

```js
const bar = symbol('bar');
const snaf = symbol('snaf');

export default class myClass {
  //公有 (漏出)  在公有中调用私有
  foo(baz) {
    this[bar](baz);
  }
  // 私有 不暴露
  [bar](baz) {
    return (this[snaf] = baz);
  }
}
```

上面代码中，`bar`和`snaf`都是`Symbol`值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

在公有方法中调用私有的方法,(就是这个私有方法只能在这个公有里才会被调用咯,而不会被第三方随便的调用)



### 18.8

与私有方法一样，ES6 不支持私有属性。目前，有一个[提案](https://github.com/tc39/proposal-class-fields#private-fields)，为`class`加了私有属性。方法是在属性名之前，使用`#`表示。

```js
class{
  #x;
  constructor(x=0){
    #x = +x; //这里写成this.#x 亦可
  }

  get x(){return #x;}
  set x(value){#x = +value};
}
```

上面代码中,`#x`就表示私有属性`x`,在`Point`类之外是读取不到这个属性的,还可以看到,私有属性与实例的属性是可以同名的（比如，`#x`与`get x()`）。ps:其实也不算同名吧..毕竟你有一个#...

私有属性可以指定初始值，在构造函数执行时进行初始化。

```js
class Point {
  #x = 0;
  constructor() {
    #x; // 0
  }
}
```

