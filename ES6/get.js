'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
    function Main(data) {
        _classCallCheck(this, Main);

        this.name = data.name || 'jacky';
        this.age = data.age || '18';
    }

    _createClass(Main, [{
        key: 'say',
        value: function say() {
            var _this = this;

            console.log('my name is ' + this.name + ' i\'m ' + this.age + ' years old');
            var a = function a() {
                _this.abc();
            };
            a();
        }
    }, {
        key: 'abc',
        value: function abc() {
            console.log('123123');
        }
    }]);

    return Main;
}();

var data = {
    name: 'lucio',
    age: '19'
};
var main = new Main(data);
main.say();
$('.abc').on('click', function () {
    console.log('666');
});
var b = 10;
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = 'foo'[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var codePoint = _step.value;

        console.log(codePoint);
    }
    // "f"
    // "o"
    // "o"
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

Number.isFinite(15); // true
var arr1 = 1;
var _arr = 1;
{
    var _arr2 = Array.of(1, 2, 3);
    console.log(_arr2);
}
console.log(arr1);

[1, 2, 3].includes(2);
