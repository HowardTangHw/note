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
  // 处理入参
  this.tagName = tagName;
  this.props = props || {};
  this.children = children || [];
  this.key = props ? props.key : void 0;

  // count 用来记录层级? 用于之后的diff?
  var count = 0;

  _.each(this.children, function(child, i) {
    // 如果child属于Element类(每一个Element类都会统计过层级)
    if (child instanceof Element) {
      count += child.count;
    } else {
      // 这一步的意义?
      children[i] = '' + child;
    }
    count++;
  });

  this.count = count;
}

/**
 * Render the hold element tree.
 */

Element.prototype.render = function() {
  var el = document.createElement(this.tagName);
  var props = this.props;
  for (var propName in props) {
    var propValue = props[propName];
    // 处理多种情况,如果分清props是style value 还是普通的自定义属性
    _.setAttr(el, propName, propValue);
  }

  // 遍历子节点,分Element类还是文字节点
  // Element类则执行它的render,否则则创建文字节点
  _.each(this.children, function(child) {
    var childEl = child instanceof Element ? child.render() : document.createTextNode(child);
    el.appendChild(childEl);
  });
  return el;
};

module.exports = Element;
