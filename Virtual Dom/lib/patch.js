var _ = require('./util');

var REPLACE = 0;
var REORDER = 1;
var PROPS = 2;
var TEXT = 3;

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

//applyPatches，根据不同类型的差异对当前节点进行 DOM 操作：
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
patch.REPLACE = REPLACE;
patch.REORDER = REORDER;
patch.PROPS = PROPS;
patch.TEXT = TEXT;

module.exports = patch;
