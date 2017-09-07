/**
 * link:https://leetcode.com/problems/merge-two-binary-trees/description/
 */ 
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
 if(t1.val||t2.val)add(t1,t2);
  function add(n1,n2){
    n1.val=n1.val?n1.val:0;
    n2.val=n2.val?n2.val:0;
    n1.val=n2.val+n1.val;
    if((n1.left)||(n2.left)) add(n1.left,n2.left)
    if((n1.right)||(n2.right)) add(n1.right,n2.right)
  }
  return t1;
};