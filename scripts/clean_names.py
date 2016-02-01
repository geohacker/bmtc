import json

# Get clean readable names for bus stops.

i = json.load(open('busstops.geojson', 'r'))
o = open('busstops_clean_names.json', 'w')

stops = {
    'type': 'FeatureCollection',
    'features': []
}

for stop in i['features']:
    stop['properties']['name'] = stop['properties']['name'].split(',')[0]
    stops['features'].append(stop)

o.write(json.dumps(stops))
