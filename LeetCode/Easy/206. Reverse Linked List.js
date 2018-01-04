/**
 * link:https://leetcode.com/problems/reverse-linked-list/description/
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
 * @return {ListNode}
 */

// DFS
var reverseList = function(head) {
  if (head == null || head.next === null) return head;
  //记录当前节点的下一个节点
  var next = head.next;
  //将当前节点的后面节点清空
  head.next = null;
  //把后面的都这样处理
  var newHead = reverseList(next); //这里的newHead 出来的都是无指向的,
  //将当前节点的后面节点指向 当前节点
  //操作就是A->B 现在是B->A
  next.next = head; //指向在这一步进行
  //返回当前的形态
  return newHead;
};
/**
 * DFS步骤: A->B->C
 * A B C
 * A B<-C
 * A<-B-<C
 */

//WHILE
var reverseList = function(head) {
  let ans = [];
  while (head) {
    ans.unshift(head);
    head = head.next;
  }
  if (!ans.length) return null;
  for (let i = 0; i < ans.length; i++) {
    ans[i].next = ans[i + 1];
  }
  return ans[0];
};

//一次循环就ok
var reverseList = function(head) {
  var pre = null;
  while (head) {
    var next = head.next;
    head.next = pre;
    pre = head;
    head = next;
  }
  return pre;
};