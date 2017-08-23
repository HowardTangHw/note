## day3

####  复习

1.1.1 工具和工具包
> 函数:工具 (函数封装性)
> 对象:工具和工具包
> 函数封装性 对象封装性 ----打火机,只需要会用,不需要知道内部是怎样实现的

1.1.2 面向对象编程和汽车组装的关系(零部件)

> 1 定义对象 - 抽象(概念)
> 2 编写零件
> 3 编写部件
> 4 实例化(具体---new)
> 5 面向对象编程

*************************************************************************


#### 计算机运行原理

> QQ如何运行?
> 第一步:将磁盘中的数据,翻译成二进制,然后放入内存里面
> 第二步:CPU从内存中读取数据 然后解析




*************************************************************************


#### 构造函数进阶
> 构造函数和普通函数区别
> 是一回事,不过为了区分,第一个字母为大写


#### 变量声明提升(只是变量声明提升 就是var a;提升)
#### 函数提升则是整个函数体提升(函数表达式则不是.var a = function(){} 提升的只是 var a; function a =(){}会整体提升)



### 面试题
```javascript
var fun =function(){
	this.name="peter";
	return {
	name:"jack"
};
}
var p = new fun();
console.log(p.name);
```
> 函数返回的是一个对象 所以是jack


#### 属性进阶
> 万物皆属性
> 万物皆变量:所有数据都是通过变量来保存的
> 一切数据都是通过变量管理的  不管简单类型(字符串 数字 布尔 undefined)还是复杂类型(对象 函数)


*************************************************************************


## 对象实例进阶


> 变量是如何在内存中存储的
> 第一步:将磁盘中的数据,翻译成二进制,然后放入内存里面
> 第二步:CPU从内存中读取数据 然后解析

> 当我们实例化的时候 会在内存里面开辟两段区域:
> 在栈中的专门存储简单变量
> 在堆中的专门存储对象
```javascript
var p = new Product()
```
> p是简单类型的变量,储存在栈中, p中保存的其实是地址值
> 对象的数据 储存在堆中


### 属性拷贝法则

> 当我们实例化的时候,会在内存中开辟一段区域,然后自动拷贝构造函数中的所有属性和方法]
> 原型是隐藏的属性,所以实例化的时候,也会将原型的地址所复制拷贝

### 属性搜索机制

> 当调用属性/方法的时候,会先在自身中寻找,如果找不到,则会根据原型地址值(自身隐藏属性__proto__),根据指向的空间,在原型对象中遍历,如果发现则返回


### 为什么方法要放在原型里面

> 因为如果放在构造函数中,每实例化一次就会在堆中开辟一部分空间,就会同样的内容却重复的占用内存空间,浪费内存
> 原型对象中的属性和方法被所有实例共享 那么只会在内存中创建一次,所有实例通过指针指向
> 将不一样的放在构造函数中,将一样的东西放在原型中


### 原型对象的本质

> 原型对象中的属性和方法被所有实例共享 那么只会在内存中创建一次




## 原型进阶(总结)
> 构造函数缺点:当方法是所有实例共享的时候,没必要为每个实例开辟空间存放共享的方法

> 这个时候可以将方法放在原型当中

> 原型可以被所有实例化共享,并且只会创建一次

> 每次实例化的时候,会然后自动拷贝构造函数中的所有属性和方法,包括隐藏的原型空间地址(属性拷贝法则)

> 当调用属性/方法的时候,会先在实例化空间中寻找,如果找不到,则会根据原型地址值,根据指向的空间,在原型对象中遍历,如果发现则返回(属性搜索机制)


###测试题
```javascript
		var fun =function(){};
		fun.prototype={
			info:{
				name:'peter',
				age:'25'
			}
		}
		var a = new fun();
		var b = new fun();
		a.info.name='jack';
		b.info.name='tom';
		console.log(a.info.name);
		console.log(b.info.name);
		//tom tom

```
> 原型区域只有一个,而不是每个实例都有一个,都是指向的同一片区域,所以修改的时候,是修改的同一个内存区域
> 只有引用类型才会共享,值类型是不共享的

#### 测试题
```javascript 
var fun = function(){}
fun.prototype = {
	name:"111",
	buy:function(){
	console.log("原型里面的方法")
},
	info:{
	name:"tom"
}

}
var a = new fun();
var b = new fun();
a.name="222";
//额外加的
a.buy=function (){
	console.log("a的方法")
}
console.log(a.name);//222
console.log(b.name);//111
//
a.buy(); //a的方法
b.buy(); //原型里面的方法
```
> 因为修改的是实例（构造函数）直接在a实例当中添加了name:"111";
> 因为！只有引用类型才会共享

####  测试题

```javascript
console.log(sum);// 函数体
var sum =1;
function sum(){
	console.log("函数")；
}
console.log(sum);//1
```

> 先是变量提升 然后 函数变量也提升 然后再从上到下执行 就会变成

```javascript
var sum;
function sum(){
	console.log("函数")；
}
console.log(sum);// 函数体
sum=1;
console.log(sum);//1
```


### 双对象法则

> js里面定义对象和其他语言不太一样,他通过两个对象来完成定义对象的功能(构造函数 原型对象)


### 原型链

1. 任何构造函数都包含一个隐藏的属性 __proto__

> 里面存储的是原型对象在内存中的地址 

