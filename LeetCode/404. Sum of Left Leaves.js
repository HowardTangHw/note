/**
*    3
*   / \
*  9  20
*    /  \
*   15   7
* There are two left leaves in the binary tree, with values 9 and 15 respectively. Return 24.
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
var sumOfLeftLeaves = function(root) {
  // 定义变量用于相加
  var ans=0;
  // 节点存在,并且左节点也存在 ,则存入左节点做递归
  if (root && root.left) fn(root.left, 1);
  // 节点存在,并且右节点也存在 ,则存入右节点做递归
  if (root && root.right) fn(root.right, 0);
  function fn(node, flag) {
    // 判断,如果这个是一个左节点,且没有子节点了,则与变量相加
    if (flag && node && !node.left && !node.right) ans += node.val;
    // 如果该节点还有子节点,继续递归
    if (node && node.left) fn(node.left, 1);
    if (node && node.right) fn(node.right, 0);
  }
  return ans;
};
