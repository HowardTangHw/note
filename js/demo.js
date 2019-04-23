function fibonacci(x) {
  var result = 0;
  // do staff begin
  if (x < 0) return console.log('warning');
  if (x == 1 || x == 0) return x;
  result = fibonacci(x - 1) + fibonacci(x - 2);
  // do staff end
  return result;
}

function factorial(x) {
  var result = 0;
  // do staff begin
  if (x <= 1) return 1;
  result = x * factorial(x - 1);
  // do staff end
  return result;
}

function Animal(props) {
  this.name = props.name;
  this.say = this.say(this.name);
}
Animal.prototype.say = function(name) {
  return function() {
    console.log('say' + this.name);
  };
};

var animalA = new Animal({ name: '小白鼠A' });
var animalB = new Animal({ name: '小白鼠B' });

console.log(animalA.say !== animalB.say);
console.log(animalA.__proto__.say === animalB.__proto__.say);

class AnimalA {
  constructor(props) {
    this.name = props.name;
    this.say = this.say(this.name);
  }
  say() {
    return function() {
      console.log('say' + this.name);
    };
  }
}
var animalAA = new AnimalA({ name: '小白鼠A' });
var animalBB = new AnimalA({ name: '小白鼠B' });

console.log(animalAA.say !== animalBB.say);
console.log(animalAA.__proto__.say === animalBB.__proto__.say);

function demo(a, b, c) {
  let b_dist = [],
    c_dist = [],
    d_list = [];
  for (let i = 0; i < a.length; i++) {
    // 使用取巧的方法,最后二维数组转一维数组
    const b_index = b.findIndex(v => v == a[i]);
    if (b_index !== -1) {
      if (!b_dist[b_index]) b_dist[b_index] = [];
      // 利用排序数组的坐标索引来排, 最后再讲二维数组转一维
      b_dist[b_index].push(a[i]);
      continue;
    }
    const c_index = c.findIndex(v => v == a[i]);
    if (c_index !== -1) {
      if (!c_dist[c_index]) c_dist[c_index] = [];
      c_dist[c_index].push(a[i]);
      continue;
    }
    d_list.push(a[i]);
  }
  d_list = d_list.sort((a, b) => a - b);
  return [...flat(b_dist), ...d_list, ...flat(c_dist)];
}

function flat(arr) {
  let newArr = [];
  let arrSplit = arr.toString().split(',');
  for (let i = 0; i < arrSplit.length; i++) {
    if (arrSplit[i]) newArr.push(+arrSplit[i]);
  }
  return newArr;
}

let a = [6, 5, 4, 3, 2, 1, 7, 8, 3, 5, 4, 6, 8, 2, 12, 545, 745, 323, 7],
  b = [7, 4, 5],
  c = [3, 1, 323];

console.log(demo(a, b, c));
