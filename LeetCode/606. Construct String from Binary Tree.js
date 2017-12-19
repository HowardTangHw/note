// link:https://leetcode.com/problems/construct-string-from-binary-tree/description/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t
 * @return {string}
 */
// var tree2str = function(t) {
//   if (!t) return '';
//   if (!t.left && !t.right) return t.val + '';
//   if (!t.right) return t.val + '(' + tree2str(t.left) + ')';
//   return t.val + '(' + tree2str(t.left) + ')' + '(' + tree2str(t.right) + ')';
// };

// stack + set
var tree2str = function(t) {
  var res = [];
  var stack = [];
  var set = new Set();
  if (!t) return '';
  stack.push(t);
  while (stack.length) {
    var node = stack[stack.length - 1];
    if (set.has[node]) {
      stack.pop();
      res.push(')');
    } else {
      set.add(node);
      res.push('(');
      res.push(node.val);
      if (node.left == null && node.right != null) res.push('()');
      if (node.right != null) stack.push(node.right);
      if (node.left != null) stack.push(node.left);
    }
  }
  var str = res.join('');
  return str.substring(1, str.length - 1);
};
var t =[1,2,3,4];
tree2str(t);