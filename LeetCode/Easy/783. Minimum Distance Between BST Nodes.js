// link:https://leetcode.com/problems/minimum-distance-between-bst-nodes/description/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 方法一:先记录下所有点,再用sort,然后再相减..
var minDiffInBST = function(root) {
  let values = [];
  function dfs(root) {
    if (!root.val) return;
    root.left && dfs(root.left);
    root.right && dfs(root.right);
  }

  values.sort((a, b) => a - b);
  let ans = Number.MAX_SAFE_INTEGER;
  for (var i = 0; i < values.length - 1; i++) {
    ans = Math.min(ans, values[i + 1] - values[i]);
  }
  return ans;
};

// 方法二:利用BST的特性
// 当前节点的值,肯定大于左树所有子节点的值,小于右边节点的所有子节点的值,
// 就是说 跨一级节点值之间的相减,肯定是比父子节点之间相减要大的
var minDiffInBST = function(root) {
  let ans = Number.MAX_SAFE_INTEGER,
    prev = null;
  dfs(root);
  return ans;

  function dfs(root) {
    if (!root) return;
    root.left && dfs(root.left);
    if (prev !== null) {
      ans = Math.min(ans, root.val - prev);
    }
    prev = root.val;
    root.right && dfs(root.right);
  }
};
