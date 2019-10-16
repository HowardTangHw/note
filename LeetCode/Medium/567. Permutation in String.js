/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    // invalid
    if (s1.length > s2.length) {
        return false;
    }

    // null
    if (!s1 || !s2) {
        return false;
    }

    const s1Map = getHashMapOfString(s1);
    const q = [];
    for (const char of s2) {
        if (s1Map[char] > 0) {
            s1Map[char]--;
            q.push(char);
            if (s1.length === q.length) return true;
        } else {
            // 重置Q，或者直到相等
            while (q.length) {
                let head = q.shift();
                if (head !== char) {
                    s1Map[head]++;
                } else {
                    q.push(char);
                    break;
                }
            }
        }
    }

    return false;
};

function getHashMapOfString(str) {
    const map = {};
    for (const c of str) {
        if (!map[c]) {
            map[c] = 0;
        }
        map[c]++;
    }
    return map;
}
