/**
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function(tiles) {
    let map = string2Map(tiles);
    return dfs(map, tiles);
};

var string2Map = tiles => {
    let map = {};
    for (let i = 0; i < tiles.length; i++) {
        map[tiles[i]] = (map[tiles[i]] || 0) + 1;
    }
    return map;
};

var dfs = (map, tiles) => {
    let sum = 0;
    for (let char in map) {
        if (map[char] !== 0) {
            sum++;
            map[char] = map[char] - 1;
            sum += dfs(map, tiles);
            map[char] = map[char] + 1;
        }
    }

    return sum;
};
