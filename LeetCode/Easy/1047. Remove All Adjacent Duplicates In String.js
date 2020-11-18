/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function(S) {
    let stack =[S[0]];
    for(let i=1;i<S.length;i++){
        let sLast = stack.length - 1;
        let cur  = S[i];
        if(stack[sLast] === cur){
            stack.pop();
        }else{
            stack.push(cur);
        }
    }
    return stack.join('');
};


var removeDuplicates = function(S) {
    regex = /(\w)\1/g;
    while (regex.test(S)){
        S = S.replace(regex, '');
    };
    return S;
}
