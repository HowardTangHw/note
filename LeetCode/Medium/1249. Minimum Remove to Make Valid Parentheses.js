/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
    // 根据下标存是否合法
    let stack =[];
    // 存下标
    let bracketStack = [];
    let result = '';
    for(let i = 0;i<s.length;i++){
        if(s[i]==='(') {
            bracketStack.push(i);
            stack[i] = true;
        }
        if (s[i] == ')') {
            if (bracketStack.length<=0) {
                stack[i] = true;
            } else {
                stack[bracketStack.pop()] = false;
            }
        }
    }
    for (let i = 0; i < s.length; i++) {
        if (!stack[i]) {
            result += s[i]
        }
    }
    return result;
};
