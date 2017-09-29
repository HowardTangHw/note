/**
 * link:https://leetcode.com/problems/maximum-depth-of-binary-tree/description/
 */

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
var maxDepth = function(root) {
  if (!root) return 0;
  var res = [];
  if (root.left) depth(root.left, 1);
  if (root.right) depth(root.right, 1);
  if (!root.left && !root.right) return 1;
  function depth(root, d) {
    d++;
    if (root.left) depth(root.left, d);
    if (root.right) depth(root.right, d);
    if (!root.left && !root.right) {
     return res.push(d);
    }
  }
  return Math.max(...res);
};


