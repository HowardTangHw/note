/**
 * link:https://leetcode.com/problems/subtree-of-another-tree/discuss/
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */

/**
 * 思路,isSame中,只有根节点的值相等的情况下,才会去对比左树和右树.
 * 都一致的情况下,返回true.
 * 而在isSubTree中,
 * 只要在 if (isSame(s, t)) return true; 未被返回,即值不相等,则递归只身,
 * 将左节点/又节点放进去进行比较,
 * 只要分支一方为 true 则返回 true
 * 都没有则false
 * BFS
 * 
 * 只要值不相等==>isSubtree中递归传值
 * 值相等了==>isSame中判断
 */

var isSubtree = function(s, t) {
  if (!s && !t) return true;
  if (!s || !t) return false;
  if (isSame(s, t)) return true;
  return isSubtree(s.left, t) || isSubtree(s.right, t);
};
var isSame = (s, t) => {
  if (!s && !t) return true;
  if (!s || !t) return false;
  if (s.val !== t.val) return false;
  return isSame(s.left, t.left) && isSame(s.right, t.right);
};
