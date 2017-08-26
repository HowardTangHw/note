/**
 * 637. Average of Levels in Binary Tree
 * https://leetcode.com/problems/average-of-levels-in-binary-tree/description/
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
 * @return {number[]}
 */
var averageOfLevels = function(root) {
  if (!root) return;

  var sum = [],
    count = [],
    res = [],
    i = 0;

  add(root, i);
  function add(node, i) {
    if (!node) {
      if (sum[i] == undefined) {
        sum[i] = 0;
        count[i] = 0;
      }
      sum[i] += node.val;
      count[i]++;
      i++;
    }
    if (!node.left) add(node.left, i);
    if (!node.right) add(node.right, i);
  }
  for (var j = 0, len = sum.length; j < len; j++) {
    res.push(sum[j] / count[j]);
  }
  return res;
};

var averageOfLevels = function(root) {
  if (!root) return;

  var sum = [],
    count = [],
    res = [],
    i = 0;

  add(root, i);
  function add(node, i) {
    if (node) {
      if (sum[i] === undefined) {
        sum[i] = 0;
        count[i] = 0;
      }
      sum[i] += node.val;
      count[i]++;
      i++;
    }
    if (node.left) add(node.left, i);
    if (node.right) add(node.right, i);
  }
  for (var j = 0, len = sum.length; j < len; j++) {
    res.push(sum[j] / count[j]);
  }
  return res;
};
