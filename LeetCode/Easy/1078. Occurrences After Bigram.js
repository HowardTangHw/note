/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
var findOcurrences = function(text, first, second) {
    let flag = false;
    let res = [];
    let textArr = text.split(' ');

    for (let i = 1; i < textArr.length; i++) {
        let lastWord = textArr[i - 1];
        let nowWord = textArr[i];
        if (flag) {
            res.push(nowWord);
            flag = false;
        }
        if (nowWord === second && lastWord == first) flag = true;
    }
    return res;
};
