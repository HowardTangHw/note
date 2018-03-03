/** Adapter **/

// 定制函数fn,限制了fn的入参个数
const ary = (fn, n) => (...args) => fn(...args.slice(0, n));

const call = (key, ...args) => context => context[key](...args);

const collectInto = fn => (...args) => fn(...args);
export default { ary, call };
