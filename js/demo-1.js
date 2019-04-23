var merge = function(nums1, m, nums2, n) {
  let k = m + n - 1,
    i = m - 1,
    j = n - 1;
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      k = k - 1;
      i = i - 1;
    } else {
      nums1[k] = nums2[j];
      k = k - 1;
      j = j - 1;
    }
    console.log(nums1);
  }
  // while (j >= 0) {
  //   nums1[k] = nums2[j];
  //   k = k - 1;
  //   j = j - 1;
  // }
  return nums1;
};
merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);

let user = { id: 1 };
let a = {
  1: {},
  2: {},
};
