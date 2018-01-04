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


var findTarget = function(root, k) {
  const values = [];
  function inorder(node) {
      if (!node) {
          return;
      }
      // 先遍历左边(小的)再遍历右边(大的)
      inorder(node.left);
      values.push(node.val);
      inorder(node.right);
  }
  inorder(root);
  //因为是bst,所以肯定是小的在前 大的在后
  let start = 0, end = values.length - 1;
  while (start < end) {
      const total = values[start] + values[end];
      if (total > k) {
          end--;
      } else if (total < k) {
          start++;
      } else {
          return true;
      }
  }
  return false;
};
