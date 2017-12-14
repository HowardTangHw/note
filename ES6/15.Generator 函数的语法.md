## 15.**Generator** 函数的语法
- Generator函数也是一个普通函数,但是有两个特征.
  + `function`关键字与函数名之间有一个星号
  + 函数体内部使用`yield`表达式,定义不同的状态


Generator函数调用和普通方法一样,调用Generator函数后,该函数并不执行,返回的也不是函数执行结果,而是一个指向内部状态的指针对象,也就是遍历器对象(Iterator Object)

下一步必须调用遍历器对象的`next`方法,使得指针指向下一个状态.所以,Generator函数是分段执行的,而`yield`表达式是暂停执行的标记,而`next`方法可以恢复执行.

### 15.1 yield表达式

遍历器对象的next方法的运行逻辑如下。

（1）遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。

（2）下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。

（3）如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

（4）如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

### 15.2 与Iterator 接口的关系

`对象`没有`Symbol.iterator`接口,所以不能进行`for...of`遍历.

**Generator** 函数就是遍历器生成函数, 因此可以将Generator赋值给`对象`的`Symbol.iterator`属性,从而使得该对象具有**Iterator**接口.

```javascript
var obj = {};
obj[Symbol.iterator] = function* (){
  yield 1;
  yield 2;
  yield 3;
};

[...obj] //[1,2,3]
```


### 15.3 next方法的参数

`yied`表达式本身没有返回值(总是返回`undefined`)

`next`方法可以带一个参数

- **这个参数就会被当作上一个`yield`表达式的返回值.**


> Generator 函数从暂停状态到恢复运行,它的上下文(context)是不变的.通过`next`方法的参数,就有办法在Generator 函数开始运行之后,继续向函数体内部注入值(`就是还可以传参`),作为上一个`yield`表达式的返回值



```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```


上面代码中,由于a的第二次运行`next`方法的时候不带参数,导致y的值等于`2 * undefined`( 即`NAN` ),然后继续,将`NaN/3`还是`NaN`,第三次运行`Next`方法的时候不带参数，所以z等于`undefined`，返回对象的`value`属性等于`5 + NaN + undefined`，即`NaN`。

如果向`next`方法提供参数，返回结果就完全不一样了。上面代码第一次调用`b`的`next`方法时，返回`x+1`的值`6`；第二次调用`next`方法，将上一次`yield`表达式的值设为`12`，因此`y`等于`24`，返回`y / 3`的值`8`；第三次调用`next`方法，将上一次`yield`表达式的值设为`13`，因此`z`等于`13`，这时`x`等于`5`，`y`等于`24`，所以`return`语句的值等于`42`。

> 由于`next`传参是代表的是上一个`yield`表达式的值,所以第一次调用的时候并不能带参数(没有以上一个`yield`).V8 引擎直接忽略第一次使用`next`方法时的参数，只有从第二次使用`next`方法开始，参数才是有效的。从语义上讲，第一个`next`方法用来启动遍历器对象，所以不用带有参数。

如果想第一次`Next`就传入参数的话,可以在 Generator 函数外面再包一层.(其实就是**返回一个已经执行了第一次`next`的Genrator 函数**)

```javascript
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

wrapped().next('hello!')
// First input: hello!
```

`yield`也可以作为变量放在`${yield]`中输出
```javascript
function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a')
// 1. a
genObj.next('b')
// 2. b
```

### 15.4 for..of  循环

`for...of`循环可以自动遍历 Generator 函数 生成的`Ierator`对象,并且此时不需要调用`next`方法

