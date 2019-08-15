/**
 * @param {string} S
 * @return {string}
 */
var reverseOnlyLetters = function(S) {
    //remove symbols from copy
    let copy = S;
    let onlyLetters = copy.replace(/[^a-zA-Z]/gi, "").split('');
    if(!onlyLetters.length) return S;
    
    console.log(onlyLetters)
    
    let final = '';
    for (let i=0;i<S.length;i++){ 
        final += /[^a-zA-Z]/.test(S[i]) ? S[i] : onlyLetters.pop();
    }
    return final;
};
var reverseOnlyLetters = function(S) {
    const map = {};
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => map[letter] = true);
    const chars = S.split("");
    
    let i = 0, j = chars.length - 1;
    
    while (i < j && chars[i] && chars[j]) {
        while (!map[chars[i].toLowerCase()] && i < chars.length - 1) { i++; }
        while (!map[chars[j].toLowerCase()] && j > 0) { j--; }
        
        if (i >= j) { 
            break; 
        } else {
            const temp = chars[i];
            chars[i] = chars[j];
            chars[j] = temp;
            
            i++;
            j--;
        }
    }
    
    return chars.join("");
};
