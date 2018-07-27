//link:https://leetcode.com/problems/leaf-similar-trees/description/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
  let line1 = [],
    line2 = [];
  dfs(root1, line1);
  dfs(root2, line2);
  return line1.toString() == line2.toString();
};

function dfs(node, line) {
  if (!node.left && !node.right) {
    line.push(node.val);
  }
  if (node.left) {
    dfs(node.left, line);
  }
  if (node.right) {
    dfs(node.right, line);
  }
}

var leafSimilar = function(root1, root2) {
  return dfs(root1) == dfs(root2);
};

function dfs(node) {
  if (node == null) return '';
  if (!node.left && !node.right) return node.val + '-';
  return dfs(node.left) + dfs(node.right);
}
