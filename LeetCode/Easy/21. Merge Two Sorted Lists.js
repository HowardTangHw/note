//link:https://leetcode.com/problems/merge-two-sorted-lists/description/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let head;
  if (l1 === null || l2 == null) return l1 || l2;
  let big = l1.val >= l2.val ? l1 : l2;
  let small = l1.val >= l2.val ? l2 : l1;
  head = small;
  head.next = mergeTwoLists(small.next, big);
  return head;
};
