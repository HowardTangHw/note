/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
// Binary Search Tree特性：左树所有值都比当前节点小，右树所有节点都比当前节点大
var bstFromPreorder = function(preorder) {
    let i = 0;
    var helper = function(A, bound) {
        if (i == A.length || A[i] > bound) return null;
        let root = new TreeNode(A[i]);
        i++;
        root.left = helper(A, root.val);
        root.right = helper(A, bound);
        return root;
    };

    return helper(preorder, Number.MAX_SAFE_INTEGER);
};
bstFromPreorder([8, 5, 1, 7, 10, 12]);
