/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var rangeSumBST = function(root, L, R) {
    if (!root) return null;
    return dfs(root, L, R);
};
const dfs = (node, L, R) => {
    let res = 0;
    if (node.val >= L && node.val <= R) res += node.val;
    if (node.left) res += dfs(node.left, L, R);
    if (node.right) res += dfs(node.right, L, R);

    return res;
};
var rangeSumBST = function(root, L, R) {
    var traverse = function(tree, count) {
        if (tree.val !== null) {
            if (tree.val >= L && tree.val <= R) {
                count += tree.val;
            }

            if (tree.left !== null && tree.val > L) {
                count = traverse(tree.left, count);
            }
            if (tree.right !== null && tree.val < R) {
                count = traverse(tree.right, count);
            }
        }

        return count;
    };

    return traverse(root, 0);
};
