// 源码地址:https://github.com/livoras/list-diff/blob/master/lib/diff.js
/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */
function diff(oldList, newList, key) {
  // 获取旧节点的位置
  var oldMap = makeKeyIndexAndFree(oldList, key);
  // 获取新节点的位置,和新增的DOM
  var newMap = makeKeyIndexAndFree(newList, key);

  // 新增的DOM,并且在旧的上面也没有这个KEY
  var newFree = newMap.free;

  var oldKeyIndex = oldMap.keyIndex;
  var newKeyIndex = newMap.keyIndex;

  // 移动的步骤
  var moves = [];

  // 用于模拟操作的列表
  var children = [];
  var i = 0;
  var item;
  var itemKey;
  var freeIndex = 0;

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

  return {
    moves: moves,
    children: children
  };
}

/**
 * Convert list to key-item keyIndex object.
 * @param {Array} list
 * @param {String|Function} key
 */
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

function getItemKey(item, key) {
  if (!item || !key) return void 0;
  // 这里的key 不是String 就是Function 了
  // string则返回值,如果是函数则处理一下
  return typeof key === 'string' ? item[key] : key(item);
}