2. 原型对象中有一个隐藏的属性 constructor 回址给构造函数

##### __proto__ 就像一条链 将构造函数和原型连接起来 这就是原型链


##### 属性过滤机制

> hasOwnProperty 用于过滤原型中的属性(判断属性是否自身的)

##### 属性屏蔽理论

> 构造函数和原型中,如果有同名的的属性和方法,那么 原型中的并不是被删除了,只是被屏蔽了

> 可以使用delete product.buy 将构造函数对象删除,那么就会展示原型中的同名属性和方法了

> 或者 product.prototype.buy() 访问




### 案例

1. 产品js

```javascript
//定义一个产品对象
function Product(cart) {
    //名称
    this.name = "";
    //简介
    this.description = '';
    //原价
    this.price = 0;
    //团购价
    this.GroupPrice = 0;
    //购买人数
    this.sum = 0;
    //将购物车对象传进来,因为我的产品对象,需要使用其他对象,可以通过参数来传递
    this.cart = cart;
    //图片
    this.images = [{ small: '', big: '' }, { small: '', big: '' }, { small: '', big: '' }];

}
Product.prototype = {
    //  绑定基本信息
    bindDom: function() {
        var str = "";
        str += '<h1 id="pname">' + this.name + '</h1>';
        str += ' <ul class="rating">';
        str += ' <li>';
        str += ' <a class="product-rate" href="#"> </a> <span> </span></li>';
        str += '<li><a href="#" id="buyCount">' + this.sum + '</a>人购买</li>';
        str += ' <div class="clearfix"></div>';
        str += ' </ul>';
        str += '<div class="price_single">';
        str += ' <span class="reducedfrom" id="price">$' + this.price + '</span>';
        str += '<span class="actual" id="groupPric">$' + this.GroupPrice + '</span><a href="#">团购</a>';
        str += ' </div>';
        str += '<h2 class="quick">简述:</h2>';
        str += '<p class="quick_desc" id="description"> ' + this.description + '</p>';
        $(".pdetail").html(str);
    },
    //绑定事件
    bindEvents: function() {

    },
    //绑定图片
    bindImages: function() {
        var str = '';
        for (var i = 0; i < this.images.length; i++) {
            var item = this.images[i];
            str += ' <li>';
            str += '<img class="etalage_thumb_image" src="' + item.small + '" class="img-responsive" />';
            str += '<img class="etalage_source_image" src="' + item.big + '" class="img-responsive" />';
            str += '</li>';
        }
        $('.etalage').html(str);


        /*jquery插件实现的幻灯片特效*/
        $('#etalage').etalage({
            thumb_image_width: 250,
            thumb_image_height: 300,
        });
    },
    init: function() {
        this.bindDom();
        this.bindImages();
        this.bindEvents();
    }
}

```



2. 购物车js

```javascript
//定义一个购物车对象
function Cart() {
    this.sum = 0;
    this.price = 0;
    this.products = [];


}
Cart.prototype = {
    // 绑定基本信息
    bindBasic: function() {
        //绑定产品个数
        $('.cartsum').html(this.getProductSum());
        //绑定产品总价格
        $('.allPrice').html(this.getProductPrice());
    },
    //绑定产品列表
    bindProductsList: function() {
        var str = ' ';
        for (var i = 0; i < this.products.length; i++) {
            var item = this.products[i];
            var img = item.images[0];
            str += '<div class="cart_box">';
            str += ' <div class="message">';
            str += ' <div class="alert-close"> </div>';
            str += ' <div class="list_img"><img src="' + img.small + '" class="img-responsive" alt="" /></div>';
            str += '<div class="list_desc">';
            str += '  <h4><a href="#">' + item.name + '</a></h4>1 x<span class="actual"> ' + item.price + '</span></div>';
            str += ' <div class="clearfix"></div>';
            str += '</div>';
            str += '</div>';
        }
        $('.shopping_cart').html(str);
    },
    //
    init: function() {
        this.bindBasic();
        this.bindProductsList();
    },
    //计算产品个数
    getProductSum: function() {
        var sum = 0;
        if (this.products.length > 0 && this.products) {
            sum = this.products.length;
        } else {
            sum = 0;
        }
        this.sum = sum;
        return sum;
    },
    //计算产品总价格
    getProductPrice: function() {
        var sum = 0;
        for (var i = 0, len = this.products.length; i < len; i++) {
            var item = this.products[i];
            sum += item.price;
        }
        this.price = sum;
        return sum;
    }
}
```


3. index js

```javascript 
//面向对象编程
//模拟购物车

var hm = new Product(cart);
hm.name = "hhhhhhhhhhhhhhhhhhhhhhh";
hm.description = "233333333333";
hm.price = 168;
hm.GroupPrice = 168888;
hm.sum = 100;
hm.images = [
    { small: 'images/s11.jpg', big: 'images/s11.jpg' },
    { small: 'images/s12.jpg', big: 'images/s12.jpg' },
    { small: 'images/s13.jpg', big: 'images/s13.jpg' }
];
hm.init();
var cart = new Cart();
cart.products.push(hm);
cart.products.push(hm);
cart.products.push(hm);


cart.init();
$('#btnaddcart').click(function() {
    //将当前产品添加到购物车里面
    cart.products.push(hm);
    //重新绑定
    cart.init();
    //回到顶部
    $(window).scrollTop(0);
});

```