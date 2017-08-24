const _ = require("./underscore");
var flatten = function(input, shallow, strict, starIndex) {
  var output = [],
    idx = 0;

  //根据starIndex开确定展开的起始位置
  for (var i = starIndex || 0, length = input.length; i < length; i++) {
    var value = input[i];
    if (_.isArray(value) || _.isArguments(value)) {
      //根据判断shallow,来判断是展开一层还是深度展开
      //如果shallow==>false 则是需要深度展开 则执行递归
      //如果是深度展开,就一直递归,最终会返回一个没有嵌套数组的数组给value;
      if (!shallow) value = flatten(value, shallow, strict);

      // 递归展开到最后一层（没有嵌套的数组了）
      //或者(shallow == true ) => 只展开一层
      //这时的value肯定是一个数组
      var j = 0;
      len = value.length;

      // 这一步貌似没有必要
      // 毕竟 JavaScript 的数组会自动扩充
      // 但是这样写，感觉比较好，对于元素的 push 过程有个比较清晰的认识
      output.length += len;

      // 将 value 数组的元素添加到 output 数组中
      while (j < len) {
        output[idx++] = value[j++];
      }
    } else if (!strict) {
      //(!strict === true ) ==> (strict ===false)
      // 如果是深度展开，即 shallow 参数为 false
      // 那么当最后 value 不是数组，是基本类型时
      // 肯定会走到这个 else-if 判断中
      // 而如果此时 strict 为 true，则不能跳到这个分支内部
      // 所以 shallow === false 如果和 strict === true 搭配
      // 调用 flatten 方法得到的结果永远是空数组 []
      // 就是在上面if(!shallow) value = flatten(value,shallow,strict);中如果非数组元素呢,就会直接push到数组中,最终返回一个结果数组
      output[idx++] = value;
    }
  }
  return output;
};

_.difference = function(arr) {
  var rest = flatten(arguments, true, true, 1);

  return arr.filter(item => !_.contains(rest, item));
};
_.without = function(array) {
  // slice.call(arguments, 1)
  // 将 arguments 转为数组（同时去掉第一个元素）
  // 之后便可以调用 _.difference 方法
  return _.difference(array, slice.call(arguments, 1));
};
var a = [1, 2, 3, 4, 5];
var ans = _.difference(a, [1, 2, 3], [5, 6]);
console.log(ans); // [4]
