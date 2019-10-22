/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function(text) {
    let textStr = [['b', 0], ['a', 0], ['l', 0], ['o', 0], ['n', 0]];
    let count = Number.MAX_SAFE_INTEGER;
    let map = new Map(textStr);
    for (let i = 0; i < text.length; i++) {
        let t = text[i];
        if (map.has(t)) {
            map.set(t, map.get(t) + 1);
        }
    }
    for (let [key, value] of map) {
        if (key === 'l' || key === 'o')
            count = Math.min(count, Math.floor(value / 2));
        else count = Math.min(count, Math.floor(value));
    }
    console.log(count);
    return count;
};
maxNumberOfBalloons('nlaebolko');
