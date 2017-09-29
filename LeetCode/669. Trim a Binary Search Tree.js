/**
 * https://leetcode.com/problems/trim-a-binary-search-tree/discuss/
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
 * @param {number} L
 * @param {number} R
 * @return {TreeNode}
 * 小于L,返回右树,
 * 大于R,返回左树.
 */
var trimBST = function(root, L, R) {
  if (!root) return null;
  // 如果当前节点的值小于L,那么整个节点删减,用右树来代替,(左树删除了)
  if (root.val < L) return trimBST(root.right, L, R);
  // 如果大于R,返回整个左树 左树节点代替当前的节点(修剪右树)
  if (root.val > R) return trimBST(root.left, L, R);

  // 如果符合,就进入下一层
  root.left = trimBST(root.left, L, R);
  root.right = trimBST(root.right, L, R);
  return root;
};
