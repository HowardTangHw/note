/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.minStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.minStack.push(x);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    const len = this.minStack.length;
    return this.minStack[len - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return Math.min(...this.minStack);
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.data = [];
    this.minStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.data.push(x);
    if (this.minStack.length <= 0 || x <= this.getMin()) {
        this.minStack.push(x);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    const last = this.top();
    if (last == this.getMin()) {
        this.minStack.pop();
    }
    this.data.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    if (!this.data.length) return null;
    return this.data[this.data.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    if (!this.minStack.length) return null;
    return this.minStack[this.minStack.length - 1];
};
