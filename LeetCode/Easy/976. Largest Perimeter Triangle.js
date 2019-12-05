/**
 * @param {number[]} A
 * @return {number}
 */
var largestPerimeter = function(A) {
  if (A.length < 3) return 0;
  let B = A.sort((a, b) => b - a);

  for (let i = 0; i < B.length; i++) {
    let a = B[i],
      b = B[i + 1],
      c = B[i + 2];
    if (!a || !b || !c) return 0;
    if (b + c > a) return a + b + c;
  }

  return 0;
};
