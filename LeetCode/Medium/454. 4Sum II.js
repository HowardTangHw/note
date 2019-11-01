/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
var fourSumCount = function(A, B, C, D) {
    const items = new Map();
    for(let i=0; i<A.length; i++){
        for(let j=0; j<B.length; j++){
            const sum = A[i]+ B[j];
            if(items.has(sum)){
                items.set(sum, items.get(sum)+1);
            } else {
                items.set(sum, 1);
            }
        }
    }
    
    let count = 0;
    for(let i=0; i<C.length; i++){
        for(let j=0; j<D.length; j++){
            const sum = C[i]+ D[j];
            if(items.has(-sum)){
                count += items.get(-sum);
            }
        }
    }
    return count;
    
};
