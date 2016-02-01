var turf = require('turf');
var routes = require('./data/routes.json');

// Get bearing and find direction of routes.
// Writes routes GeoJSON to stdout.

routes.features.forEach(function (feature) {
    
    var length = feature.geometry.coordinates.length;
    var start;
    var end;

    if (feature.properties.origin === feature.properties.destination) {
        start = turf.point(feature.geometry.coordinates[0]);
        end = turf.point(feature.geometry.coordinates[1]);
    } else {
        start = turf.point(feature.geometry.coordinates[0]);
        end = turf.point(feature.geometry.coordinates[length - 1]);
    }

    bearing = turf.bearing(start, end);

    // 0 -> N
    // 90 -> E
    // 180 -> S
    // 270 -> W

    // >0 - <90 -> NE
    // >90 - <180 -> SE
    // >180 - <270 -> SW
    // >270 - <360 -> NW
    var direction = null;

    if (bearing < 0) {
        bearing = bearing + 360;
    }

    if (bearing === 0) {
        direction = 'N';
    }

    if (bearing === 90) {
        direction = 'E';
    }

    if (bearing === 180) {
        direction = 'S';
    }

    if (bearing === 270) {
        direction = 'W';
    }


    if (bearing > 0 && bearing < 45) {
        direction = 'N';
    }

    if (bearing >= 45 && bearing < 90) {
        direction = 'E';
    }


    if (bearing >= 90 && bearing < 135) {
        direction = 'E';
    }


    if (bearing >= 135 && bearing < 180) {
        direction = 'S';
    }


    if (bearing >= 180 && bearing < 225) {
        direction = 'S';
    }


    if (bearing >= 225 && bearing < 270) {
        direction = 'W';
    }


    if (bearing >= 270 && bearing < 315) {
        direction = 'W';
    }


    if (bearing >= 315 && bearing < 360) {
        direction = 'N';
    }

    // if (bearing > 0 && bearing < 90) {
    //     direction = 'NE';
    // }

    // if (bearing > 90 && bearing < 180) {
    //     direction = 'SE';
    // }

    // if (bearing > 180 && bearing < 270) {
    //     direction = 'SW';
    // }

    // if (bearing > 270 && bearing < 360) {
    //     direction = 'NW';
    // }

    feature.properties.direction = direction;
});

console.log(JSON.stringify(routes));