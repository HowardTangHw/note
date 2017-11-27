var _ = require('./util');
/**
 * Virtual-dom Element.
 * @param {String} tagName
 * @param {Object} props - Element's properties,
 *                       - using object to store key-value pair
 * @param {Array<Element|String>} - This element's children elements.
 *                                - Can be Element instance or just a piece plain text.
 */
function Element(tagName, props, children) {
  // 如果this 不是 Element类 就返回一个Element的类
  if (!(this instanceof Element)) {
    // 如果children不是一个数字,并且children 并非为空,那么将它转回数组
    if (!_.isArray(children) && children != null) {
      children = _.slice(arguments, 2).filter(_.truthy);
    }
    return new Element(tagName, props, children);
  }

  //如果属性props不是一个对象,而是一个数组,就代表当前的props为children,
  //这里需不需要再判断下children是否为空?
  if (_.isArray(props)) {
    children = props;
    props = {};
  }

  this.tagName = tagName;
  this.props = props || {};
  this.children = children || [];
}

Element.prototype.render = function() {
  var el = document.createElement(this.tagName);
  var props = this.props;
  for (var propName in props) {
    var propValue = props[propName];
    el.setAttribute(propName, propValue);
  }
  var children = this.children || [];

  children.forEach(function(child) {
    //如果是虚拟DOM 则递归执行,如果只是字符串 只构建文本节点
    var childeEl = child instanceof Element ? child.render() : document.createTextNode(child);
    el.appendChild(childeEl);
  });
  return el;
};

module.exports = function(tagName, props, children) {
  return new Element(tagName, props, children);
};
