import json

# Find the number of routes orginating and terminating at a bus stop.

routes = json.load(open('data/routes.json', 'r'))
stops = json.load(open('data/busstops.geojson', 'r'))
o = open('data/busstops_point_stats.json', 'w')

for route in routes['features']:
    origin = route['properties']['origin']
    destination = route['properties']['destination']
    print '# looking for: ', origin
    for stop in stops['features']:
        if (stop['properties']['name'] == origin):
            if ('routes_originating' in stop['properties'].keys()):
                stop['properties']['routes_originating'] = stop['properties']['routes_originating'] + 1
            else:
                stop['properties']['routes_originating'] = 1
        if (stop['properties']['name'] == destination):
            if ('routes_destination' in stop['properties'].keys()):
                stop['properties']['routes_destination'] = stop['properties']['routes_destination'] + 1
            else:
                stop['properties']['routes_destination'] = 1

json.dump(stops, o)
