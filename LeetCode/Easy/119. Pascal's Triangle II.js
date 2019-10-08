var getRow = function(rowIndex) {
    if (!rowIndex || rowIndex <= 0) return [[1]];
    let pascal = [[1]];
    for (let i = 1; i < rowIndex + 1; i++) {
        const prevRow = pascal[pascal.length - 1];
        const left = [...prevRow, 0];
        const right = [0, ...prevRow];
        const curRow = left.map((v, i) => v + right[i]);
        pascal.push(curRow);
    }
    return pascal[rowIndex];
};
