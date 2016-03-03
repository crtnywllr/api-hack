$(function () {
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
        $('.start').hide();
        $('.youtube-results').show();
        $('.new-search').show();
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






    //start search
    $('#search').click(function (event) {
        event.preventDefault();
        var searchTerm = $('#userInput').val();
        $("#youtubeDisplay").empty();

        //alert("I have clicked on search");

        getRequestYoutube(searchTerm);
        getRequestBooks(searchTerm);
    });

    //subsquent searches
    $('#new-search').click(function (event) {
        event.preventDefault();
        var searchTerm = ($('#newUserInput').val() + " lesson");


        //alert("I have clicked on new-search");

        getRequestYoutube(searchTerm);
        getRequestBooks(searchTerm);
    });

});
