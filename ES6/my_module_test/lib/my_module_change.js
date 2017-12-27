'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _my_module = require('./my_module');

Object.defineProperty(exports, 'foo', {
  enumerable: true,
  get: function get() {
    return _my_module.foo;
  }
});
Object.defineProperty(exports, 'bar', {
  enumerable: true,
  get: function get() {
    return _my_module.bar;
  }
});

function foo() {
  console.log('this is change foo');
}
function bar() {
  console.log('this is change bar');
}