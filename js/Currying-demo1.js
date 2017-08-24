function add() {
    //1-第一次,将元素提取为数组存入arg中
    var arg = Array.prototype.slice.apply(arguments);
    //2-创建一个函数,利用闭包(内部引用外部参数)将arguments不断的更新,储存到arg当中
    var adder = function () {
        // 储存arg
        var _adder = function () {
            // 将arg更新
            Array.prototype.push.apply(arg, Array.prototype.slice.apply(arguments))
            // 返回_adder函数(如果后面还有()的话,就会继续调用这个方法,为arg继续加参数)----除了第一次外,其他都通过这个返回
            return _adder;
        }
        // 最后一次返回_adder后,没有(),就不会执行了,这时候本来应该要返回的是函数体,但是擅改了toString的方法,(利用其自动执行的特点),将累加的结果返回
        _adder.toString = function () {
            return arg.reduce((a, b) => {
                return a + b;
            });
        }
        // 返回_adder函数(如果后面还有()的话,就会继续调用这个方法,为arg继续加参数)----这个应该是第一次调用的时候返回
        return _adder;
    }
    //3-每一次,都会将adder函数返回,并且利用apply,将新的实参传入,然后利用闭包,更新arg
    return adder.apply(null, Array.prototype.slice.apply(arguments));
}

// 输出结果，可自由组合的参数
console.log(add(1)(2));