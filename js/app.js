//Step 1 Define Global Variables


//Step 2 Define Functions
function getRequestYoutube(searchTerm) {
    var searchTerm = (searchTerm + " lesson");
    var params = {
        q: searchTerm,
        part: 'snippet',
        order: 'relevance',
        maxResults: 9,
        key: 'AIzaSyCHXrCpLMW0YYC6gQeu1jPxZZDwJwPEW3c'
    };
    url = 'https://www.googleapis.com/youtube/v3/search';

    $.getJSON(url, params, function (data) {
        // console.log(data.items);
        showResultsYoutube(data.items);
    });

};

function showResultsYoutube(videos) {
    var htmlOutput = "";
    $.each(videos, function (index, value) {
        //console.log(value.snippet.title);
        //console.log(value.snippet.description);
        // console.log(value.id.videoId);

        htmlOutput += '<div class="result-box col-sm-6 col-md-4">';
        htmlOutput += '<div class="thumbnail"><img src = "' + value.snippet.thumbnails.high.url + '"/></div>';
        htmlOutput += '<div class="caption"><h3>' + value.snippet.title + '</h3>';
        htmlOutput += '<a href="http://www.youtube.com/watch?v=' + value.id.videoId + '" target = "blank" class="watchButton btn btn-default" role="button">Watch</a></div></div>';
    });



    $('#youtubeDisplay').html(htmlOutput);
}
//--------------------------------------------------------
//GoogleBooks functionality
function getRequestBooks(searchTerm) {
    var searchTerm = ("learn" + searchTerm);
    var params = {
        q: searchTerm,
        key: 'AIzaSyCHXrCpLMW0YYC6gQeu1jPxZZDwJwPEW3c'
    };
    url = 'https://www.googleapis.com/books/v1/volumes';

    $.getJSON(url, params, function (data) {
        // console.log(data);
        showResultsBooks(data);
    });
}

function showResultsBooks(books) {
    // console.log(item);
    var htmlOutput = "";
    $.each(books.items, function (index, value) {
        //  console.log(value.volumeInfo);
        htmlOutput += '<div class="result-box col-sm-6 col-md-4">';
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
        htmlOutput += '<a href="' + value.volumeInfo.previewLink + '" target= "blank" class="btn btn-default moreInfoButton" role="button">More Info...</a></div></div>';

    });
    $('#bookDisplay').html(htmlOutput);

}

//-------------------------------------------------------------------------
/*//Meetup Functionality

function getRequestMeetup(searchTerm) {

    //Get event data
    /* var params = {
         //lat: position.coords.latitude,
         //lng: position.coords.longitude,
         zip: 97210,
         sign: 'true',
         topic: searchTerm,

         page: 9,
         key: '6943e383c297e4f225377c3368d48'
     };

     url = 'http://api.meetup.com/events?';
     $.getJSON(url, params, function (data) {
         var meetup_events = []
         $.each(data.results, function (index, val) {
             var parsed = {
                 'event_url': val.event_url,
                 'event_desc': val.description,
                 'venue': val.venue_address1,
                 'time': val.time,
                 'name': val.name,
                 'price': val.fee
             }
             meetup_events.push(parsed);
         })
         console.log(meetup_events);
     })*/
/* var params = {
        sign: 'true',
        groupUrlName: 'bitmakerlabs',
        page: 20,
        key: '6943e383c297e4f225377c3368d48',
        callback: '?'
    }
    url = 'https://api.meetup.com/events?'
    $.getJSON(url, params, function (data) {
        var meetup_events = []
        $.each(data.results, function (index, val) {
            var parsed = {
                'event_url': val.event_url,
                'event_desc': val.description,
                'venue': val.venue_address1,
                'time': val.time,
                'name': val.name,
                'price': val.fee
            }
            meetup_events.push(parsed);
        })
        console.log(meetup_events);
    })


}*/

//-------------------------------------------------------------------------


$(document).ready(function () {

    //Use Functions
    //start search
    $('#search').click(function (event) {
        event.preventDefault();
        var searchTerm = $('#userInput').val();
        $('.start').hide();


        //alert("I have clicked on search");

        getRequestYoutube(searchTerm);
        getRequestBooks(searchTerm);
        // getRequestMeetup(searchTerm)
        //searchLocations(searchTerm);
    });




});
