/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let res = [];
    let flagArr = [];
    for (let i = 0; i < strs.length; i++) {
        let nowStr = strs[i]
            .split('')
            .sort((a, b) => a.charCodeAt() - b.charCodeAt())
            .join('');
        console.log(nowStr);
        let index = flagArr.findIndex(v => v == nowStr);
        if (index == -1) {
            flagArr.push(nowStr);
            index = flagArr.length - 1;
        }
        if (!res[index]) res[index] = [];
        res[index].push(strs[i]);
    }
    return res;
};

var groupAnagrams = function(strs) {
    let map = new Map();

    strs.forEach(str => {
        let sumStrCharCode = getStrCharCodeSum(str);
        let tempArr;
        if (map.has(sumStrCharCode)) {
            tempArr = map.get(sumStrCharCode);
        } else {
            tempArr = [];
        }
        tempArr.push(str);
        map.set(sumStrCharCode, tempArr);
    });

    return [...map.values()];

    function getStrCharCodeSum(str) {
        return str.split('').reduce((accu, curr) => {
            // 需要* 來避免charCodeSum 重複
            return accu + curr.charCodeAt() ** 4;
        }, 0);
    }
};
 
