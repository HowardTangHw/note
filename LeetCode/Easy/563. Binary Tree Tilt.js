//link:https://leetcode.com/problems/binary-tree-tilt/description/
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
var findTilt = root => {
  let tilt = 0;
  let dfs = root => {
    if (!root) return 0;
    let left = dfs(root.left);
    let right = dfs(root.right);
    tilt += Math.abs(left - right);
    return left + right + root.val;
  };
  dfs(root);
  return tilt;
};
