/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
var distanceBetweenBusStops = function(distance, start, destination) {
    let left = 0;
    let right = 0;

    if (start === destination) return 0;

    if (start > destination) {
        [start, destination] = [destination, start];
    }

    for (let i = 0; i < distance.length; i++) {
        if (start <= i && i < destination) {
            left += distance[i];
        } else {
            right += distance[i];
        }
    }
    return Math.min(left, right);
};

var distanceBetweenBusStops = function(distance, start, destination) {
    let forward = start,
        backward = start;
    let fcount = 0,
        bcount = 0;

    if (start == destination) return 0;

    while (true) {
        fcount += distance[forward];
        forward++;
        if (forward === distance.length) forward = 0;

        backward--;
        if (backward == -1) backward = distance.length - 1;
        bcount += distance[backward];

        if (forward === destination) return fcount;
        if (backward === destination) return bcount;
    }
};
