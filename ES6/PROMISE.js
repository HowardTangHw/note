// Promises/A+ 规范
// http://www.ituring.com.cn/article/66566
const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function PromiseA(fn) {
  let state = PENDING;
  let value = null;
  let handlers = [];

  function fulfill(result) {
    state = FULFILLED;
    value = result;
    handlers.forEach(handle);
    handlers = null;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
    handlers.forEach(handle);
    handlers = null;
  }

  function resolve(result) {
    try {
      var then = getThen(result);
      if (then) {
        // 传resolve而不是fulfill
        doResolve(then.bind(reuslt), resolve, reject);
        return;
      }
      fulfill(result);
    } catch (err) {
      reject(err);
    }
  }

  doResolve(fn, resolve, reject);

  function handle(handler) {
    if (state === PENDING) {
      handlers.push(handler);
    } else {
      if (state === FULFILLED && typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(value);
      }
      if (state === REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected(value);
      }
    }
  }

  this.done = (onFulfilled, onRejected) => {
    setTimeout(() => {
      handle({ onFulfilled, onRejected });
    }, 0);
  };

  this.then = (onFulfilled, onRejected) => {
    const self = this;
    return new PromiseA((resolve, reject) => {
      self.done(
        result => {
          if (typeof onFulfilled === 'function') {
            try {
              return resolve(onFulfilled(result));
            } catch (err) {
              return reject(err);
            }
          } else {
            return resolve(result);
          }
        },
        err => {
          if (typeof onRejected === 'function') {
            try {
              return resolve(onRejected(err));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return reject(err);
          }
        },
      );
    });
  };

  this.catch = errorHandle => {
    return this.then(null, errorHandle);
  };
}
function getThen(value) {
  var t = typeof value;
  if (value && (t === 'object' || t === 'function')) {
    const then = value.then;
    if (typeof then === 'function') {
      return then;
    }
  }
  return null;
}
function doResolve(fn, onFulfilled, onRejected) {
  let done = false;
  try {
    fn(
      value => {
        if (done) return;
        done = true;
        onFulfilled(value);
      },
      reason => {
        if (done) return;
        done = true;
        onRejected(reason);
      },
    );
  } catch (err) {
    if (done) return;
    done = true;
    onRejected(err);
  }
}

let A = new PromiseA((resolve, reject) => {
  setTimeout(() => {
    resolve('123');
  }, 10);
})
  .then((a, b) => {})
  .then(data => {
    // console.log(data);
    return data;
  })
  .then(data => {
    // console.log(data);
  });
