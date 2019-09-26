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
var isPalindrome = function(head) {
    let res = [];
    let temp = head;

    while (temp) {
        res.push(temp.val);
        temp = temp.next;
    }
    return res.join('') === res.reverse().join('');
};

var isPalindrome = function(head) {
    let res = [];
    let temp = head;
    while (temp) {
        res.push(temp.val);
        temp = temp.next;
    }
    temp = head;
    while (res.length > 0) {
        if (temp.val === res.pop()) {
            temp = temp.next;
        } else {
            return false;
        }
    }
    return true;
};
