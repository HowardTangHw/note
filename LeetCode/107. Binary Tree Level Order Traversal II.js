//link:https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

//DFS
var levelOrderBottom = function(root) {
  var res = [];
  var count = 0;
  dfs(root, res, count);
  function dfs(root, res, count) {
    if (root == null) return;
    if (!res[count]) res[count] = [];
    res[count].push(root.val);
    count++;
    if (root.left) dfs(root.left, res, count);
    if (root.right) dfs(root.right, res, count);
  }
  return res.reverse();
};
