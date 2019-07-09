/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
    let res = [];

    A.forEach(v => {
        res.push(v * v);
    });
    return res.sort((a, b) => a - b);
};

var sortedSquares = function(A) {
    const result = [];
    let front = 0;
    let len = A.length;
    let rear = len - 1;

    let frontSqa = A[front] * A[front];
    let rearSqa = A[rear] * A[rear];
    while (result.length !== len) {
        if (frontSqa >= rearSqa) {
            result.push(frontSqa);
            ++front;
            frontSqa = A[front] * A[front];
        } else {
            result.push(rearSqa);
            --rear;
            rearSqa = A[rear] * A[rear];
        }
    }

    return result.reverse();
};
