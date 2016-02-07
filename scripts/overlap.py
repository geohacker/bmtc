import csv
import json

routes_file = open('./data/routes.2015.csv', 'r')
routes = list(csv.DictReader(routes_file))

routes_json = json.load(open('./data/routes.2015.json'))
collection = {}

def get_overlap(route_one, route_two):
    overlap = 0
    for stops_one in route_one:
        stops_one_name = stops_one['busstop']
        for stops_two in route_two:
            stops_two_name = stops_two['busstop']
            if (stops_one_name == stops_two_name):
                overlap = overlap + 1
    return overlap

for route in routes:
    # print '# route', route['route_no']
    try:
        route_stops = json.loads(route['map_json_content'])
    except:
        continue

    if (route_stops):
        for next_route in routes:
            if (route['route_no'] != next_route['route_no']):
                # print next_route['route_no']
                try:
                    next_route_stops = json.loads(next_route['map_json_content'])
                except:
                    continue
                if (next_route_stops):
                    score = get_overlap(route_stops, next_route_stops)
                    # print overlap
        collection[route['route_no']] = score

for r in routes_json['features']:
    r['properties']['overlap'] = collection[r['properties']['route']]

print json.dumps(routes_json)
