/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  return dfs(root, root);
};

var dfs = function(left, right) {
  if (left == null && right == null) return true;
  if (left == null || right == null) return false;

  return left.val == right.val && dfs(left.left, right.right) && dfs(left.right, right.left);
};
