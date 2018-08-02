// link:https://leetcode.com/problems/middle-of-the-linked-list/description/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
  let arr = [];
  function dfs(node) {
    if (!node) return;
    arr.push(node.val);
    dfs(node.next);
  }

  dfs(head);
  let mid = Math.floor(arr.length / 2);
  return arr.slice(mid);
};

var middleNode = function(head) {
  let arr = [],
    node = head;
  while (node != null) {
    arr.push(node);
    node = node.next;
  }
  return arr[Math.floor(arr.length / 2)];
};

var middleNode = function(head) {
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
