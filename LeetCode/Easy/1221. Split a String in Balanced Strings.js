/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function(s) {
    let map = {
        L: 0,
        R: 0
    };
    let count = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'L') map['L'] = map['L'] + 1;
        if (s[i] === 'R') map['R'] = map['R'] + 1;

        if (map['L'] === map['R']) {
            count++;
            map['L'] = 0;
            map['R'] = 0;
        }
    }

    return count;
};
