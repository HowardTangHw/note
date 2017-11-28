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
