//----------GoogleMaps Functionality-----------
var lat;
var lng;
var map;
var infowindow;

function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -33.8688,
            lng: 151.2195
        },
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    infowindow = new google.maps.InfoWindow();
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            lat = position.coords.latitude;
            lng = position.coords.longitude;

            infowindow.setPosition(pos);
            infowindow.setContent('Location found.');
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infowindow, map.getCenter());
        });
    } else {
        // Error if browser doesn't support Geolocation
        handleLocationError(false, infowindow, map.getCenter());
    }
    // Create the search box and link it to UI
    var input = document.getElementById('userInput');
    var searchBox = new google.maps.places.SearchBox(input);
    google.maps.event.trigger(map, 'resize');
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    // Retrieve place details
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        console.log('places should be here' + places);
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -33.8688,
                lng: 151.2195
            },
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        infowindow = new google.maps.InfoWindow();
        // Try HTML5 geolocation.
        if (places.length == 0) {
            alert('No places found');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;

                    infowindow.setPosition(pos);
                    infowindow.setContent('Location found.');
                    map.setCenter(pos);
                }, function () {
                    handleLocationError(true, infowindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infowindow, map.getCenter());
            }
        }
        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();

        places.forEach(function (place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function validatePlace(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function searchLocations(serviceType) {
    var service = new google.maps.places.PlacesService(map);
    google.maps.event.trigger(map, 'resize');
    service.nearbySearch({
        location: pos,
        radius: 100,
        types: [serviceType]
    }, validatePlace);
}

//----------YouTube Functionality--------------
function getRequestYoutube(searchTerm) {
    var searchTerm = (searchTerm + ' lesson');
    var params = {
        q: searchTerm,
        part: 'snippet',
        order: 'relevance',
        maxResults: 9,
        key: 'AIzaSyCHXrCpLMW0YYC6gQeu1jPxZZDwJwPEW3c'
    };
    url = 'https://www.googleapis.com/youtube/v3/search';
    //ajax call for data
    $.getJSON(url, params, function (data) {
        showResultsYoutube(data.items);
    });
};

function showResultsYoutube(videos) {
    var htmlOutput = '';
    //setting html to be displayed
    if (videos.length == 0) {
        htmlOutput = 'Sorry, no videos!';
    } else {
        $.each(videos, function (index, value) {
            htmlOutput += '<div class="result-box col-sm-6 col-md-4">';
            htmlOutput += '<div class="thumbnail"><img src = "' + value.snippet.thumbnails.high.url + '"/></div>';
            htmlOutput += '<div class="caption"><h3>' + value.snippet.title + '</h3>';
            htmlOutput += '<a href="http://www.youtube.com/watch?v=' + value.id.videoId + '" target = "blank" class="btn btn-default btnBottom" role="button">Watch</a></div></div>';
        });
    }
    //display returned html in UI
    $('#youtubeDisplay').html(htmlOutput);
}

//---------------GoogleBooks functionality----------
function getRequestBooks(searchTerm) {
    var searchTerm = ('learn' + searchTerm);
    var params = {
        q: searchTerm,
        maxResults: 9,
        key: 'AIzaSyCHXrCpLMW0YYC6gQeu1jPxZZDwJwPEW3c'
    };
    url = 'https://www.googleapis.com/books/v1/volumes';
    //ajax request to get data
    $.getJSON(url, params, function (data) {
        showResultsBooks(data);
    });
}

function showResultsBooks(books) {
    var htmlOutput = '';
    //setting html for display
    if (books.items == undefined) {
        var htmlOutput = 'Sorry, no books!';
    } else {
        $.each(books.items, function (index, value) {
            htmlOutput += '<div class="result-box col-sm-6 col-md-4">';
            //if data has no image, display default image
            if (value.volumeInfo.imageLinks) {
                if (value.volumeInfo.imageLinks.thumbnail.length > 0) {
                    htmlOutput += '<div class="thumbnail"><img src = "' + value.volumeInfo.imageLinks.thumbnail + '"/>';
                } else {
                    htmlOutput += '<div class="thumbnail"><img src = "images/book-default.jpg"/>';
                }
            } else {
                htmlOutput += '<div class="thumbnail"><img src = "images/book-default.jpg"/>';
            }
            htmlOutput += '</div><div class="caption"><h3>' + value.volumeInfo.title + '</h3>';
            htmlOutput += '<p>' + value.volumeInfo.authors + '</p>';
            htmlOutput += '<a href="' + value.volumeInfo.previewLink + '" target= "blank" class="btn btn-default btnBottom" role="button">More Info...</a></div></div>';

        });
    }
    //display html in UI
    $('#bookDisplay').html(htmlOutput);
}

//---------------Meetup Functionality------------

function getRequestMeetup(searchTerm, latitude, longitude) {
    var params = {
        sign: 'true',
        page: 9,
        lat: latitude,
        topic: searchTerm,
        lon: longitude,
        key: '6943e383c297e4f225377c3368d48'
    };
    //ajax call for data
    var result = $.ajax({
            url: "http://api.meetup.com/2/groups",
            data: params,
            dataType: "jsonp",
            type: "GET"
        })
        //on success, display data
        .done(function (result) {
            showResultsMeetup(result);
        })
        //on fail, show error
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function showResultsMeetup(events) {
    var htmlOutput = '';
    //set html for display
    if (events.results == undefined) {
        var htmlOutput = 'Sorry, no meetups!';
    } else {
        $.each(events.results, function (index, value) {
            htmlOutput += '<div class="result-box col-sm-6 col-md-4">';
            //if data has no image display default image
            if (value.group_photo) {
                if (value.group_photo.highres_link.length > 0) {
                    htmlOutput += '<div class="thumbnail"><img src = "' + value.group_photo.highres_link + '"/>';
                } else {
                    htmlOutput += '<div class="thumbnail"><img src = "images/meetup-default.png"/>';
                }
            } else {
                htmlOutput += '<div class="thumbnail"><img src = "images/meetup-default.png"/>';
            }
            htmlOutput += '</div><div class="caption"><h3>' + value.name + '</h3>';
            htmlOutput += '<a href="' + value.link + '" target = "blank" class="btn btn-default btnBottom" role="button">More Info</a></div></div>';
        });
    }
    //display html in UI
    $('#meetupDisplay').html(htmlOutput);
}
//-------------------------------------------------------------------------
//initialize new search on click
$(document).ready(function () {
    $('#search').click(function (event) {
        event.preventDefault();
        var searchTerm = $('#userInput').val();
        getRequestYoutube(searchTerm);
        getRequestBooks(searchTerm);
        getRequestMeetup(searchTerm, lat, lng);
        searchLocations(searchTerm);
    });
});
