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

// recursive
var dfs = function(root, res) {
    if (!root) return null;
    dfs(root.left, res);
    res.push(root.val);
    dfs(root.right, res);
};

var inorderTraversal = function(root) {
    let res = [];
    if (!root) return res;
    dfs(root, res);
    return res;
};

// iteratively
var inorderTraversal = function(root) {
    let res = [];
    let stack = [];
    while (root || stack.length > 0) {
        if (root) {
            stack.push(root);
            root = root.left;
        } else {
            root = stack.pop();
            res.push(root.val);
            root = root.right;
        }
    }
    return res;
};
