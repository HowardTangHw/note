/**
 * link:https://leetcode.com/problems/invert-binary-tree/description/
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if (root) {
    var tmp = TreeNode();
    tmp = root.left;
    root.left = root.right;
    root.right = tmp;
    invertTree(root.left);
    invertTree(root.right);
  }
  return root;
};

var invertTree = function(root) {
  if (root) {
    [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  }
  return root;
};

var invertTree = function(root) {
  let stack = [root];
  while (stack) {
    let r = stack.pop();
    if (r) {
      [r.left, r.right] = [r.right, r.left];
    }
    stack += [r.left, r.right];
  }
  return root;
};
