## day2笔记

> 例子
> 什么是函数
> 第一层:函数的使用方式:定义 如何使用返回值
> 第二层 封装性 
> 第三层 对象(封装性) 设计模式




#### 找个工具(对象)帮我做事
#### 这其实就是面向对象的体现

> 对象就像工具一样,每个工具都可以帮助我们实现某些功能,我们只需要知道工具是如何操作的就可以了,而不用知道工具是如何制造的.


##### 提炼新闻
> 标题 时间 日期 内容 来源

### 定义对象
```javascript
// 属性放在构造函数里面, 方法放在原型里面
	function Product(){
		this.name="Apple iPhone 6s(A1700) 16G 金色 移动联通电信4G手机";
		this.price = "6666";
		this.description="66666666666666666666";
		this.comments="";


	}
	Product.prototype ={
		//购买
		buy:function(){},
		//加入购物车
		addCart:function(){}
	}
```
###实例化
```javascript
	//实例化
	var iphone6s = new Product();
	iphone6s.price="4388";
	iphone6s.name="Apple iPhone 6s(A1700) 16G 金色 移动联通电信4G手机";
	iphone6s.comments="66227";
	iphone6s.description="手机中的战斗机";
```

> 对象就是抽象的东西
> 实例:具体的东西
> 我们只能使用具体的东西 而无法使用看不见摸不着的东西 


> 简单版 
> 第一步 创建对象 
```javascript
 //通过自定义对象 获取对象
    function Product() {
        this.name = "Apple iPhone 6s(A1700) 16G 金色 移动联通电信4G手机";
        this.price = "6666";
        this.description = "66666666666666666666";
        this.comments = "";
    }
    Product.prototype = {
            //初始化
            init: function() {
                this.bindDom();
                this.bindEvents();
            },
            //购买
            buy: function() {},
            //加入购物车
            addCart: function() {},
            //绑定对象
            bindDom: function() {
                var domName = document.getElementById("pname");
                var domPrice = document.getElementById("pprice");
                var domPdes = document.getElementById("pdes");
                domName.innerHTML = this.name;
                domPrice.innerHTML = this.price;
                domPdes.innerHTML = this.description;
            },
            //绑定事件
            bindEvents: function() {
                var btnAddCart = document.getElementById("btn");
                btnAddCart.onclick = function() {
                    alert("添加产品到购物车");
                }
            }
        }
        //实例化
    var iphone6s = new Product();
    iphone6s.price = "4388";
    iphone6s.name = "Apple iPhone 6s(A1700) 16G 金色 移动联通电信4G手机";
    iphone6s.comments = "66227";
    iphone6s.description = "手机中的战斗机";
```
> 使用对象
```javascript
iphone6s.init();
```


### Json

> json是JS对象的一种简写
> json 是前面对象的简写 省略了抽象的过程
> Json 本身就是具体的 可以直接使用 不需要定义抽象,
```javascript
var iphone ={
	name:"iphone7",
	price:"6666"
}
```

> Json一般用于ajax中接收数据 但是不能用原型
> Json对象一般被称为对象的字面量形式
> 原型:用途很广,运用在任何领域(用于框架封装)
> 原型:是一个完整定义对象的过程 先抽象 再具体(实例化) 然后使用



##### Json对象和Json协议有什么区别
> Json协议事实上已经作为一种前端与服务器端的数据交换格式,是一种**国际标准**,他不是语言,是一种规范,按照这种规范写法就能实现数据传递
> JSON协议是标准 是规范!
> Json对象是对象的字面量形式



**************************************************************


## 基本术语总结

> 抽象对象----类
> 分两部分---构造函数,原型(原型对象)
```javascript
function Product(){
	//里面放的是属性 
	//属性定义方式 
	this.属性名称=值
}
Product.prototype={
	//方法
}
```

> 实例化 将一个抽象的对象(类) 具体化  
> 为什么要实例化?
> 因为抽象的对象 是一种概念,比如手机,是一种概念,是抽象的,我们只能使用具体的看得见,摸得着的东西,所以要实例化,通过new,将他定义为某一部具体的手机,
> 如何实例化?  new
```javascript
   //实例化
    var iphone6s = new Product();
    iphone6s.price = "4388";
    iphone6s.name = "Apple iPhone 6s(A1700) 16G 金色 移动联通电信4G手机";
    iphone6s.comments = "66227";
    iphone6s.description = "手机中的战斗机";
```




## AJAX于JSON字符串
> AJAX,后台一般传递的都是JSON的字符串,而不是json对象,
```javascript
'{name:"aaa",age:"12"'
```
> 将json字符串转换为json对象
```javascript
var aToObj=JSON.parse(a);
``

> 将json对象转化为json字符串
```javascript
var aTostr = JSON.stringify(a);
```
> 我们在变成的时候,除了需要从后台获取json数据,有时候还需要提交数据给后台 例如:注册 登录  这个时候就需要将json对象转化为json字符串


### 多个产品列表实例!
```javascript
//使用面向对象形式开发列表页面

