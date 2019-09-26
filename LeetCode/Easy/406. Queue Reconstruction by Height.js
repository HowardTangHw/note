/**
 * @param {number[][]} people
 * @return {number[][]}
 */

var reconstructQueue = function(people) {
    const queue = [];

    const sorted = people.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return b[0] - a[0];
    });

    sorted.forEach(person => {
        queue.splice(person[1], 0, person);
    });

    return queue;
};
