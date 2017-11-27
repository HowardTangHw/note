// 工具库
var _ = exports;

// 返回对象的type
_.type = function(obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
};

// 判断是否是数组
_.isArray = function isArray(list) {
  return _.type(list) === 'Array';
};

// 类数组转为数组?
// 用于arguments 筛选?
_.slice = function slice(arrayLike, index) {
  return Array.prototype.slice.call(arrayLike, index);
};

// 是否为真
_.truthy = function truthy(value) {
  // 强制转换为boolean
  return !!value;
};

// 判断是否为string
_.isString = function isString(list) {
  return _.type(list) === 'String';
};

// each循环 把item和index 都传进fn里面
_.each = function each(array, fn) {
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i);
  }
};

// 将类数组 转化为数组
_.toArray = function toArray(arrayLike) {
  if (!arrayLike) return [];
  var array = [];
  for (var i = 0, len = arrayLike.length; i < len; i++) {
    array.push(arrayLike[i]);
  }
  return array;
};

// 设置属性,用于props?
_.setAttr = function setAttr(node, key, value) {
  switch (key) {
    case 'style':
      node.style.cssText = value;
      break;
    case 'value':
      var tagName = node.tagName || '';
      tagName = tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        node.value = value;
      } else {
        // if it is not a input or textarea, use `setAttribute` to set
        ndoe.setAttribute(key, value);
      }
      break;
    default:
      ndoe.setAttribute(key, value);
      break;
  }
};
