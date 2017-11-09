/**
 * link:https://leetcode.com/problems/path-sum-iii/description/
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
 * @param {number} sum
 * @return {number}
 */
/**
 * 要每个点都进入一次pathSum后再进入dfs
 * 而不是直接把左树右树放进dfs中,因为第一个点会改变后面的sum
 * 为了保持sum的一致性,在pathSum中return的必须是dfs当前的节点,并把子节点递归pathSum
 */

var pathSum = function(root, sum) {
  if (root === null) return 0;
  return dfs(root, sum) + dfs(root.left, sum) + dfs(root.right, sum);
};
var dfs = (root, sum) => {
  if (root === null) return 0;
  return (
    (root.val === sum ? 1 : 0) + dfs(root.left, sum - root.val) + dfs(root.right, sum - root.val)
  );
};
