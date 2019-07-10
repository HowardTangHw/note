/**
 * @param {number[]} heights
 * @return {number}
 */
var heightChecker = function(heights) {
    const sortHeights = heights.slice().sort((a, b) => a - b);
    let res = 0;
    heights.forEach((v, i) => {
        if (v !== sortHeights[i]) {
            res++;
        }
    });
    return res;
};
