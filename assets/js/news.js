'use strict'

var newsContainer = $('#newsContainer');

var jqxhr = $.get( "newsFeed/index.php")
    .done(function(newsFeed) {
        // Make sure the news eed has been received
        if (newsFeed['status'] === 'ok') {
            var newsList = newsFeed['articles'];

            for (var news in newsList) {
                var currentNews = newsList[news];

                // Get news info
                var title = currentNews['title'];
                var imageUrl = currentNews['urlToImage'];
                var description = currentNews['description'];
                var author = currentNews['author'];
                var publishDate = currentNews['publishedAt'];
                var newsUrl = currentNews['url'];

                // Define the HTML structure
                var image = '<img src="' + imageUrl + '" width="172.767" height="97.1667"></img>';
                var descriptionText = '<p>' + description + '</p>';
                var toolBar = '<div>By <span>' + author + '</span> | <span>' + moment(publishDate).format('DD.MM.YYYY'); + '</span></div>';

                // Feed the HTML with news
                newsContainer.append('<div class="news">' + image + descriptionText + toolBar + '</div>');
            }
        }
    })
    .fail(function() {
        alert( "error" );
    })