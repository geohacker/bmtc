'use strict';

var _ = require('underscore');
var jsonfile = require('jsonfile');

var file = '../data/routes.2015.json';
var routes2015 = jsonfile.readFileSync(file);
var busStops = {};

var fc = {'type': 'FeatureCollection',
    'features': []};

routes2015.forEach(function (route) {
    if (route.map_json_content) {
        route.map_json_content.forEach(function (mapJsonContent) {
            if (_.keys(busStops).indexOf(mapJsonContent.busstop) === -1) {
                busStops[mapJsonContent.busstop] = {
                    'geometry': [parseFloat(mapJsonContent.latlons[0])],
                    'degree': 1
                };
            } else {
                busStops[mapJsonContent.busstop].degree += 1;
            }
        });
    }
});

_.keys(busStops).forEach(function (busStopName) {
    var feature = {
        'type': 'Feature',
        'properties': {},
        'geometry': {
            'type': 'Point',
            'coordinates': []
        }
    };

    feature.properties.name = busStopName;
    feature.properties.degree = busStops[busStopName].degree;
    feature.geometry.coordinates = busStops[busStopName].geometry;

    fc.features.push(feature);

});

console.log(JSON.stringify(fc, null, 2));
