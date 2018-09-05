// link:https://leetcode.com/problems/increasing-order-search-tree/description/
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
var increasingBST = function(root) {
  let ans = new TreeNode(0),
    vals = [];
  dfs(root, vals);
  vals.forEach(v => {
    ans.right = ans = new TreeNode(v);
  });
  return ans.right;
};

function dfs(node, vals) {
  if (node == null) return;
  dfs(node.left);
  vals.push(node.val);
  dfs(node.right);
}

var increasingBST = function(root) {
  let list = [];
  dfs(root, list);
  if (list.length == 0) return root;

  let previous = null;
  for (let i = 0; i < list.length; i++) {
    let node = list[i];
    node.left = node.right = null;
    if (previous != null) {
      // 当前节点的right 为下一个node
      previous.right = node;
    }
    // 将当前节点替换为下一个节点,有点链式的感觉
    previous = node;
  }
  return list[0];
};

function dfs(root, list) {
  if (root == null) return;
  if (root.left) dfs(root.left, list);
  list.push(root);
  if (root.right) dfs(root.right, list);
}
