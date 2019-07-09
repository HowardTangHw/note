/**
 * @param {number[]} A
 * @return {number}
 */
var repeatedNTimes = function(A) {
    let obj = {};
    for (let i = 0; i < A.length; i++) {
        if (!obj[A[i]]) obj[A[i]] = 0;
        obj[A[i]]++;
    }
    let key = '',
        num = 0;
    for (let k in obj) {
        if (obj[k] > num) {
            key = k;
            num = obj[k];
        }
    }

    return +key;
};

var repeatedNTimes = function(A) {
    for (let i = 0; i < A.length; i++) {
        if (A.lastIndexOf(A[i]) !== i) return A;
    }
};
var repeatedNTimes = function(A) {
    const unique = {};

    for (let i = 0; i < A.length; i++) {
        if (unique[A[i]]) {
            return A[i];
        } else {
            unique[A[i]] = 1;
        }
    }
};
