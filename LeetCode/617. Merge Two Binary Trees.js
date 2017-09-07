/**
 * link:https://leetcode.com/problems/merge-two-binary-trees/description/
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
  if (t1 && t2) {
    const treeNode = new TreeNode(t1.val + t2.val);
    // 返回的只可能是一边的treeNode 或者两者相加的treeNode 
    treeNode.left = mergeTrees(t1.left, t2.left);
    treeNode.right = mergeTrees(t1.right, t2.right);
    return treeNode;
  }
  return t1 || t2;
};
