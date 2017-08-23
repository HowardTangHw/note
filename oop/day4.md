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




### replace进阶使用

1. $ 特殊符号

```javascript
   var mystring = 'abc & cba';
        mystring = mystring.replace(/(\w+)\s*&\s*(\w+)/g, "$2 & $1");
        console.log(mystring);
```

2. 将字符串中每个英文单词的首字母变为大写


```javascript
        var mystring = 'aaa bbb ccc';
        mystring = mystring.replace(/\b\w+\b/g, function(word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1);
        });
        console.log(mystring);
```