## day4

#### 面向对象一定要记得实例化!
> 为什么要实例化?


> 因为只有实例化之后，才能将这个对象放到内存中，然后才能在规定的范围内来调用。
当然，这不包括静态对象，静态对象是可以直接调用的。
因为只有实例化之后，才能将这个对象放到内存中，然后才能在规定的范围内来调用。


### 面向对象编程

#### 好处

> 分类管理 封装性 模块化 方便初级工程师参与项目的开发中 方便寻找错误 不会导致牵一发而动全身

> 代码修改方便,扩展容易

> 面向未来编程(考虑以后的更改)

#### 步骤

> 先思考需要哪几个对象 在思考方法属性

### 面对对象编程是一种艺术

> 有几个对象

> 对象有几个方法

> 都是灵活可变的

### 什么是数据绑定

> 前端:html(div span h1)

> 数据都是写死的,都是假的(静态的)

> 真数据是后台通过传递过来的,然后再替换页面当中假数据(动态)

### 拼接时代

>  第一种 创建节点

>  第二种 拼接字符串的

>  第三种 JQ.html();

>  也是 动态时代


### 绑定数据的几种方式

1. +豆豆加加法则 

```javascript
"+this.name+"
```

2. 使用formateString绑定数据

> 首先寻找@(name)这种格式的数据,然后用真是的数据替换掉@(name) 

```javascript
//简单使用
var user ={name:"111"};
var span =document.getElementById("span");
var str = '欢迎@(name)访问本网站';
str = formateString(str,user);
span.innerHTML=str;
```

> formateString这个函数只能针对简单的对象进行绑定(局限性)

```javascript
 bindOneImage: function(data) {
        var str = '';
        str += ' <li>';
        str += '<img class="etalage_thumb_image" src="@(small)" class="img-responsive" />';
        str += '<img class="etalage_source_image" src="@(big)" class="img-responsive" />';
        str += '</li>';
        var html = $$.formateString(str, data);
        return html;
    },
    bindImages: function() {
        var str = '';
        for (var i = 0; i < this.images.length; i++) {
            var item = this.images[i];
            str += this.bindOneImage(item)
        }
        $('.etalage').html(str);


        /*jquery插件实现的幻灯片特效*/
        $('#etalage').etalage({
            thumb_image_width: 250,
            thumb_image_height: 300,
        });
    },
```

> formateString函数

```javascript
    formateString: function(str, data) {
        return str.replace(/@\((\w+)\)/g, function(match, key) {
            return data[key]
        });
    }
```

3. 模板 undrstore artTemplate

> artTemplate绑定集合

```javascript
    <div id="mydiv"></div>
    <script type="text/html" id="art">
        <ul>
            {{each films as film}}
            <li>
                <h2>电影名称:</h2>{{film.name}}<br/>
                <h2>主演:</h2>{{film.protagonist}}<br/>
                <h2>上映时间:</h2>{{film.time}}
            </li> {{/each}}
        </ul>
    </script>
    <script type="text/javascript">
        var data = {
            films: [{
                name: "木木不哭",
                protagonist: "木木",
                time: "2017年1月11日"
            }, {
                name: "木木不哭",
                protagonist: "木木",
                time: "2017年1月11日"
            }, {
                name: "木木不哭",
                protagonist: "木木",
                time: "2017年1月11日"
            }, ]
        }
        var html = template('art', data);
        document.getElementById('mydiv').innerHTML = html;
    </script>
```

> artTemplate字符串拼接形式

```javascript
    <script type="text/javascript">
    var str = '';
    str+='<h2>电影名称:</h2>{{name}}<br>';
    str+='<h2>主演:</h2>{{protagonist}}<br/>';
    str+='<h2>上映时间:</h2>{{time}}';
        var film ={
            name:"木木不哭",
            protagonist:"木木",
            time:"2017年1月11日"
        }

        $$.$id('mydiv').innerHTML=html;

        function bindArtTemplate(str,data){
            var render=template.compile(str)
            var html =render(data);
        return html;
        }
    </script>
```

### replace进阶使用

* $ 特殊符号

```javascript
   var mystring = 'abc & cba';
        mystring = mystring.replace(/(\w+)\s*&\s*(\w+)/g, "$2 & $1");
        console.log(mystring);
```

* 将字符串中每个英文单词的首字母变为大写


```javascript
        var mystring = 'aaa bbb ccc';
        mystring = mystring.replace(/\b\w+\b/g, function(word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1);
        });
        console.log(mystring);
```


---------------------------------------


## 面对对象三大作用

1. 封装框架  ----封装性

2. 描述数据

3. 面向对象编程 








---------------------------------------


### 数据类型复习

1. 数据类型检测的重要性

> 注意:字符串相加和数字类型相加

