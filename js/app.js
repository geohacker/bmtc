$(document).ready(function () {

	var map = L.map('map').setView([13.0000,77.5833], 13);

	L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, <a href="http://mapquest.com">MapQuest</a>, <a href="http://openbangalore.org">Open Bangalore</a>',
		maxZoom: 18,
		subdomains: ['otile1', 'otile2', 'otile3']
	}).addTo(map);

    var geojsonMarkerOptions = {
        radius: 2,
        fillColor: "#000",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    var busstopsSearch = [];
    var busstopsLayer = L.geoJson(busstops, {
      pointToLayer: function(feature, latlng) {
       return L.circleMarker(latlng, geojsonMarkerOptions);
   },
   onEachFeature: function (feature, layer) {
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name, {
            closeButton: false
        });
    };
    busstopsSearch.push({
        name: layer.feature.properties.name,
        source: "Busstops",
        id: L.stamp(layer),
        bounds: layer.getBounds()
    });
}
}).addTo(map);

    var busstopsBH = new Bloodhound({
        name: "Busstops",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: busstopsSearch,
        limit: 10
    });

    var geonamesBH = new Bloodhound({
        name: "GeoNames",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: "http://api.geonames.org/searchJSON?username=geohacker&maxRows=5&countryCode=IN&name_startsWith=%QUERY",
            filter: function (data) {
                return $.map(data.geonames, function (result) {
                    return {
                        name: result.name + ", " + result.adminCode1,
                        lat: result.lat,
                        lng: result.lng,
                        source: "GeoNames"
                    };
                });
            },
            ajax: {
                beforeSend: function (jqXhr, settings) {
                    settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
                    $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
                },
                complete: function (jqXHR, status) {
                    $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
                }
            }
        },
        limit: 10
    });
busstopsBH.initialize();
geonamesBH.initialize();

// instantiate the typeahead UI
$("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
}, {
    name: "Busstops",
    displayKey: "name",
    source: busstopsBH.ttAdapter(),
    templates: {
        header: "<h4 class='typeahead-header'>Bus Stops</h4>"
    }
},  {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
        header: "<h4 class='typeahead-header'>Neighborhood</h4>"
    }
}).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Busstops") {
        map.fitBounds(datum.bounds);
        // if (map._layers[datum.id]) {
            // map._layers[datum.id].fire("click");
        // };
    };
    if (datum.source === "GeoNames") {
        map.setView([datum.lat, datum.lng], 15);
    };
    if ($(".navbar-collapse").height() > 50) {
        $(".navbar-collapse").collapse("hide");
    };
}).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
}).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
});
$(".twitter-typeahead").css("position", "static");
$(".twitter-typeahead").css("display", "block");

});