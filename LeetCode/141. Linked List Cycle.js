/**
 * link:https://leetcode.com/problems/linked-list-cycle/description/
 */
/**
 * 判断是不是一个环形链(就是一个死循环?)
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

//1.快慢指针:在跑道上,一个快一个慢,快的人总会追到慢的人
var hasCycle = function(head) {
  let slow = head;
  let fast = head.next;
  while (slow != fast) {
    if (fast == null || fast.next == null) return false;
    slow = slow.next;
    fast = fast.next.next;
  }
  return true;
};

//2.递归,判断当前节点的flag,没有则加上,有则是环形链,遇到null则是单向的
var hasCycle = function(head) {
  if (head == null || head.next == null) return false;
  if (head.flag) return true;
  head.flag = true;
  return hasCycle(head.next);
};
