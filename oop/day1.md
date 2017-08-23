# 面对对象笔记


> 对象具有属性和方法 简单的来说就是什么人做什么事

> 万物皆对象

> 面向对象编程 :OOP Object Oriented Programming

******

## JS使用面向对象编程

### 对象字面量
> JSON : js对象表示法  
> js对象总是属性和方法的集合 
```javascript
var person= {
    name:"张三",
    age:18,
    gender:"女",
    //称之为属性
    //表白
    sayLove:function(name){

    }//称之为对象的方法
}
```
> 使用对象的属性  
> 对象字面量千万不要实例化, 正确的使用对象的属性  (构造函数才要实例化)
> person.name //  person["name"]


> 正确的获取对象的方法  
> person.sayLove("李四");

> 对象字面量  
> new Object();

> 练习
```javascript
var cat={};
cat.color="white";
cat.say=function(){};
cat.say();//调用
```