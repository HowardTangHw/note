//link:https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/description/
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
var findSecondMinimumValue = function(root) {
  let set = new Set();

  function dfs(node) {
    if (node.val) set.add(node.val);
    if (node.left != null) {
      dfs(node.left);
      dfs(node.right);
    }
  }

  dfs(root);
  let res = [...set];
  res.sort((a, b) => a - b);

  return res[1] ? res[1] : -1;
};

/**
 * 如果节点有两个子节点，那么这个节点的值是其两个子节点中较小的值。
 * */
var findSecondMinimumValue = function(root) {
  if (root == null) return -1;
  let res = Number.MAX_SAFE_INTEGER,
    // 根据题意,最小的就是顶层节点
    minVal = root.val;
  function dfs(node) {
    if (node == null) return;
    // 判断当前节点比最小的要大,并且返回值比当前节点大
    // 这个步骤就是寻找第二小的
    if (minVal < node.val && node.val < res) {
      res = node.val;
    }
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return res == Number.MAX_SAFE_INTEGER ? -1 : res;
};
