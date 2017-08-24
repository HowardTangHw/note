### for中的闭包问题
```javascript
for (var i = 0; i < 5; i++) { 
    setTimeout(function() { 
        console.log(new Date, i); 
    }, 1000); 
} 
console.log(new Date, i);
```

- 什么是闭包
    + 闭包域,每当声明了一个函数,它就产生了一个闭包域(可以解释为每个函数都有自己的函数栈),每个闭包域(Function 对象)都有一个 function scope(不是属性),function scope内默认有个名为 Global 的全局引用(有了这个引用,就可以直接调用 Global 的属性或方法)(就是引用外部的变量和方法)
    + 凡是在闭包域内声明的变量或方法,外部无法直接访问
    + 闭包域可以访问外部的变量或方法

- 为什么全部都是5
    + 因为当在闭包域中,调用外部的变量的时候,其实是引用对象,(存放的是地址,所以当引用的对象发生改变的时候,就会跟着改变)
    + 当在一个闭包域内包含另一个闭包域时
    + 若子闭包域(内部的闭包域,内部函数)使用了父闭包域(外部闭包域,外部函数)的私有变量(在父闭包域中声明的变量,父闭包域的外部空间无法直接访问,但子闭包域可以访问)
    + 子闭包域即当前的子函数的 function scope 会产生一个 closure 对象属性,这个对象属性内包含的是子闭包域对父闭包域的所有引用
    + 倘若在父闭包域存活期间对其私有变量内容进行修改,则对这些父闭包域的私有变量进行引用的子闭包域中 function scope 的 closure 对象属性的内容也会发生变化,因为这只是引用.

- 就是function里面的i,是引用类型,存放的是地址,而不是具体的值
- 例子
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <script type="text/javascript" charset="utf-8">
        //函数 a 有一个私有变量 p 和一个内部函数 innerA
        function a() {                      //外部闭包域 ,一个名为 a 的 Function 对象
            var p = 0;                      //私有变量 p
            var innerA = function () {      //内部闭包域 ,一个名为 innerA 的 Function 对象
                console.log(p);             //对外部闭包域的私有变量进行了引用,故 innerA 对象的 function scope 会产生一个名为 closure 的对象属性,closure 对象内含有一个名为 p 的引用
            }

            innerA();//输出0
            p++;
            innerA();//输出1
        }
        a();
    </script>
</body>
</html>
```

- 最上面题目输出的结果
    + 5,5,5,5,5,5;

- 解决方法1:自执行函数(声明即执行的函数表达式)
```javascript
for (var i = 0; i < 5; i++) { 
    (function(j){setTimeout(function() { 
        console.log(new Date, j); 
    }, 1000); })(i)
} 
console.log(new Date, i);
```

- 因为函数的传参是值类型传参,所以传入的是值,而不是地址

- 解决方法2:分开写 也是利用 JS 中基本类型(Primitive Type)的参数传递是按值传递(Pass by Value)的特征
```javascript
var output = function (i) { 
    setTimeout(function() { 
        console.log(new Date, i); 
    }, 1000); 
}; 
for (var i = 0; i < 5; i++) { 
    output(i);  // 这里传过去的 i 值被复制了 
}

console.log(new Date, i);
```

- 解决方法3:利用ES6的块级作用域
```javascript
var j;
for (let i = 0; i < 5; i++) { 
    j=i;
    setTimeout(function() { 
        console.log(new Date, i); 
    }, 1000); 
} 
console.log(new Date, j);
```

### 块级作用域和函数作用域的不同

- var是全局变量,在子闭包内部调用的时候,是函数作用域,传参是引用类型,是function Scope中的closure对象进行记录

- 而当let的时候,就是块级作用域,每一个子作用域调用父作用域的变量是,是Block Scope,每次循环的块作用域都被劫持了，并且每次迭代i都被重新声明,即在此时，每层迭代会生成一个块作用域，并且变量i的值被定义为上次结算的值，

- (自己的理解) 就是当父块的参数传入子块之后,子块有自己的作用域,不会因外部的变化而变化(就类似于值传递) -(for的话,就像上面那题,里面就有5个setTimeout,就相当于有了5个块,存放着每次for传进来的i值)

- let 关键字可以将变量绑定到所在任意作用域，即let为声明的变量隐式的劫持了所在的块作用域，将变量隐式附加在已经存在的块作用域中