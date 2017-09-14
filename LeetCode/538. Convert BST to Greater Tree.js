/**
 * link:https://leetcode.com/problems/convert-bst-to-greater-tree/discuss/
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
var convertBST = function(root) {
  var val=0;
  b(root);
  function b(root){
    if(!root) return;
    b(root.right);
    root.val+=val;
    val=root.val;
    b(root.left);
  }
  return root;
};