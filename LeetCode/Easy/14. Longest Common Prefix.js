/**
 * @param {string[]} strs
 * @return {string}
 */

var longestCommonPrefix = function(strs) {
    let p = strs[0];
    
    for(let w of strs) {
        while(w.indexOf(p) != 0) {
            p = p.substring(0, p.length - 1);
        }
    }
          
    return p;
};
