var sumOfTheDigitsOfHarshadNumber = function (x) {
  let sum = 0;
  let tp = x;
  while (x > 9) {
    sum += x % 10;
    x = Math.floor(x / 10);
  }
  sum += Math.floor(x);
  if (tp % sum == 0) {
    return sum;
  }
  return -1;
};