```javascript
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

> 注意 `return`的时候 返回的是`{value:value,done:true}`,这时`done`为`true`所以循环会中止,且不包含该返回对象,所以`return`不包括在`for..of`的循环当中.

- 斐波那契数列
```javascript
function* fibonacci() {
  let [prev,curr]=[0,1];
  for (;;){
    [prev,curr]=[curr,prev + curr];
    yield curr;
  }
}
for(let v of fibonacci()){
  if(v > 1000) break;
  console.log(v);
}
```

原生的javascript对象没有遍历接口(Iterator),无法使用`for..of`循环,通过 Generator 函数为它加上这个接口，就可以用了。
```javascript
function* objectIterator(obj){
  //获取对象所有的键值数组
  let objKeys = Reflect.ownKeys(obj);

  for(let objKey of objKeys){

    //将值 键值对形式返回
    yield [objkey , obj[objKey]];

  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

上面代码中，对象jane原生不具备 Iterator 接口，无法用for...of遍历。这时，我们通过 Generator 函数objectEntries为它加上遍历器接口，就可以用for...of遍历了。加上遍历器接口的另一种写法是，将 Generator 函数加到对象的`Symbol.iterator`属性上面。


```javascript
function* objectIterator() {
  ////获取对象所有的键值数组
  let objKeys = Object.keys(this);

  for( let objKey of objKeys ){

    //输出键值对
    yield [objKey,this[objKey]];

  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectIterator;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```
> 加上`遍历接口(iterator)`后,除了`for...of`循环外,扩展运算符( `...` ),解构赋值和`Array.from`方法内部调用的,都是遍历器接口.这意味着,它们都可以将Generator 函数返回的 Ierator对象,作为参数.

```javascript
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```


### 15.5 Generator.prototype.throw()

Generator 函数返回的遍历器对象,都有一个`throw`方法,可在函数体外抛出错误,然后在Generator 函数体内捕获.

```javascript
var g =function* (){
  try {
    yield;
  } catch (e){
    console.log('内部捕获',e);
  }
};

var i = g();
i.next();

try{
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获',e);
}
// 内部捕获 a
// 外部捕获 b
```

遍历器对象`i`连续抛出两个错误.第一个错误被Generator函数体内的`catch`语句捕获,`i`第二次抛出错误,由于Generator函数内部的`catch`语句已经执行过了,不会再捕捉到这个错误了,所以这个错误就被抛出了Generator函数体,被`函数体外的catch`语句捕获



`throw`方法可以接受一个参数,该参数会被`catch`语句接收,建议抛出`Error`对象的实例。

```javascript
var g = function* () {
  try{
    yield;
  } catch(e) {
    console.log(e);
  }
};

var i = g();
i.next();
i.throw(new Error('出错了!'));
```

> 不要混淆遍历器对象的`throw`方法和全局的`throw`命令,上面的代码的错误,是由**遍历器对象的`throw`**方法抛出的,而不是全局的`throw`命令抛出的. 全局的`throw`命令只能被函数体外的`catch`语句捕获.

```javascript
var g = function* () {
  while (true) {
    try {
      console.log('1');
      yield;
    } catch(e) {
      console.log('2');
      if (e ! = 'a') throw e; 
      console.log('内部',e);
    }
  }
};

var i = g();
i.next();//1---这里执行了Generator里面的try 但没有抛出错误.所以没有被内部的捕获

try {
  throw new Error('a');//外部& 错误,然后被catch捕获,下面一条一句就不会被捕获了
  throw new Error('b');
} catch(e) {
  console.log('外部',e);
}
```

> 上面代码只捕获了`a`,是因为函数体外的`catch`语句块，捕获了抛出的`a`错误以后，就不会再继续`try`代码块里面剩余的语句了.



如果 Generator 函数内部没有部署`try...catch`代码块，那么`throw`方法抛出的错误，将被外部`try...catch`代码块捕获。

```javascript
var g = function* () {
  while (true) {
    yield;
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');//注意 这里是i抛出错误
  i.throw('b');//注意 这里是i抛出错误
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 a
```



上面代码中，Generator 函数`g`内部没有部署`try...catch`代码块，所以抛出的错误直接被外部`catch`代码块捕获。

如果 Generator 函数内部和外部，都没有部署`try...catch`代码块，那么程序将报错，直接中断执行。

`throw `方法被捕获以后,会附带执行下一条的`yield`表达式. 也就是说,会执行一次`next`方法.

```javascript
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}

var g = gen();
g.next() // a
g.throw() // b
g.next() // c
```

上面代码中,`g.throw`方法被捕获以后,自动执行了一次`next`方法,所以会打印`b`.另外,也可以看到,只要Generator函数内部部署了`try...catch`代码块,那么遍历器的`throw`方法抛出的错误,不影响下一次遍历。(就是不会中断)

另外,`throw`命令与`g.throw`方法是无关的.两者不互相影响

```javascript
var gen = function* gen(){
  yield console.log('hello');
  yield console.log('world');
}

var g = gen();
g.next();

try {
  throw new Error();
} catch (e) {
  g.next();
}
// hello
// world
```

上面代码中,`throw`命令抛出的错误不会影响到遍历器的状态,所以两次执行`next`方法,都进行了正确的操作.



这种函数体捕获错误的机制,大大方便了对错误的处理,多个`yield`表达式,可以只用一个`try...catch`来捕获**(因为内部throw之后会执行一次next,而不像全局的`throw`命令,会直接中断程序的执行)**,如果使用回调函数的写法,想要捕获多个错误,就不得不为每个函数内部写一个错误的语句,而使用Generator函数内部只要写一个`catch`语句就OK了



Generator 函数体外抛出错误 可以在函数体内捕获; 反过来, Generator函数体内抛出错误,也可以被函数体外的`catch`捕获.



```
function* foo() {
  var x = yield 3;
  var y = x.toUpperCase();
  yield y;
}

var it = foo();

it.next(); // { value:3, done:false }

try {
  it.next(42);
} catch (err) {
  console.log(err);
}
```

上面代码中，第二个`next`方法向函数体内传入一个参数42，数值是没有`toUpperCase`方法的，所以会抛出一个TypeError错误，被函数体外的`catch`捕获。



一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用`next`方法，将返回一个`value`属性等于`undefined`、`done`属性等于`true`的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。



```
function* g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('第一次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第二次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第三次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  console.log('caller done');
}

log(g());
// starting generator
// 第一次运行next方法 { value: 1, done: false }
// throwing an exception
// 捕捉错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done
```
上面代码一共三次运行`next`方法，第二次运行的时候会抛出错误，然后第三次运行的时候，Generator 函数就已经结束了，不再执行下去了。



### 15.6 Generator.prototype.return();

Generator函数返回的遍历器对象,还有一个`return`方法,可以返回给定的值,并且终结遍历Generator函数.

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()            //{ value:1,done:false }
g.return('foo') 	//{ value:'foo',done:true }
g.next() 			//{ value:undefined,done:true }
```

遍历器对象`g`调用`return`方法后,返回值`value`属性就是 `return`方法的参数`foo`.这样做以后,Generator函数的遍历就终止了,返回值的`done`属性为`true`,以后再调用next(),`done`属性**总是**返回`true`.



如果`return`方法调用时,不提供参数,则返回值`value`属性为`undefined`

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()            //{ value:1,done:false }
g.return() 	//{ value:undefined,done:true }
```



如果内部有`try...finally`代码块,那么`return`方法会推迟到`finally`代码块执行完再执行.

```javascript
function* numbers() {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```

调用`return`方法后,就跳开其他操作,执行开始执行`finally`代码块,执行完`finally`代码块后,再会执行`return`方法(`done`返回的是true),然后就结束.



### 15.7 yield* 表达式

在Generator函数内部,调用另一个Generator函数,默认情况下是没有效果的.

```javascript
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yiled 'x';
  foo();
  yield 'y';
}

for (let x of bar()){
  console.log(v);
}
//'x'
//'y'
//没有输出'x''a''b''y'的预期结果
```

`foo`和`bar`都是Generator函数,在`bar`中调用`foo`,是不会有效果的



这时就需要`yield*`表达式,用来在一个Generator函数里执行另一个Generator函数

```javascript
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

再来看一个对比的例子

```javascript
function* inner(){
  yield 'hello';
}

function* outer1(){
  yield 'open';
  yield inner();
  yield 'close';
}

var gen = outer1()
gen.next().value //'open'
gen.next().value // 返回一个遍历器对象
gen.next().value //'close'

function* outer2(){
  yield 'open';
  yield* inner();
  yield 'close';
}

var gen = outer2();
gen.next().value //'open'
gen.next().value //'hello!'
gen.next().value //'close'
```

`outer1`没有使用`yield*`,而`outer2`使用了,所以前者返回的是一个遍历器对象,而后者返回的是遍历器对象的内部的值.



从语法上看,如果`yield`后面跟的是一个遍历器对象,就需要在`yield`表达式后面加上星号,表明它返回的是一个遍历器对象.这就是`yield*`表达式

```javascript
let delegatedIterator = (function* () {
  yield 'hello';
  yield 'bye';
}());

let delegatingIterator = (function* () {
  yield 'Greetings!';
  yield* delegatedIterator;
  yield 'ok,bye';
}());

for (let value of delegatingIterator){
  console.log(value);
}
//'Greetings!"
//'hello'
//'bye'
//'ok,bye'

```

`delegatingIterator`是代理者,`delegatedIterator`是被代理者.由于`yiel* delegatedIterator  `得到的值,是一个遍历器,所以要用星号标识.运行结果就是使用一个遍历器,遍历果个Generator函数,有递归的效果.

`yield*`后面的Generator函数(没有`return`语句时),等同于在Generator函数内部,部署一个`for...of`循环.

```javascript
function* concat(iter1,iter2){
  yield* iter1;
  yield* iter2;
}

//等同于 

function* concat(iter1,iter2) {
	for (var value of iter1 ){
      yield value;
	}
  
  	for (var value of iter2 ){
      yield value;
  	}
}

```

`yield*` 后面的Generator函数(没有`return`语句时),不过是`for...of`的一种简写形式,完全可以用后者代替前者,反之,在有`return`语句的时,则需要用`var value = yield* iterator`的形式来获取`return`语句的值



如果`yield*`后面跟着一个数组,由于数组原生支持遍历器,因此就会遍历数组成员.

```javascript
function* gen(){
  yield* ['a','b','c'];
}

gen().next() //{value:'a',done:false}
gen().next() //{value:'a',done:false}
gen().next() //{value:'a',done:false}
gen().next() //{value:'a',done:false}

```

上面代码中,`yield`命令后面如果不加星号,返回的是整个数组,加了星号就标识返回的是数组的遍历器对象.



任何数据结构只要有Iterator接口,就可以被`yield*`遍历

```javascript
let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();

read.next().value // "hello"
read.next().value // "h"
```

上面代码中，`yield`表达式返回整个字符串，`yield*`语句返回单个字符。因为字符串具有 Iterator 接口，所以被`yield*`遍历。



如果被代理的 Generator函数有`return`语句,那么就可以向代理它的Generator函数返回数据.

```javascript
function* foo() {
  yield 2;
  yield 3;
  return 'foo';
}

function* bar() {
  yield 1;
  var v = yield* foo();
  console.log("v:" +v );
  yield 4;
}

var it = bar ();

it.next()
// {value: 1, done: false}
it.next()
// {value: 2, done: false}
it.next()
// {value: 3, done: false}
it.next();
// "v: foo"
// {value: 4, done: false}
it.next()
// {value: undefined, done: true}
```

因为在函数`foo`中有`return`语句,在执行到return语句时,就会向函数`bar`提供了返回值(而前面的是返回Generator遍历器对象)

```javascript
function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

[...logReturned(genFuncWithReturn())]
// The result
// 值为 [ 'a', 'b' ]

//拆分
function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned() {
  let result = yield* genFuncWithReturn();
  console.log(result);
}
[...logReturned()]

// The result
// 值为 [ 'a', 'b' ]
```

上面代码,存在两次遍历,第一次是`[...logReturned()]` 会遍历`logReturned()`返回的遍历器对象,第二次是`yield*`语句遍历函数`genFuncWithReturn`返回的遍历器对象。最终表现为扩展运算符遍历函数`genFuncWithReturn`返回的遍历器对象.所以,最后的数据表达式得到的值等于`['a','b']`.但是,函数`genFuncWithReturn`的`return`语句有返回值`The result `,会返回给函数`logReturned`内部的`result`变量,因此最终会有终端输出

> 1. `[...]`遍历logRenturned(),同时logRenturned()遍历`yield* genFuncWithReturn();` 将`yield 'a'` `yield 'b'`执行 输出结果`['a','b']`
> 2. `genFuncWithReturn`中的`return 'The result';` 赋值给`logReturned`中的`result`变量,最终终端输出



`yield*`取出嵌套数组的所有成员

```javascript
function* iterTree(tree){
  if(Array.isArray(tree)){
    for ( let i =0; i<tree.length;i++ ){
        yiled* iterTree(itree[i]);
      }
  } else {
    yield tree;
  }
}

const tree  = ['a', ['b','c'],['d','e']];

for (let x of iterTree(tree)) {
  console.log(x);
}
//a
//b
//c
//d
//e
```

下面是一个稍微复杂的例子，使用`yield*`语句遍历完全二叉树。

```javascript
function Tree(left, label, right) {
  this.left = left;
  this.right = right;
  this.label = label;
}

function make(arr) {
  if (arr.length == 1) return new Tree(null, arr[0], null);
  return new Tree(make(arr[0]), arr[1], make(arr[2]));
}

let tree = make([[["a"], "b", ["c"]], "d", [["e"], "f", ["g"]]]);

//先序
function* firstInorder(tree) {
  if (tree) {
    yield tree.label;
    yield* firstInorder(tree.left);
    yield* firstInorder(tree.right);
  }
}

//中序
function* midInorder(tree) {
  if (tree) {
    yield* midInorder(tree.left);
    yield tree.label;
    yield* midInorder(tree.right);
  }
}

//后序
function* endInorder(tree) {
  if (tree) {
    yield* endInorder(tree.left);
    yield* endInorder(tree.right);
    yield tree.label;
  }
}

var result1 = [];
for (let node of firstInorder(tree)) {
  result1.push(node);
}
var result2 = [];
for (let node of midInorder(tree)) {
  result2.push(node);
}
var result3 = [];
for (let node of endInorder(tree)) {
  result3.push(node);
}
console.log("树:" + tree);
console.log("先序:" + result1);
console.log("中序:" + result2);
console.log("后序:" + result3);
```



### 15.8 作为对象属性的Generator函数

如果一个对象的属性是Generator 函数,可以简写成下面形式

```javascript
let obj = {
  * myGeneratorMethod(){
   /*some code*/ 
  }
};
```

在`myGeneratorMethod`属性前面有一个星号,代表这个属性是一个`Generator`函数

完整形式如下:

```javascript
let obj = {
  myGeneratorMethod : function* () {
    //...some code
  }
};
```



### 15.9 Generator函数的`this`

Genrator 函数总是返回一个遍历器,ES6规定**这个遍历器是Generator函数的实例**,也继承了Generator函数的`prototype`对象上的方法.

```javascript
function* g() {}

g.prototype.hello = function () {
  retrun 'hi!';
};

let obj = g();

obj.instanceof g // true
//object instanceof constructor
// instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。
obj.hello //'hi!'
```

Generator函数`g`返回的遍历器`obj`,是`g`的实例,而且继承了 `g.prototype`.但是,如果把`g`当作普通的构造函数,并不会生效,因为`g`返回的总是**遍历器对象**,而不是`this`对象.

```javascript
function* g() {
  this.a = 11;
}
let obj = g();
obj.a //undefined
```

上面代码中，Generator函数`g`在`this`对象上面添加了一个属性`a`，但是`obj`对象拿不到这个属性。

Generator函数也不能跟`new`命令一起用，会报错。

```javascript
function* F(){
  yield this.x = 2;
  yield this.y = 3;
}

new F ()
// TypeError: F is not a constructor
```

那么，有没有办法让 Generator 函数返回一个正常的对象实例，既可以用`next`方法，又可以获得正常的`this`？

变通方法:arrow_heading_down:

生成一个空对象，使用`call`方法绑定 Generator 函数内部的`this`。这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。

```javascript
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj);//这里是内部的指针指向了obj,然后遍历器对象给了f

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3
```

首先是`F`内部的`this`对象绑定`obj`对象，然后调用它，返回一个 Iterator 对象。这个对象执行三次`next`方法（因为`F`内部有两个`yield`表达式），完成F内部所有代码的运行。这时，所有内部属性都绑定在`obj`对象上了，因此`obj`对象也就成了`F`的实例。



将上方遍历器对象`f`和生成的实例对象`obj`合二为一

一个办法就是将`obj`换成`F.prototype`。(就是将属性放到原型里面去了)

```
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

再将`F`改成构造函数，就可以对它执行`new`命令了。

```
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3

f instanceof gen  //true
gen.prototype.a = 2
f.a //2
//所以说.其实还是将数据放在了原型链当中
```

### 15.10含义

******************************

#### Generator 与状态机

Generator 是实现状态机的最佳结构。比如，下面的`clock`函数就是一个状态机。

```
var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tock!');
  ticking = !ticking;
}
```

上面代码的`clock`函数一共有两种状态（`Tick`和`Tock`），每运行一次，就改变一次状态。这个函数如果用 Generator 实现，就是下面这样。

```
var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};
var c = clock();
c.next();//tick
c.next();//tock
```

上面的 Generator 实现与 ES5 实现对比，可以看到少了用来保存状态的外部变量`ticking`，这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。



#### Generator与协程

协程( coroutine )是一种程序运行的方式.可以理解成"协作的线程"或"协作的函数".协程既可以用单线程实现,也可以用多线程实现. 前者是一种特殊的子例程,后者是一种特殊的线程.

1. 协程与子例程的差异

   传统的"子例程"( subroutine ) 采用堆栈式"后进先出"的执行方式,只有当调用子函数完全执行完毕之后,才会执行父函数,协程与其不同,多个线程( 单线程情况下,即多个函数 ) 可以并行执行,但是只有一个线程(或函数)处于正在运行的状态,其他线程( 或函数 )都处于暂停态(suspended), 线程(或函数) 之间可以交换执行权,也就是说,一个线程(或函数)执行到一半,可以暂停执行,将执行权交给另一个线程( 或函数 ),等到稍后收回执行权的时候,再回复执行.这种可以并行执行,交换执行权的线程( 或函数 ),就称为协程.

   从实现上看,在内存中,子例程只使用一个栈( stack ) ,而协程是同时存在多个栈,但只有一个栈是在运行状态,也就是说,协程是以多占用内存为代价,实现多任务的并行.

2. 协程与普通线程的差异

   协程适合用于多任务运行的环境.在这个意义上,它与普通的线程很相似,都有自己的执行上下文,可以分享全局变量.它们的不同之处在于,同一时间可以有多个线程处于运行状态,但是运行的协程只有一个,其他协程都处于暂停状态.此外,普通线程都是抢先式的,到底哪个线程优先得到资源,必须由运行环境决定,但是协程都是合作式,执行权由协程自己分配.

   由于JavaScript 是单线程语言,只能保持一个调用栈,引入协程之后,每个任务可以保持自己的调用栈,这样做的最大好处,就是抛出错误的时候,可以找到原始的调用栈,不至于像异步操作的回调函数那样,一旦出错,原始的调用栈早就结束了.

   Generator 函数是ES6 对协程的实现,但属于不完全的实现。Generator函数被称为'半协程(semi-coroutine)',意思是只有Generator 函数的调用者,才能将程序的执行权还给Generator函数.如果是完全执行的协程,任何函数都可以让暂停的协程继续执行.

   如果Generator函数当作协程,完全可以将多个需要互相协作的任务写成Generator函数,它们之间使用`yield`表示式交换控制权


### 15.11 应用

Generator 可以暂停函数执行，返回任意表达式的值。这种特点使得 Generator 有多种应用场景。

#### 异步操作的同步化表达

Generator 函数的暂停执行的效果，意味着可以把异步操作写在`yield`表达式里面，等到调用`next`方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在`yield`表达式下面，反正要等到调用`next`方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

```javascript
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()
```

上面代码中，第一次调用`loadUI`函数时，该函数不会执行，仅返回一个遍历器。下一次对该遍历器调用`next`方法，则会显示`Loading`界面（`showLoadingScreen`），并且异步加载数据（`loadUIDataAsynchronously`）。等到数据加载完成，再一次使用`next`方法，则会隐藏`Loading`界面。可以看到，这种写法的好处是所有`Loading`界面的逻辑，都被封装在一个函数，按部就班非常清晰。

Ajax 是典型的异步操作,通过Generator函数部署Ajax操作,可以用同步的方式表达.

```javascript
function* main(){
  var result = yield request('//some.url');
  var resp = JSON.parse(result);
  console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}

var it = main();
it.next();

//自己改的

function* main() {
  var result = yield ajaxFnc('www.baidu.com');
  var resp = result;
  console.log(resp);
}

function ajaxFnc(url){
  var a ='callback';
  setTimeout(function(){
    console.log('123')
    it.next(a);//这里的a会作为return 的值传给result ,因为yield表达式本身没有值,总是等于`undefined`
  },0)
}
var it = main();
it.next();
```

上面代码的`main`函数，就是通过 Ajax 操作获取数据。可以看到，除了多了一个`yield`，它几乎与同步操作的写法完全一样。注意，`makeAjaxCall`函数中的`next`方法，必须加上`response`参数，因为`yield`表达式，本身是没有值的，总是等于`undefined`。

下面是另一个例子，通过 Generator 函数逐行读取文本文件。

```
function* numbers() {
  let file = new FileReader("numbers.txt");
  try {
    while(!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}

```

上面代码打开文本文件，使用`yield`表达式可以手动逐行读取文件。

#### 控制流管理

如果有一个多步操作非常耗时,采用回调,就会有可能写成下面这样.

```javascript
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});
```

采用Promise改写上面的代码.

```javascript
Promise.resolve(step1)
	.then(step2)
	.then(step3)
	.then(step4)
	.then(fucntion (value4) {
      // Do something with value4
	},function (error) {
      // Handle any error from step1 through step4
	})
    .done();
```

上面代码利用Promise 将回调函数改成了直线执行的形式,但是假如了大量Promise的语法(其实还是回调地狱...所以Promise并不是解决异步的最优方案,`Async/Await`算是目前的终极解决方案,结合了`yield`和`promise`的优点)。Generator 函数可以进一步改善代码运行流程。

```javascript
function* longRunningTask(value1){
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    //...some code
  } catch(e) {
    //Handle any error fome step1 through step4
  }
}
```

然后,使用一个函数,按次序自动执行所有步骤.

```javascript
scheduler(longRunningTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束,就继续调用
  if(!taskObj.done){
    task.value = taskObj.value;
    scheduler(task);
  }
}
```

注意,上面这种做法,只适合同步操作,即所有的`task`都必须同步的,不能有异步操作,因为这里的代码一得到返回值,就继续往下执行,没有判断异步操作何时完成. 

```javascript
let steps = [step1Func,step2Func,step3Func];
function* iteratesSteps(steps){
  for(var i=0; i < steps.length; i++ ){
    var step = steps[i];
    yield step();
  }
}
```

数组`step`封装了一个任务的多个步骤,Generator函数`iterateSteps`则是依次为这些步骤加上了`yield`命令.

将任务分解成步骤之后,还可以将项目分解成多个依次执行的任务

```javascript
let jobs = [job1,job2,job3];

function* iterateJobs(jobs){
  for (var i =0;i<jobs.length;i++){
    var job =jobs[i];
    yield* iterateSteps(job.steps);
  }
}
```

数组`jobs`封装了一个项目的多个任务，Generator 函数`iterateJobs`则是依次为这些任务加上`yield*`命令。然后执行上面的`iterateSteps` 将每一个任务的多个步骤依次执行.

最后，就可以用`for...of`循环一次性依次执行所有任务的所有步骤。

```
for (var step of iterateJobs(jobs)){
  console.log(step.id);
}
```

上面的做法只能用于所有步骤都是同步操作的情况，不能有异步操作的步骤。

`for...of`的本质是一个`while` 循环,所以上面的代码实质上执行的是下面的逻辑.

```javascript
var it = iterateJobs(jobs);
var res = it.next();
while(!res.done){
  var sesult = res.value;
  //...some code
  res = it.next();
}
```
#### 部署Iterator接口

利用Generator函数,可以在任意对象上部署Iterator接口.

```javascript
function* iterEntries(obj){
  let keys = Object.keys(obj);
  for( let i =0; i < keys.length; i++ ){
    let key = keys[i];
    yield [key,obj[key]];
  }
}

let myobj = {foo:3,bar:7};
for (let [key,value] of iterEntries(myobj)){
  console.log(key,value);
}
//foo 3
//bar 7
let myObjIterator = iterEntries(myobj);
myObjIterator.next();//{value:[foo,3],done:false}
myObjIterator.next();//{value:[bar,7],done:false}
```

`myObj`是一个普通对象,通过`iterEntries`函数,就有了`Iterator`接口,也就是说,可以在任意对象上部署`next`方法

下面是一个对数组部署 Iterator 接口的例子，尽管数组原生具有这个接口。

```javascript
function* makeSimpleGenerator(array){
  var nextIndex = 0;

  while(nextIndex < array.length){
    yield array[nextIndex++];
  }
}

var gen = makeSimpleGenerator(['yo', 'ya']);

gen.next().value // 'yo'
gen.next().value // 'ya'
gen.next().done  // true
```

#### 作为数据结构

Generator可以看作是`数据结构`,更确切地说,可以看作是一个`数组结构`,因为Generator函数可以返回一系列的值,这意味着它可以对任意表达式,提供类似数组的接口

```javascript
function *doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}
```

上面代码就是依次返回三个函数，但是由于使用了 Generator 函数，导致可以像处理数组那样，处理这三个返回的函数。

```javascript
for (task of doStuff()) {
  // task是一个函数，可以像回调函数那样使用它
}
```

实际上，如果用 ES5 表达，完全可以用数组模拟 Generator 的这种用法。

```javascript
function doStuff() {
  return [
    fs.readFile.bind(null, 'hello.txt'),
    fs.readFile.bind(null, 'world.txt'),
    fs.readFile.bind(null, 'and-such.txt')
  ];
}
```

上面的函数，可以用一模一样的`for...of`循环处理！两相一比较，就不难看出 Generator 使得数据或者操作，具备了类似数组的接口。

#### 小笔记

> 如果想`yield` 后面的方法的return能正确输出,就要将函数变为Generator函数`function*`然后再将`yield`改
>
> 为`yield*` 才会正确的将`return`的值返回,否则将返回一个遍历器对象(`.next()`才是调用)

自己的小demo

```javascript
let steps = [step1Func, step2Func, step3Func];
function* iteratesSteps(steps) {
  var a1 = yield* steps[0]();
  var a2 = yield* steps[1](a1);
  var a3 = yield* steps[2](a2);
}
function* step1Func() {
  return 1
}
function* step2Func(a) {
  console.log(a);
  return a;
}
function* step3Func(a) {
  console.log(a);
  return a;
}
//这里是利用了遍历 将yield都执行了 
for(var i of iteratesSteps(steps)){
  console.log(i);
  //1
  //1
}
//这里是.next()循环调用
let a = iteratesSteps(steps);
var res = a.next();
var v=0;
while(!res.done){
  v +=res.value; 
  res = a.next();
}
```

