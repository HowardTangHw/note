//arguments => array
function fn() {
  var arr = [];
  for (var i = 0, len = arguments.length; i < len; i++) {
    arr[i] = arguments[i];
  }
  return arr;
}

function fn() {
  var arr = Array.prototype.slice.call(arguments);
  return arr;
}

function fn() {
  var arr = [].slice.call(arguments);
  return arr;
}

//es6
function fn(...arr) {
  return [...arr];
}
var str = "hello world";
var arr = Array.from(str);
// ["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]

function nodeListToArray(nodes) {
  var arr, length;
  try {
    arr = [].slice.call(nodes);
  } catch (err) {
    arr = [];
    length = nodes.length;
    for (var i = 0; i < length; i++) {
      arr.push(nodes[i]);
    }
  }

  return arr;
}
