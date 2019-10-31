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
var bstToGst = function(root) {
    let pre = 0;
    var dfs = function(root) {
        if (root.right != null) dfs(root.right, pre);
        pre = root.val = pre + root.val;
        if (root.left != null) dfs(root.left, pre);
        return root;
    };
    return dfs(root);
};
