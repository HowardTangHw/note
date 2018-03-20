// link:https://leetcode.com/problems/diameter-of-binary-tree/description/
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
// 二叉树的直径,就是最远的两个点之间相差的距离
// 可以理解为 两个最深的节点直接的距离(也有其他特殊情况...)
var diameterOfBinaryTree = function(root) {
  let ans = 1;
  dfs(root);
  return ans - 1;
  function dfs(root) {
    if (!root) return 0;
    // 递归左节点
    let L = dfs(root.left);
    // 递归右节点
    let R = dfs(root.right);
    // 每次都判断下当前节点下最深节点之间的距离
    ans = Math.max(ans, L + R + 1);
    // 返回左右树最深的深度.
    return Math.max(L, R) + 1;
  }
};
