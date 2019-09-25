/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
var distributeCandies = function(candies, num_people) {
    let res = Array(num_people).fill(0);
    let step = 1;
    let index = 0;
    while (candies) {
        let add = step > candies ? candies : step;
        if (index >= num_people) index = 0;
        res[index] = res[index] + add;
        candies -= step;
        index++;
        step++;
    }
    return res;
};
