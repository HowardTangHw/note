var threeSum = function (nums) {
  let newNums = nums.sort((a, b) => a - b);
  let result = [];
  let n = newNums.length;
  for (let i = 0; i < n - 2; i++) {
    x = newNums[i];
    if (i > 0 && x == newNums[i - 1]) {
      continue;
    }
    if (x + newNums[i + 1] + newNums[i + 2] > 0) {
      break;
    }
    if (x + newNums[n - 1] + newNums[n - 2] < 0) {
      continue;
    }

    let j = i + 1;
    let k = n - 1;
    while (j < k) {
      let sum = newNums[j] + newNums[k] + x;
      if (sum > 0) {
        k--;
      } else if (sum < 0) {
        j++;
      } else {
        result.push([x, newNums[j], newNums[k]]);
        j++;
        while (j < k && newNums[j] == newNums[j - 1]) {
          j++;
        }
        k--;
        while (j < k && newNums[k] == newNums[k + 1]) {
          k--;
        }
      }
    }
  }

  return result;
};
