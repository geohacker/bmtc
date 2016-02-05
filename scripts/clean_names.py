import json

# Get clean readable names for bus stops.

i = json.load(open('data/busstops.2015.geojson', 'r'))
o = open('data/busstops.2015.clean.json', 'w')

stops = {
    'type': 'FeatureCollection',
    'features': []
}

for stop in i['features']:
    stop['properties']['name'] = stop['properties']['name'].split(',')[0]
    stops['features'].append(stop)

o.write(json.dumps(stops))
