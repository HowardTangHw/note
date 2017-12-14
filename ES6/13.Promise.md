## 13.Promise 对象

```javascript
var p = new Promeise(function(resolve,reject){
  //...some code
  if(/*操作成功*/){
    resolve(value);
  } else {
    reject(error);
  }
});
```

> then 一般用来处理resolve
> 而catch一般处理reject **因为catch可以将在此之前的错误打印出来,而then第二个参数虽然也可以处理reject,但是一般只能用于处理当前的错误.**

> then和catch返回的是`Promeise的实例` 所以可以链式编程