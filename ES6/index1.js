"use strict";

require("babel-polyfill");

var arr = document.getElementsByClassName('btn');
arr = Array.from(arr);
console.log(arr);
