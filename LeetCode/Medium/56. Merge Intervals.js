/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

function merge(intervals) {
    if (!intervals.length) return intervals;
    intervals.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    let pre = intervals[0];
    let res = [pre];
    for (let cur of intervals) {
        if (cur[0] <= pre[1]) {
            pre[1] = Math.max(pre[1], cur[1]);
        } else {
            res.push(cur);
            pre = cur;
        }
    }
    return res;
}
