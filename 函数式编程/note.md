[函数式编程](https://segmentfault.com/t/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B/blogs)



## 函数基础

你所有编写的 `function` 应该接收输入值，并且返回输出值。



### 函数输入

在 JavaScript 中，**实参**的个数没必要完全符合**形参**的个数。如果你传入许多个**实参**，而且多过你所声明的**形参**，这些值仍然会原封不动地被传入。你可以通过不同的方式去访问，包含了你以前可能听过的老办法 —— `arguments` 对象。反之，你传入少于声明**形参**个数的**实参**，所有缺少的参数将会被赋予 `undefined` 变量，意味着你仍然可以在函数作用域中使用它，但值是 `undefined`。



在函数式编程中，我们希望我们的函数在任何的情况下是一元的，有时我们甚至会使用各种技巧来将高 Arity 的函数都转换为一元的形式。



### 函数输出

#### 提前 return

`return` 语句不仅仅是从函数中返回一个值，它也是一个流量控制结构，它可以结束函数的执行。因此，具有多个 `return` 语句的函数具有多个可能的退出点，这意味着如果输出的路径很多，可能难以读取并理解函数的输出行为。

```javascript
function foo(x) {
    if (x > 10) return x + 1;

    var y = x / 2;

    if (y > 3) {
        if (x % 2 == 0) return x;
    }

    if (y > 1) return y;

    return x;
}
```

```javascript
function foo(x) {
    var retValue;

    if (retValue == undefined && x > 10) {
        retValue = x + 1;
    }

    var y = x / 2;

    if (y > 3) {
        if (retValue == undefined && x % 2 == 0) {
            retValue = x;
        }
    }

    if (retValue == undefined && y > 1) {
        retValue = y;
    }

    if (retValue == undefined) {
        retValue = x;
    }

    return retValue;
}
```

这个版本毫无疑问是更冗长的。但是在逻辑上，我认为这比上面的代码更容易理解。因为在每个 `retValue` 可以被设置的分支， 这里都有个**守护者**以确保 `retValue` 没有被设置过才执行。

相比在函数中提早使用 `return`，我们更应该用常用的流控制（ `if` 逻辑 ）来控制 `retValue` 的赋值。到最后，我们 `return retValue`。

不是说只能有一个 `return`，或不应该提早 `return`，只是认为在定义函数时，最好不要用 `return` 来实现流控制，这样会创造更多的隐含意义。尝试找出最明确的表达逻辑的方式，这往往是最好的办法。

#### 未 `return` 的输出

```javascript
function sum(list) {
    var total = 0;
    for (let i = 0; i < list.length; i++) {
        if (!list[i]) list[i] = 0;

        total = total + list[i];
    }

    return total;
}

var nums = [ 1, 3, 9, 27, , 84 ];

sum( nums );            // 124
//nums会被修改
```

这个隐式函数输出在函数式编程中有一个特殊的名称：副作用。 因为是引用类型,`list` 使用了 `nums` 的引用，不是对 `[1,3,9,..]` 的值复制，而是引用复制。因为 JS 对数组、对象和函数都使用引用和引用复制，我们可以很容易地从函数中创建输出，即使是无心的。



### 函数功能

函数是可以接受并且返回任何类型的值。一个函数如果可以接受或返回一个甚至多个函数，它被叫做高阶函数。

```javascript
function forEach(list,fn) {
    for (let i = 0; i< list.length; i++){
        fn( list[i] );
    }
}
forEach( [1,2,3,4,5], function each(val){
    console.log( val );
} );
// 1 2 3 4 5
```

