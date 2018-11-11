import csv
import json
import time
import datetime

# Take routes, find first_departure, first_arrival, last_departure, last_arrival, duration and avg speed

i = csv.DictReader(open('data/routes.2018.csv', 'r'))

newrow = {
    'type': 'FeatureCollection',
    'features': []
}

for row in i:
    feature = {
        'type': 'Feature',
        'properties': {},
        'geometry': {
            'type': 'LineString',
            'coordinates': []
        }
    }

    feature['properties']['route'] = row['route_no']
    feature['properties']['origin'] = row['origin']
    feature['properties']['destination'] = row['destination']
    departures_origin = row['departure_from_origin'].split(',')
    arrivals_origin = row['arrival_at_origin'].split(',')

    departures_destination = row['departure_from_destination'].split(',')
    arrivals_destination = row['arrival_at_destination'].split(',')


    first_departure = departures_origin[0].strip(' ')
    # if first_departure.startswith("00"):
    #     first_departure = departures_origin[1].strip(' ')

    feature['properties']['first_departure'] = first_departure
    feature['properties']['last_departure'] = departures_origin[-1].strip(' ')

    for arrival in arrivals_destination:
        first_arrival = arrival.strip(' ')
        if ((int(first_arrival.split(':')[0])) < int(first_departure.split(':')[0])):
            continue
        else:
            break

    feature['properties']['first_arrival'] = first_arrival

    feature['properties']['last_arrival'] = arrivals_destination[-1].strip(' ')

    feature['properties']['trips'] = len(departures_origin) + len(departures_destination)

    start = time.strptime(feature['properties']['first_departure'], '%H:%M')
    end = time.strptime(feature['properties']['first_arrival'], '%H:%M')

    start_seconds = datetime.timedelta(hours=start.tm_hour, minutes=start.tm_min, seconds=start.tm_sec).total_seconds()
    end_seconds = datetime.timedelta(hours=end.tm_hour, minutes=end.tm_min, seconds=end.tm_sec).total_seconds()

    difference = end_seconds - start_seconds
    if (difference < 0):
        duration = (difference/3600) + 24
    else:
        duration = (difference/3600)

    feature['properties']['duration'] = duration
    distance = float(row['distance'].split(' ')[0])
    feature['properties']['distance'] = distance
    feature['properties']['speed'] = distance/duration
    try:
        bus_stops = json.loads(row['map_json_content'])
        for stop in bus_stops:
            coordinates = [float(stop['latlons'][1]), float(stop['latlons'][0])]
            feature['geometry']['coordinates'].append(coordinates)
        newrow['features'].append(feature)
    except:
        pass

print json.dumps(newrow)
