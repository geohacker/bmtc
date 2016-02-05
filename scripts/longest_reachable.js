var turf = require('turf');
var lines = require('../data/reach_lines.json');

lines.features.forEach(function (line) {
    var length = turf.lineDistance(line, 'kilometers');
    // console.log(line);
    line.properties = {
        'distance': length
    };
});

console.log(JSON.stringify(lines));