var twoSum = function(nums, target) {
  for (var i = 0, len = nums.length; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return undefined;
};

var twoSum = function(nums, target) {
  for (var i = 0, len = nums.length; i < len; i++) {
    var d = nums.indexOf(target - nums[i]);
    if (!(d === -1) && !(d === i)) {
      return [i, d];
    }
  }
};

var twoSum = function(nums, target) {
  var ans = [];
  var map = {};
  for (var i = 0; i < nums.length; i++) {
    if (map[target - nums[i]] !== undefined) {
      ans[0] = parseInt(map[target - nums[i]]);
      ans[1] = i;
      return ans;
    }
    map[nums[i]] = i;
  }
};



/*用key存放值,用value存放这个值的索引值*/
var twoSum = function(nums, target) {
  var a = [];
  for (var i = 0, len = nums.length; i < len; i++) {
    var tmp = target - nums[i];
    if (a[tmp] !== undefined) return [a[tmp], i];
    a[nums[i]] = i;
  }
};

var nums = [3, 2, 0, 4],
  target = 6;
twoSum(nums, target);