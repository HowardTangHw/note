let hash = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
};

var romanToInt = function(s) {
    let res = 0;
    let last = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        let sub = s[i];
        if (last > hash[sub]) {
            res -= hash[sub];
        } else {
            res += hash[sub];
        }
        last = hash[sub];
    }
    return res;
};
