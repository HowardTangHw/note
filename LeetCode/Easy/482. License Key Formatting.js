/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function(S, K) {
    S = S.toUpperCase().replace(/-/g, '');
    let len = S.length;
    let r = ''
    while(len>0){
        let sliceIndex = len-K<0?0:len-K
        r = S.slice(sliceIndex,len) + '-' + r;
        len = len - K
    }
    return r.slice(0,-1)
};
