var _ = require('./util');
var patch = require('./patch');
var listDiff = require('./list-diff2');

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
    patches[index] = currentPathch;
  }
}

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
function isIgnoreChildren(node) {
  return node.props && node.props.hasOwnProperty('ignore');
}
module.exports = diff;
