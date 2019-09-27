/**
 * @param {number[]} T
 * @return {number[]}
 */

// stack
var dailyTemperatures = function(T) {
    let stack = [];
    let res = Array(T.length).fill(0);
    for (let i = 0; i < T.length; i++) {
        while (stack.length > 0 && T[i] > T[stack[stack.length - 1]]) {
            let idx = stack.pop();
            res[idx] = i - idx;
        }
        stack.push(i);
    }

    return res;
};
var dailyTemperatures = function(T) {
    let stack = [];
    let top = -1;
    let res = Array(T.length).fill(0);
    for (let i = 0; i < T.length; i++) {
        while (top > -1 && T[i] > T[stack[top]]) {
            let idx = stack[top--];
            res[idx] = i - idx;
        }
        stack[++top] = i;
    }

    return res;
};
