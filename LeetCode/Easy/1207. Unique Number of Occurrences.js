/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
    let map = {};
    for (let i = 0; i < arr.length; i++) {
        map[arr[i]] = (map[arr[i]] || 0) + 1;
    }

    let countObj = {};
    for (let key in map) {
        let value = map[key];
        if (countObj[value]) return false;
        countObj[value] = 1;
    }

    return true;
};

var uniqueOccurrences = function(arr) {
    const freq = {};
    for (const val of arr) {
        freq[val] = (freq[val] || 0) + 1;
    }
    return Object.keys(freq).length === new Set(Object.values(freq)).size;
};
