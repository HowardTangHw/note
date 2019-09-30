/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let map = {};
    let res = [];
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = (map[nums[i]] || 0) + 1;
    }
    let arr = Array(Object.keys(map).length);
    for (let k in map) {
        let v = map[k];
        if (!arr[v]) arr[v] = [];
        arr[v].push(k);
    }

    for (let i = arr.length; i >= 0; i--) {
        if (res.length === k) return res;
        if (arr[i]) res.push(...arr[i]);
    }
};
var topKFrequent = function(nums, k) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const item = nums[i];
        if (map.has(item)) {
            map.set(item, map.get(item) + 1);
        } else {
            map.set(item, 1);
        }
    }
    return Array.from(map)
        .sort((a, b) => b[1] - a[1])
        .map(a => a[0])
        .slice(0, k);
};
