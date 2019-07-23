/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
// 二维数组一维
var relativeSortArray = function(arr1, arr2) {
    let indexMap = {};
    let res = [];
    let bres = [];
    for (let i = 0; i < arr2.length; i++) {
        indexMap[arr2[i]] = i;
    }
    for (let j = 0; j < arr1.length; j++) {
        let cur = arr1[j];
        let index = indexMap[cur];
        if (index !== undefined) {
            if (!res[index]) res[index] = [];
            res[index].push(cur);
        } else {
            bres.push(cur);
        }
    }

    return res
        .join(',')
        .split(',')
        .concat(bres.sort((a, b) => a - b));
};

// use Map
var relativeSortArray = function(arr1, arr2) {
    let cache = new Map();
    let result = [];
    let secondArray = [];
    for (let i of arr2) {
        cache.set(i, []);
    }
    for (let j of arr1) {
        if (cache.has(j)) {
            cache.get(j).push(j);
        } else {
            secondArray.push(j);
        }
    }
    for (let a of cache.values()) {
        result.push(...a);
    }
    return [...result, ...secondArray.sort((a, b) => a - b)];
};