function Product() {
    //名称
    this.name = "";
    //原价
    this.SourcePrice = '';
    //现价
    this.price = '';
    //图片
    this.image = '';
    //销量
    this.sum = 0;
    //折扣
    this.discount = 0;
}
Product.prototype = {
        //绑定单个产品
        bindDom: function() {
            var str = "";
            str += "<dl>";
            str += "<dt><a><img src='" + this.image + "' width='384' height='225' /></a></dt>";
            str += "<dd>";
            str += "<span><a><em>" + this.discount + "折/</em>" + this.name + "</a></span>";
            str += "</dd>";
            str += "<dd class='price'>";
            str += "<em>$" + this.price + "</em>";
            str += "<del>$" + this.SourcePrice + "</del>";
            str += "<i>销量：" + this.sum + "</i>";
            str += "</dd>";
            str += "</dl>";

            //一定要记住return  不然就会undefined
            return str;
        },
        bindEvents: function() {},
        //绑定多个产品
        bingDoms: function(products) {
            var str = '';
            for (var i = 0; i < products.length; i++) {
                str += products[i].bindDom();
            }
            $('#container').html(str);
        },
        init: function(products) {
            this.bingDoms(products);
            this.bindEvents();
        }
    }
    //////////模拟后台数据
    //模拟单个
var conditioner = new Product();
conditioner.name = 'Aussie美国袋鼠丰盈蓬松护发素400ml';
conditioner.SourcePrice = '120.00';
conditioner.discount = '3.5';
conditioner.image = 'img/boutque01_r2_c2.jpg';
conditioner.sum = "2000";
conditioner.price = "42.00";


//模拟多个
var treatment = new Product();
treatment.name = 'Aussie美国袋鼠丰盈蓬松护发素400ml';
treatment.SourcePrice = '120.00';
treatment.discount = '3.5';
treatment.image = 'img/boutque01_r2_c2.jpg';
treatment.sum = "2000";
treatment.price = "42.00";





var list = [conditioner, conditioner, conditioner, conditioner, treatment, treatment, treatment, treatment, treatment, treatment, treatment];


//面向对象编程
conditioner.init(list);

```


> json传输数据的方法  要将json字符串转换为json对象

```javascript
//使用面向对象形式开发列表页面

function Product(data) {
    //名称
    this.name = "";
    //原价
    this.SourcePrice = '';
    //现价
    this.price = '';
    //图片
    this.image = '';
    //销量
    this.sum = 0;
    //折扣
    this.discount = 0;
    // 接收后台给我的json数据
    this.data = data;
}
Product.prototype = {
    //绑定单个产品
    bindDom: function() {
        var str = "";
        str += "<dl>";
        str += "<dt><a><img src='" + this.image + "' width='384' height='225' /></a></dt>";
        str += "<dd>";
        str += "<span><a><em>" + this.discount + "折/</em>" + this.name + "</a></span>";
        str += "</dd>";
        str += "<dd class='price'>";
        str += "<em>$" + this.price + "</em>";
        str += "<del>$" + this.SourcePrice + "</del>";
        str += "<i>销量：" + this.sum + "</i>";
        str += "</dd>";
        str += "</dl>";

        //一定要记住return  不然就会undefined
        return str;
    },
    bindEvents: function() {},
    //绑定多个产品
    bingDoms: function() {
        var str = '';
        for (var i = 0; i < this.data.length; i++) {
            str += this.data[i].bindDom();
        }
        $('#container').html(str);
    },
    init: function() {
        this.bingDoms();
        this.bindEvents();
    }
}


///后台给的Json
var json = [{
    name: "Aussie美国袋鼠丰盈蓬松护发素400ml",
    SourcePrice: "120.00",
    discount: "3.5",
    image: "img/boutque01_r2_c2.jpg",
    sum: "2000",
    price: "42.00"
}, {
    name: "Aussie美国袋鼠丰盈蓬松护发素400ml",
    SourcePrice: "120.00",
    discount: "3.5",
    image: "img/boutque01_r2_c2.jpg",
    sum: "2000",
    price: "42.00"
}, {
    name: "Aussie美国袋鼠丰盈蓬松护发素400ml",
    SourcePrice: "120.00",
    discount: "3.5",
    image: "img/boutque01_r2_c2.jpg",
    sum: "2000",
    price: "42.00"
}, {
    name: "Aussie美国袋鼠丰盈蓬松护发素400ml",
    SourcePrice: "120.00",
    discount: "3.5",
    image: "img/boutque01_r2_c2.jpg",
    sum: "2000",
    price: "42.00"
}, {
    name: "Aussie美国袋鼠丰盈蓬松护发素400ml",
    SourcePrice: "120.00",
    discount: "3.5",
    image: "img/boutque01_r2_c2.jpg",
    sum: "2000",
    price: "42.00"
}];


//面向对象编程
//将json字符串转换为json对象
function transform(json) {
    var list = [];
    for (var i = 0; i < json.length; i++) {
        var p = new Product();
        p.name = json[i].name;
        p.SourcePrice = json[i].SourcePrice;
        p.discount = json[i].discount;
        p.image = json[i].image;
        p.sum = json[i].sum;
        p.price = json[i].price;
        list.push(p);
    }
    return list;
}
var p = new Product(transform(json));
p.init();

```