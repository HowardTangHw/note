# 深度剖析：如何实现一个 Virtual DOM 算法 #13

**作者**：戴嘉华

**转载请注明出处并保留原文链接（ [#13](https://github.com/livoras/blog/issues/13) ）和作者信息。**

[完整代码](https://github.com/livoras/simple-virtual-dom)

---

## 对于应用状态管理的思考

在刀耕火种的年代,我们如果需要对一些表单引用在试图上进行数据的操作,例如:排序,降序,增删查改,我们只能用JQ,进行简单的操作:

![https://camo.githubusercontent.com/ac106f4ec3a61bb86f6e94d5f6dda8da668e5415/687474703a2f2f6c69766f7261732e6769746875622e696f2f626c6f672f7669727475616c2d646f6d2f736f72742d7461626c652e706e67](https://camo.githubusercontent.com/ac106f4ec3a61bb86f6e94d5f6dda8da668e5415/687474703a2f2f6c69766f7261732e6769746875622e696f2f626c6f672f7669727475616c2d646f6d2f736f72742d7461626c652e706e67)

```js
var sortKey = "new" // 排序的字段，新增（new）、取消（cancel）、净关注（gain）、累积（cumulate）人数
var sortType = 1 // 升序还是逆序
var data = [{...}, {...}, {..}, ..] // 表格数据
```

用字段记录着数据,在表单中添加点击按钮事件.当点击时,进行操作:进行排序,排序后使用jq或者JS来操作DOM,最后更新页面的排序状态和表格内容



但是这样做后,随着代码量也来越多,维护的字段,监听的事件,事件的回调,更新页面的dom也会越来越多,这样应用程序就会变得非常困难.



既然**状态的改变要操作相应的dom元素**,那么我们不如做一个东西让视图和状态进行绑定,状态改变时视图自动改变,这样就不用手动的去更新页面,这就是后来人们想出的MVVM模式,只要在模板中声明视图组件是和什么状态绑定的,双向绑定引擎就会在状态更新的时候自动更新视图



MVVM可以很好降低需要维护的状态->视图的复杂程度(大大减少代码中视图更新逻辑).但是这不是唯一的办法,还有一个非常直接的方法,可以大大降低视图更新的操作:一旦状态发生了变化,就是用模板引擎重新渲染**整个视图**,然后用新的视图更换掉旧的视图,就像上面的表格,当用户点击的时候,在JS里面更新状态,**不再操作DOM**,而是直接把整个表格用模板引擎重新渲染一遍,然后设置一下`innerHTML`.



但是这样,会非常的慢,因为我们一点点的小操作,小小的状态变更,都要重新构造整棵DOM,这样做性价比太低了;并且这这样做,会导致`input`和`textarea`会失去原有的交点.结论:这种方法对于局部的小视图更新是并没有问题的(Backbone就是这样做的),但是对于大型的视图,如果全局应用状态变更的时候,需要更新页面较多的局部视图时,这样做并不可取.

**但是这里要明白和记住这种做法**，**其实 Virtual DOM 就是这么做的，只是加了一些特别的步骤来避免了整棵 DOM 树变更**。(对比虚拟dom和真实dom的差异)

这些方法都在解决同一个问题:**维护状态,更新视图。**在一般的应用当中，如果能够很好方案来应对这个问题，那么就几乎降低了大部分的复杂性



##  Virtual Dom算法

DOM是很慢的。如果我们把一个简单的`div`元素的属性都打印出来,会感觉很吓人...

```js
var div = document.createElement('DIV')
var str = '';
for(var key in div){
  str = str + key + '';
}
console.log(str);
```

这仅仅是第一层,真正的DOM元素非常庞大,这是因为标准就这样设计的,并且操作它们的时候要非常的小心翼翼,如果导致页面重排的话,这可是杀死性能的罪魁祸首.

相对于DOM对象,原生的JavaScript对象处理起来更快,而且简单,DOM树上的结构,属性信息,我们都可以用JAVASCRIPT对象表示出来:

```js
var element = {
  tagName: 'ul', //节点的名字
  props: {
    //DOM的属性,用用一个对象存储键值对
    id: 'list'
  },
  children: [
    //子节点
    { tagName: 'li', props: { class: 'item' }, children: ['Item 1'] },
    { tagName: 'li', props: { class: 'item' }, children: ['Item 2'] },
    { tagName: 'li', props: { class: 'item' }, children: ['Item 3'] },
    { tagName: 'li', props: { class: 'item' }, children: ['Item 4'] }
  ]
};
```

上面写法对应输出的HTML是:

```html
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
  <li class='item'>Item 4</li>
</ul>
```

我们可以用JAVASCRIPT对象来表示DOM树的信息,那么我们也可以根据这个用Js对象表示树的结构来构建一棵真正的DOM树

那么我们状态变更-->重新渲染页面的方式就可以改变一下了:用JavaScript对象表示DOM信息和结构,当状态变更的时候,重新渲染这个JavaScript 的对象结构,再用新渲染的树与旧的树进行对比,记录两棵树的差异,记录下来的不同点,就是我们需要对页面真正的DOM操作,然后把它们应用在真正的DOM树上,页面就变更了,这样就可以做到:视图结构确实是整个重新渲染了,但是最后操作DOM的时候却只变更有不同的地方.



这就是所谓的Virtual Dom算法,包括几个步骤:

1. 用JavaScript对象结构来表示DOM树的结构,然后用这个树构建一个真正的DOM树,插到文档当中.
2. 当状态变更的时候,重新构造一棵新的对象树.然后用新的树和旧的树进行比较,记录两棵树差异
3. 把锁已记录的差异应用到构建的真正的DOM树上,视图就更新了



Virtual Dom 本质上 就是在JS和DOM之间做了一个缓存,就好像CPU 内存 硬盘之间的关系,CPU太快,硬盘太慢了,这时候我们就需要内存作为缓存,利用JS(CPU)操作Virtual Dom(内存),最后再把变更写入到硬盘中(DOM)

> ps:其实还是因为DOM的标准过于庞大,一点点改动都会很慢,所以才曲线救国,换个SSD会不会好点?



## 算法实现

### 步骤一: 用JS对象模拟DOM树

用JS来表示一个DOM节点是比较简单的事情,只需要记录节点类型,属性还有子节点:

element.js

```js
function Element(tagName, props, children) {
  this.tagName = tagName;
  this.props = props;
  this.children = children;
}

module.exports = function(tagName, props, children) {
  return new Element(tagName, props, children);
};
```

例如上面的 DOM 结构就可以简单的表示：

```js
var el = require('./element')

var ul = el('ul', {id: 'list'}, [
  el('li', {class: 'item'}, ['Item 1']),
  el('li', {class: 'item'}, ['Item 2']),
  el('li', {class: 'item'}, ['Item 3'])
])
```

这只是一个JavaScript对象表示的DOM结构,页面上并没有这个结构,那么我们就需要把这个结构渲染在页面上

```js
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
```

`render`方法会根据`tagName`构建一个真正的DOM节点,然后设置这个节点的属性,最后递归自身的子节点,

```js
var ulRoot = ul.render()
document.body.appendChild(ulRoot)
```

上面的`ulRoot`是真正的DOM节点，把它塞入文档中，这样`body`里面就有了真正的`<ul>`的DOM结构：

```html
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>
```



### 步骤二 对比两棵虚拟DOM树的差异

比较两棵DOM树的差异是Virtual Dom算法最核心的部分,也是所谓的Virtual Dom的diff算法.两个树的完全的diff算法是一个时间复杂度为O(n^3)的问题,但是在前端当中,很少会跨级的移动DOM元素,所以Virtual Dom只会对同一个层级的元素进行对比:

![https://camo.githubusercontent.com/a32766a14f6b7fbe631475ed1a186fbd9de7f2c3/687474703a2f2f6c69766f7261732e6769746875622e696f2f626c6f672f7669727475616c2d646f6d2f636f6d706172652d696e2d6c6576656c2e706e67](https://camo.githubusercontent.com/a32766a14f6b7fbe631475ed1a186fbd9de7f2c3/687474703a2f2f6c69766f7261732e6769746875622e696f2f626c6f672f7669727475616c2d646f6d2f636f6d706172652d696e2d6c6576656c2e706e67)

同一层级的元素只对其同一层的元素对比的话,这样算法的复杂度就可以达到O(n)



#### 1. 深度优先遍历(DFS),记录差异

在实际代码中,首先会对新旧两棵树进行一个深度优先的遍历,给每一个节点加上一个唯一的标记:

![https://camo.githubusercontent.com/6cdc35026bcbb6aa0f8fb4aaca3596963192a7f3/687474703a2f2f6c69766f7261732e6769746875622e696f2f626c6f672f7669727475616c2d646f6d2f6466732d77616c6b2e706e67](https://camo.githubusercontent.com/6cdc35026bcbb6aa0f8fb4aaca3596963192a7f3/687474703a2f2f6c69766f7261732e6769746875622e696f2f626c6f672f7669727475616c2d646f6d2f6466732d77616c6b2e706e67)

```js
// diff 函数,对比两棵树
function diff(oldTree, newTree) {
  var index = 0; //当前节点
  var patches = {}; //用于记录节点之间的差异
  // 深度递归
  dfsWalk(oldTree, newTree, index, patches);
  // 将差异返回,之后进入下一步
  return patches;
}

// 首先对两棵树进行深度优先遍历
// 这个是用于对比差异的
function dfsWalk(oldNode, newNode, index, patches) {
  //对比不同 然后记录下来
  patches[index] = [
    //some code
  ];

  // 遍历子节点
  diffChildren(oldNode.children, newNode.children, index, patches);
}

//遍历子节点
// 用于计算标识,计算标识之后再去对比差异
function diffChildren(oldChildren, newChildren, index, patches) {
  var leftNode = null;
  var currentNodeIndex = index;
  oldChildren.forEach(function(child, i) {
    // 记住新的
    var newChild = newChildren[i];
    // 计算节点标识,leftNode就是计数器...累加的
    currentNodeIndex =
      leftNode && leftNode.count ? currentNodeIndex + 1 + leftNode.count + 1 : currentNodeIndex + 1;
    //将当前的标识和当前的点去diff,记录差异
    dfsWalk(child, newChild, currentNodeIndex, patches); //对比差异
    leftNode = child;
  });
}
```

流程: 把当前节点先对比了-->存起差异-->有子节点?-->子节点进入diffChildren获取标识(其实就是要知道这是第几个点)-->再去对比差异-->差异存在patches[子节点标识]里-->有子节点?.....

例如，上面的`div`和新的`div`有差异，当前的标记是0，那么：

```js
patches[0] = [{difference}, {difference}] // 用数组存储新旧节点的不同
```

同理`p`是`patches[1]`，`ul`是`patches[3]`，类推。



#### 2. 差异类型

记录的差异类型,可能会有:

1. 替换掉原来的节点,例如把上面的`div`换成了`section`
2. 移动,删除,新增子节点,例如上面`div`的子节点，把`p`和`ul`顺序互换
3. 修改了节点的属性
4. 对于文本节点,文本内容可能会改变,例如修改上面的文本节点2内容为`Virtual DOM 2`。

所以定义了差异类型:

```js
var REPLACE = 0
var REORDER = 1
var PROPS = 2
var TEXT = 3
```

对于节点替换,只要判断新旧节点的tagName是不是一样的,如果不一样的说明需要替换掉.如`div`换成`section`,就记录下:

```js
patches[0] = [{
  type:REPALCE,
  node:newNode // el('section',props,children)
}]
```

如果给`div`新增了属性id为container,就记录如下:

```js
patches[0] = [
  {
    type: REPALCE,
    node: newNode // el('section',props,children)
  },
  {
    type: PROPS,
    props: {
      id: 'container'
    }
  }
];
```

文本节点:

```js
patches[2] = [{
  type: TEXT,
  content: "Virtual DOM2"
}]
```



#### 3. 列表对比算法

如果我们将`div`的子节点重新排序,例如`p,ul,div`顺序换成了`div,p,ul`,如果按照上面的同层级进行顺序对比的话,他们都会被替换掉,可是这样每一层都要替换,子节点也替换的话,这样DOM开销就非常大,而实际上并不需要替换节点,而是只需要将整个节点移动就可以达到,我们则需要记录下如何进行移动

