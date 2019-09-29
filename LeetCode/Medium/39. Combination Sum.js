/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let res = [];
    backTracking(res, candidates, target, [], 0);
    return res;
};

var backTracking = function(res, candidates, target, temp, sum) {
    if (sum === target) {
        res.push(temp);
        return;
    }
    if (sum > target) return;
    for (let i = 0; i < candidates.length; i++) {
        let now = candidates[i];
        if (temp[temp.length - 1] > now) continue;
        backTracking(
            res,
            candidates,
            target,
            [...temp, candidates[i]],
            sum + now
        );
    }
};