> '3000'+'4000'='30004000'

2. 如何检测数据类型


###第一种

> type of 局限性  当是对象和数组的时候 返回的都是object

###第二种

#### 所以我们要用!  toString.call

> toString.call()

> 例子 判断是否为数字

```javascript
function checkNum(str){
    return toString.call(str) ==='[object Number]';
}
```

### 第三种

> instanceof

> 判断已知对象类型的方法 : instanceof

```javascript

var arr = new Array();

console.log(arr instanceof Array); //----------------> true

```

### 第四种

> constructor

```javascript

console.log(arr.constructor === Array) // ---------------------> true

```



---------------------------------------


### 变量的内存分配

1. 数组

```javascript
var arr1 = ['1','2']; //分配内存 这时候 '1','2'在堆中开辟空间,存放在堆中,而arr1则在栈中开辟空间,存放指向数组内容在堆中的地址

var arr2 = arr1 ; //这时 arr2在堆中开辟空间,并将arr1存放的地址拷贝过来,即arr2中存放着指向数组内容在堆中的地址

arr1.push('3');
arr1.push('4');//改变堆中数组内容,而指向的地址却没有改变,改变的是arr1,arr2共同指向的区域,所以改变影响的是两个

console.log(arr1.length);//4
console.log(arr2.length);//4

```

#### 引用类型和值类型

> 数值,字符串,undefined,布尔:值类型(每次赋值都会开辟独立的区域,谁都不会影响谁)
> 数组,函数,对象,null:引用类型(如果将一个变量拷给另一个变量,那么拷贝的是指向和操纵堆中同一个区域的地址,如果改变的话,就会两个都会发生改变)



### 面试题


```javascript

var a = {x:'1'};
var b=a ;
a.x=2;
console.log(b.x);//2 
a={"x":3}//重新赋值 会重新在堆中开辟新区域,这时候a指向新的对象,a和b就谁也不影响谁了
console.log(b.x)//2


var a = {n:1};
var b = a;
//a.x=a={n:2};//拆分
a.x={n:2};
a={n:2};
console.log(a.x);//undefined
console.log(b.x);//n:2

```

### 创建对象几种方法



* #### 字面量

```javascript
var boy={
    name:'111',
    sex:'male'WS
}
```

> 访问json(字面量)中的属性
> boy.name (点语法)
> boy\['name'\](中括号方法);

* #### object

```javascript

var boy = new Object();
boy.name='1111';
boy.sex="male";

```

* #### 构造函数(缺点 浪费内存)

```javascript
var Human = function(option){
    this.name = option.name;
    this.sex = option.sex;
    this.move = function(){
    console.log("move");}
}

var option={
    name:'111',
    sex:'male'
}
var boy = new Human(option);

```

* #### 原型对象 (如果是值类型,没问题,如果是引用类型,就会有问题)

```javascript

 var Human=function(){};
 Human.prototype.name='111';
 Human.prototype.sex='male';
 Human.prototype.wugong=['九阳神功','九阴真经'];
 Human.prototype.move = function(){
    console.log("move");}
}
```
> 如果定义的是值类型,例如boy.name='1111',这种是没有问题的,

> 但是如果修改的是引用类型,就会修改共享的东西,导致原型被修改,所有的都会被修改

```javascript

var boy = new Human();
boy.wugong.push('龙抓手');
var gril = new Human();
console.log(boy.wugong);//['九阳神功','九阴真经','龙抓手']
console.log(girl.wugong);//['九阳神功','九阴真经','龙抓手']

```

* #### 双对象法则,把属性放在构造函数当中,把方法放在原型当中


* #### 拷贝模式

```javascript

var boy ={
    name:'111',
    sex:'male'
}

var gril ={
    name:'222',
    sex:'male'
}

var baojian = {
    bjname:'666',
    JN:'777'
    }

//属性拷贝方法

function extend(target,source){
    //遍历对象
    for(i in source){
    target[i]=source[i];
}
    return target;
}
extend(boy,baojian);//将宝剑的属性拷贝给boy
console.log(boy);//boy{name:'111',sex:'male',bjname:'666,JN:'777};

var jianxiake = extend({},baojian);
console.log(jianxiake);
console.log(boy);
//jianxiake{name:'111',sex:'male',bjname:'666,JN:'777};
```

> extend非常常用,一般用于给另一个对象扩充功能(添加属性和方法)

* #### 第三方框架改造对象

> 例子 base2.js框架

```javascript

var Product = Base.extend({
    //构造函数
    constructor:function(name){
    this.name=name;
    this.price=0;
},
    bindDom:function(){},
    bindEvents:function(){},
    init:function(){}
});

// 使用

var iphone = new Product();
iphone.name='iphone7';
iphone.price=666;

```

