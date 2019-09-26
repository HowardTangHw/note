/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let lengthA = 0;
    let lengthB = 0;
    let temp = headA;
    let diff = 0;
    while (temp) {
        lengthA++;
        temp = temp.next;
    }
    temp = headB;
    while (temp) {
        lengthB++;
        temp = temp.next;
    }
    let tempA = headA;
    let tempB = headB;
    // 修整长度
    if (lengthA > lengthB) {
        diff = lengthA - lengthB;
        while (diff) {
            tempA = tempA.next;
            diff--;
        }
    } else {
        diff = lengthB - lengthA;
        while (diff) {
            tempB = tempB.next;
            diff--;
        }
    }

    while (tempA && tempB) {
        if (tempA === tempB) {
            return tempA;
        }
        tempA = tempA.next;
        tempB = tempB.next;
    }
    return null;
};
