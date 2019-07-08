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
var addTwoNumbers = function(l1, l2) {
    const newListNode = dfs(l1, l2, 0);
    return newListNode;
};

var dfs = (l1, l2, d = 0) => {
    if (!l1 && !l2 && d) return new ListNode(d);
    if (!l1 && !l2) return null;
    let f = ((l1 && l1.val) || 0) + ((l2 && l2.val) || 0) + d;

    if (f >= 10) {
        d = 1;
        f = f - 10;
    } else {
        d = 0;
    }
    const newListNode = new ListNode(f);
    if (l1 || l2) newListNode.next = dfs((l1 && l1.next) || null, (l2 && l2.next) || null, d);
    return newListNode;
};

var addTwoNumbers = function(l1, l2) {
    let carry = 0;
    let left = 0;
    let dummy = new ListNode(0);
    let cur = dummy;

    while (l1 !== null && l2 !== null) {
        let add = l1.val + l2.val + carry;
        left = add >= 10 ? add - 10 : add;
        carry = add >= 10 ? 1 : 0;
        cur.next = new ListNode(left);
        cur = cur.next;
        l1 = l1.next;
        l2 = l2.next;
    }

    while (l1 !== null) {
        let add = l1.val + carry;
        left = add >= 10 ? add - 10 : add;
        carry = add >= 10 ? 1 : 0;
        cur.next = new ListNode(left);
        cur = cur.next;
        l1 = l1.next;
    }

    while (l2 !== null) {
        let add = l2.val + carry;
        left = add >= 10 ? add - 10 : add;
        carry = add >= 10 ? 1 : 0;
        cur.next = new ListNode(left);
        cur = cur.next;
        l2 = l2.next;
    }

    if (carry == 1) {
        cur.next = new ListNode(1);
        cur = cur.next;
    }

    return dummy.next;
};

var addTwoNumbers = function(l1, l2) {
    let res = new ListNode(0);
    let pointer = res;
    while (l1 != null || l2 !== null) {
        if (l1 != null) {
            pointer.val += l1.val;
            l1 = l1.next;
        }
        if (l2 != null) {
            pointer.val += l2.val;
            l2 = l2.next;
        }
        if (pointer.val >= 10) {
            pointer.val -= 10;
            pointer.next = new ListNode(1);
        } else if (l1 != null || l2 != null) {
            pointer.next = new ListNode(0);
        }
        pointer = pointer.next;
    }
    return res;
};
var addTwoNumbers = function(l1, l2) {
    let res = new ListNode(0);
    let pointer = res;
    while (l1 != null || l2 !== null) {
        if (l1 != null) {
            pointer.val += l1.val;
            l1 = l1.next;
        }
        if (l2 != null) {
            pointer.val += l2.val;
            l2 = l2.next;
        }
        if (pointer.val >= 10) {
            pointer.val -= 10;
            pointer.next = new ListNode(1);
        } else if (l1 != null || l2 != null) {
            pointer.next = new ListNode(0);
        }
        pointer = pointer.next;
    }
    return res;
};
