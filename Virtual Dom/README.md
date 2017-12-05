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
var sortType = 1 // 升序还是逆序k
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

假如现在有英文字母唯一标识每一个子节点:

```markdown
a b c d e f g h i 
```

现在对节点进行插入,删除,移动等操作,新增`j`节点,删除`e`节点,移动`h`节点:

新节点顺序:

```markdown
a b c h d f g i j
```

现在知道了新旧的顺序,求最小的插入,删除操作的步骤,这个问题抽象出来其实就是字符串最小编辑距离问题（[Edition Distance](https://en.wikipedia.org/wiki/Edit_distance)）,最常见的解决算法是 [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance)，通过动态规划求解，时间复杂度为 O(M * N)。但是我们不需要真的达到最小的操作,只需要优化一些比较常见的移动情况,牺牲一定DOM操作,让算法时间复杂度达到线性的(O(max(M,N))

我们能够获取某个父节点的子节点的移动操作,就可以记录下来:

```js
patches[0]=[{
  type:REORDER,
  moves: [{remove or insert}, {remove or insert}]
}]
```

:warning:需要注意的是,因为`tagName`是可重复的,不能用这个来进行比较,所以需要给子节点加上唯一标识`key`,列表对比的时候,使用`key`进行对比,这样才能复用老的DOM树上的节点.

这样，我们就可以通过深度优先遍历两棵树，每层的节点进行对比，记录下每个节点的差异了。



##### 3.1 list-diff2.js

```js
// 源码地址:https://github.com/livoras/list-diff/blob/master/lib/diff.js
```

首先一进来,用makeKeyIndexAndFree,将新旧list遍历一次,返回一个具有所有节点唯一标识`key`,和新增节点元素的对象.将列表转换为键项keyIndex对象。

```js
function makeKeyIndexAndFree(list, key) {
  var keyIndex = {};
  var free = [];
  for (var i = 0, len = list.length; i < len; i++) {
    var item = list[i];
    var itemKey = getItemKey(item, key);
    //存储每个节点的位置? 用于比较是否移动?
    if (itemKey) {
      keyIndex[itemKey] = i;
    } else {
      // 这里的是新增的DOM? 一般来说,oldList里面是不会有free的吧..而且KEY是新的
      free.push(item);
    }
  }
  return {
    keyIndex: keyIndex,
    free: free
  };
}
```

定义一个数组`moves`用于存储增删查改的对象,增删改主要用到以下几个函数

```js
// 删除的步骤,添加到moves中,删除的type为0,删除的索引是index
  function remove(index) {
    var move = { index: index, type: 0 };
    moves.push(move);
  }

  //插入
  function insert(index, item) {
    var move = { index: index, item: item, type: 1 };
    moves.push(move);
  }

  // 从模拟列表中删除
  function removeSimulate(index) {
    simulateList.splice(index, 1);
  }
```

第一次遍历检查旧列表中的元素在新列表中是否被删除

```js
//first pass to check item in old list: if it's removed or not
//第一次遍历检查旧列表中的项目是否被删除
while (i < oldList.length) {
  item = oldList[i];
  itemKey = getItemKey(item, key);
  // 如果这个值 在旧的当中存在
  if (itemKey) {
    // 判断是否在新的列表当中
    if (!newKeyIndex.hasOwnProperty(item)) {
      // 如果不在,则这个位置的值被删了
      children.push(null);
    } else {
      var newItemIndex = newKeyIndex[itemKey];
      //存储位于newList当前的位置,之后辨别的时候就会相等了
      children.push(newList[newItemIndex]);
    }
  } else {
    // 疑问:为什么在旧的当中也会存在,itemKey不存在的这种情况?是因为不符合规范?
    // 如果这个位置的DOM不在了,那么从新添加的NEWLIST里面找,看看这个位置有没有被填补上
    var freeItem = newFree[freeIndex++];
    children.push(freeItem || null);
  }
  i++;
}
```

利用模拟列表,先删掉已经不再新列表中的元素,步骤存入moves中

```js
// 模仿列表  浅拷贝,新组数
var simulateList = children.slice(0);

//remove items no longer exist
//删除已经不存在的items
i = 0;
while (i < simulateList.length) {
  if (simulateList[i] === null) {
    remove(i);
    removeSimulate(i);
  } else {
    i++;
  }
}
```

然后使用模拟列表与新列表对比,

```js
// i is cursor pointing to a item in new list
// j is cursor pointing to a item in simulateList
// i为newList的光标,j为模拟列表的光标
var j = (i = 0);
while (i < newList.length) {
  // 处理新列表 与 模拟列表
  item = newList[i];
  itemKey = getItemKey(item, key);

  var simulateItem = simulateList[j];
  var simulateItemKey = getItemKey(simulateItem, key);

  if (simulateItem) {
    if (itemKey === simulateItemKey) {
      // 新列表当前的内容和模拟列表的内容一致,则跳过这次
      j++;
    } else {
      //不一样,则是新的(旧的里面没有),要插入操作,
      if (!oldKeyIndex.hasOwnProperty(itemKey)) {
        insert(i, item);
      } else {
        // 模拟列表当前的值,和新的不一样,并且旧的当中有
        // 如果删除当前的值,会使它相等的话,就删除它
        var nextItemKey = getItemKey(simulateList[j + 1], key);
        if (nextItemKey === itemKey) {
          remove(i);
          removeSimulate(j);
          j++; //在删除后,需要将j移位,否则会光标指向不准,需要光标指向下一个(当前个已经被删除了)
        } else {
          // 如果删除后并不会使其正确的话,就在这个地方 插入newList的值(算是强行纠错,是其与新列表相等)
          insert(i, item);
        }
      }
    }
  } else {
    // 在模拟列表中已经没了当前simulateList[j](就是在后面补上了,即newList的长度大于simulateList了?)
    // 则插入
    insert(i, item);
  }
}

  // 如果j还没到最后的值,删除后面的j的元素(即simulateList的长度大于newList了)
var k = 0;
while (j++ < simulateList.length) {
  remove(k + i);
  k++;
}

```

最后将操作步骤moves返回

1. 先检查旧的哪些被删了,删了得就去掉
2. 用已删除去掉元素的模拟列表,与新的作对比,看看哪些是新增的
3. 与当前newList不一样的,先是看看换位,换位还不行则强行插入



#### 4.diff算法

使用到的工具函数

对比两个节点的属性是否有修改

```js
// 遍历属性
function diffProps(oldNode, newNode) {
  var count = 0;
  var oldProps = oldNode.props;
  var newProps = newNode.props;
  var key, value;
  var propsPatches = {};
  // 找到不同的属性(修改掉的)
  for (key in oldProps) {
    value = oldProps[key];
    if (newProps[key] !== value) {
      count++;
      propsPatches[key] = newProps[key];
    }
  }

  // 找到新加的属性
  for (key in newProps) {
    value = newProps[key];
    if (!oldProps.hasOwnProperty(key)) {
      count++;
      propsPatches[key] = newProps[key];
    }
  }

  // 如果所有属性都没改变
  // If properties all are identical
  if (count === 0) {
    return null;
  }

  // 有改变的话返回修改的列表
  return propsPatches;
}
```

对比两个节点的子节点 看看有没有发生变化(使用了list-diff2,会返回子节点的修改moves,并且会有一个移好位置,删掉newList中删除的节点的children),把变化保存好,并且给节点都记录上了标识

```js
//遍历子节点
// 用于计算标识,计算标识之后再去对比差异
function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
  var diffs = listDiff(oldChildren, newChildren, 'key');
  newChildren = diffs.children;

  // 如果有修改 把修改传回去
  if (diffs.moves.length) {
    var reorderPatch = { type: patch.REORDER, moves: diffs.moves };
    currentPatch.push(reorderPatch);
  }

  // 这里只是计算标识
  var leftNode = null;
  var currentNodeIndex = index;
  _.each(oldChildren, function(child, i) {
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

节点是否有Ignore属性

```js
function isIgnoreChildren (node) {
  return (node.props && node.props.hasOwnProperty('ignore'))
}
```



主函数

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
```



对比差异函数

```js
// 首先对两棵树进行深度优先遍历
// 这个是用于对比差异的
function dfsWalk(oldNode, newNode, index, patches) {
  //对比不同 然后记录下来
  var currentPathch = [];
  //节点被删除了
  if (newNode === null) {
    //执行重新排序时，Real DOM节点将被删除，所以在这里不需要做任何事情
  } else if (_.isString(oldNode) && _.isString(newNode)) {
    //文本变化
    if (newNode !== oldNode) {
      currentPathch.push({ type: patch.TEXT, content: newNode });
    }
    // ↓ 节点是相同的,只是属性或者children发生了改变
  } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    // Diff props 辨别属性
    var propsPatches = diffProps(oldNode, newNode);
    if (propsPatches) {
      currentPathch.push({ type: patch.PROPS, props: propsPatches });
    }

    // 遍历子节点 如果节点有`ignore`属性,就忽视掉它
    if (!isIgnoreChildren(newNode)) {
      diffChildren(oldNode.children, newNode.children, index, patches, currentPathch);
    }
  } else {
    //节点不一样，用新节点替换旧节点
    currentPatch.push({ type: patch.REPLACE, node: newNode });
  }

  // 如果当前节点有修改,则传到patches里
  if (currentPathch.length) {
    //最关键这一步,因为子节点进来的index都是不一样的
    patches[index] = currentPathch;
  }
}
```



这样，我们就可以通过深度优先遍历两棵树，每层的节点进行对比，记录下每个节点的差异了。



### 步骤三:把差异应用到真正的DOM树上

因为步骤一所构建的JAVASCRIPT对象树和`render`出来真正的DOM树的信息,结构是一样的,所以我们可以对那颗DOM树也进行深度优先遍历,遍历的时候从步骤二生成的`patches`对象中找出当前的节点差异,然后对其进行`moves`里面的差异操作

```js
function path(node, patches) {
  var walker = { index: 0 }; //记录当前是拿一个节点?树的哪一层?
  dfsWalk(node, walker, patches);
}
function dfsWalk(node, walker, patches) {
  var currentPatches = patches[walker.index]; //从patches拿出当前节点的差异

  var len = node.childNodes ? node.childNodes.length : 0;
  for (var i = 0; i < len; i++) {
    //深度遍历子节点
    var child = node.childNodes[i];
    walker.index++;
    dfsWalk(child, walker, patches);
  }

  // 如果差异存在,就操作
  if (currentPatches) {
    applyPatches(node, currentPatches);
  }
}
```

applyPatches，根据不同类型的差异对当前节点进行 DOM 操作：

```js
function applyPatches(node, currentPatches) {
  _.each(currentPatches, function(currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        var newNode =
          typeof currentPatch.node === 'string'
            ? document.createTextNode(currentPatch.node)
            : currentPatch.node.render();
        node.parentNode.replaceChild(newNode, node);
        break;
      case REORDER:
        reorderChildren(node, currentPatch.moves);
        break;
      case PROPS:
        setProps(node, currentPatch.props);
        break;
      case TEXT:
        if (node.textContent) {
          node.textContent = currentPatch.content;
        } else {
          //ie
          node.nodeValue = currentPatch.content;
        }
        break;
      default:
        throw new Error('Unknown patch type ' + currentPatch.type);
    }
  });
}
```

工具函数

```js
// 设置节点属性
function setProps(node, props) {
  for (var key in props) {
    if (props[key] === void 0) {
      node.removeAttribute(key);
    } else {
      var value = props[key];
      _.setAttr(node, key, value);
    }
  }
}

// 移动 重新排序
function reorderChildren(node, moves) {
  // 将类数组转换为数组
  var staticNodeList = _.toArray(node.childNodes);
  var maps = {};

  // 这个是记录reorder的节点
  _.each(staticNodeList, function(node) {
    // 如果子节点的type  是 REORDER,
    //就用hash记录下这个节点,
    // key是 节点的唯一标识
    if (node.nodeType === 1) {
      var key = node.getAttribuge('key');
      if (key) {
        maps[key] = node;
      }
    }
  });

  _.each(moves, function(move) {
    // 这里的index,是节点唯一标识?
    var index = move.index;
    if (move.type == 0) {
      // remove item
      if (staticNodeList[index] === node.childNodes[index]) {
        //需要判断删除的节点的key和现在的KEY是否一样,(就是判断删的是不是正确的对象)
        //因为有可能出现插入操作,导致删除的不是正确的节点
        node.removeChild(node.childNodes[index]);
      }
      // 从列表内删除
      staticNodeList.splice(index, 1);
    } else if (move.type === 1) {
      //重新排序操作(就是先删后加)
      var insertNode = maps[move.item.key]
        ? maps[move.iten.key].cloneNode(true) //复用旧的节点
        : typeof move.item === 'object' //如果是一个对象?(其实是ELEMENT类?)
          ? move.item.render()
          : document.createTextNode(move.item);
      // 将这个插入到列表中
      staticNodeList.splice(index, 0, insertNode);
      // 在节点中插入
      node.insertBefore(insertNode, node.childNodes[index] || null);
    }
  });
}
```

