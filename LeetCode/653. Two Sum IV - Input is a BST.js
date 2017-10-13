/**
 * https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/
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
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function(root, k) {
  var arr = [];

  function inputArr(root) {
    if (!root) return false;
    var tmp = k - root.val;
    if (arr[tmp]) return true;
    if (!arr[root.val]) arr[root.val] = 1;
    return  inputArr(root.left) ||  inputArr(root.right);
  }
  return inputArr(root);
};
