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
/**
 * 因为BST的特点,左树最深的节点是最小,中间第二,右侧第三,right>mid>left
 * 正因为如此,并且先递归左树,中间,右树 ,所以都是中间-左树,右树-中间
 * root.val-pre值肯定>0
 */

var getMinimumDifference = function(root) {
  let diff = Infinity;
  let pre = undefined;
  function dfs(root) {
    if (root == null) return;
    dfs(root.left);
    if (pre != undefined && diff > root.val - pre) {
      diff = root.val - pre;
    }
    pre = root.val;
    dfs(root.right);
  }
  dfs(root);
  return diff;
};

// 方法2
var getMinimumDifference = function(root) {
  let diff = Infinity;
  let res = [];

  var dfs = function(root) {
    if (root == null) return;
    res.push(root.val);
    if (root.left) dfs(root.left);
    if (root.right) dfs(root.right);
  };
  dfs(root);

  res.sort();
  console.log(res);
  for (var i in res) {
    diff = Math.min(diff, res[i] - res[i - 1]);
    console.log(diff);
  }
  return diff;
};
