var turf = require('turf');
var routes = require('../data/routes.2015.json');
var _ = require('underscore');
// For a route find a buffer.
// Go through rest of the routes to find things that overlap. 
// If there's an overlap, add a score. 
var overlapRoute = {};

routes.features.forEach(function (route, index, routes) {
    var routeName = route.properties.route;
    process.stderr.write(route.properties.route + '\n');
    var restRoutes = _.without(routes, route);
    // var buffer = turf.buffer(route, 0.00001, 'meters');
    restRoutes.forEach(function (restRoute) {
        try {
            var intersect = turf.intersect(route, restRoute);
            if (intersect) {
                // console.log(intersect);
                if (overlapRoute.hasOwnProperty(route)) {
                    if (intersect.geometry.type === 'GeometryCollection') {
                        overlapRoute[routeName].properties.intersect = overlapRoute[routeName].properties.intersect + getCollectionLength(intersect);
                    } else {
                        overlapRoute[routeName].properties.intersect = overlapRoute[routeName].properties.intersect + intersect.geometry.coordinates.length;
                    }
                } else {
                    if (intersect.geometry.type === 'GeometryCollection') {
                        route.properties.intersect = getCollectionLength(intersect);
                    } else {
                        route.properties.intersect = intersect.geometry.coordinates.length;
                    }
                    overlapRoute[routeName] = route;
                }
            }
        } catch (e) {
            
        }

    });  
});

function getCollectionLength(collection) {
    var length = 0;
    collection.geometry.geometries.forEach(function (g) {
        length = length + g.length;
    });
    return g;
}

var output = {
    'type': 'FeatureCollection',
    'features': ''
};

output.features = _.values(overlapRoute);
process.stdout.write(JSON.stringify(output));
