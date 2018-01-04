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
/**
 * 一开始做的时候犯了个错误,认为如果没值的话,赋予0(就是简单的相加)
 * 然后用t1不断相加,然后返回t1就行了,可是出错了,不断的undefined
 * 因为 树的结构是有val和left和right,必须是3者都存在的,而我当时只是简单的val相加,没有顾及到left 和right
 * 所以要返回一个treeNode
 */
