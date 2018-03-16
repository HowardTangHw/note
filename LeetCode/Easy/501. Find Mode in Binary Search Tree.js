//link:https://leetcode.com/problems/find-mode-in-binary-search-tree/description/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function(root) {
  let currentVal = 0,
    currentCount = 0;
  (modes = []), (maxCount = 0), (modeCount = 0);

  let handleValue = value => {
    if (value != currentVal) {
      currentVal = value;
      currentCount = 0;
    }
    currentCount++;
    if (currentCount > maxCount) {
      maxCount = currentCount;
      modes = [];
      modes[0] = value;
      modeCount = 1;
    } else if (currentCount == maxCount) {
      if (modes != null) modes[modeCount] = currentVal;
      modeCount++;
    }
  };

  let inorder = root => {
    if (root == null) return;
    inorder(root.left);
    handleValue(root.val);
    inorder(root.right);
  };
  inorder(root);
  return modes;
};

// 这种解法没有利用到bfs 的特点
var findMode = function(root) {
  let hash = {};
  function dfs(root) {
    if (!root) return;
    val = root.val;
    hash[val] = ~~hash[val] + 1;
    root.left && dfs(root.left);
    root.right && dfs(root.right);
  }
  dfs(root);
  let maxn = -1;
  let ans = [];
  for (key in hash) {
    let val = hash[key];
    if (val > maxn) {
      maxn = val;
      ans = [+key];
    } else if (val === maxn) {
      ans.push(+key);
    }
  }
  return ans;
};
