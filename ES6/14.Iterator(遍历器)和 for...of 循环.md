## 14.Iterator(遍历器)和 for...of 循环

> ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable）。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内

- 原生具备 Iterator 接口的数据结构如下。
  - Array
  - Map
  - Set
  - String
  - TypedArray
  - 函数的 arguments 对象
- `for...of`有一些显著的优点。
  - 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
  - 不同于forEach方法，它可以与break、continue和return配合使用。
  - 提供了遍历所有数据结构的统一操作接口。
- `forEach`无法中途跳出forEach循环，break命令或return命令都不能奏效
- `for...in`循环可以遍历数组的键名
  - 数组的键名是数字，但是`for...in`循环是以字符串作为键名“0”、“1”、“2”等等。
  - `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
  - 某些情况下，`for...in`循环会以任意顺序遍历键名。