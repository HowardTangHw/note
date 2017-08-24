function Tree(left, label, right) {
  this.left = left;
  this.right = right;
  this.label = label;
}

function make(arr) {
  if (arr.length == 1) return new Tree(null, arr[0], null);
  return new Tree(make(arr[0]), arr[1], make(arr[2]));
}

let tree = make([[["a"], "b", ["c"]], "d", [["e"], "f", ["g"]]]);

//先序
function* firstInorder(tree) {
  if (tree) {
    yield tree.label;
    yield* firstInorder(tree.left);
    yield* firstInorder(tree.right);
  }
}

//中序
function* midInorder(tree) {
  if (tree) {
    yield* midInorder(tree.left);
    yield tree.label;
    yield* midInorder(tree.right);
  }
}

//后序
function* endInorder(tree) {
  if (tree) {
    yield* endInorder(tree.left);
    yield* endInorder(tree.right);
    yield tree.label;
  }
}

var result1 = [];
for (let node of firstInorder(tree)) {
  result1.push(node);
}
var result2 = [];
for (let node of midInorder(tree)) {
  result2.push(node);
}
var result3 = [];
for (let node of endInorder(tree)) {
  result3.push(node);
}
console.log("树:" + tree);
console.log("先序:" + result1);
console.log("中序:" + result2);
console.log("后序:" + result3);

//整合
function* Inorder(tree, option = 1) {
  if (tree) {
    var txt, result, stepIndex;
    function* step1(tree,option) {
      if (tree) {
        yield tree.label;
        yield* Inorder(tree.left,option);
        yield* Inorder(tree.right,option);
      }
    }
    function* step2(tree,option) {
      if (tree) {
        yield* Inorder(tree.left,option);
        yield tree.label;
        yield* Inorder(tree.right,option);
      }
    }
    function* step3(tree,option) {
      if (tree) {
        yield* Inorder(tree.left,option);
        yield* Inorder(tree.right,option);
        yield tree.label;
      }
    }
    if (option == 1) {
      yield* step1(tree,option);
    } else if (option == 2) {
      yield* step2(tree,option);
    } else {
      yield* step3(tree,option);
    }
  }
}
var result4 = [];
for (let node of Inorder(tree,2)) {
  result4.push(node);
}
console.log(result4);