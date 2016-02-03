import json

routes = json.load(open('data/routes.json', 'r'))

for route in routes['features']:
    id = route['properties']['route']
    # print len(id)
    if (len(id) > 2):
        route_id = id[:2]
    else:
        route_id = id[0]

    route['properties']['id'] = route_id
    # print route_id


print json.dumps(routes)
