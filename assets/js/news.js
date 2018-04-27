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
                var image = '<a href="' + newsUrl + '" target="_blank"><img src="' + imageUrl + '" width="345" height="195"></img></a>';
                var titleText = '<a href="' + newsUrl + '" class="pinkable" target="_blank">' + title + '</a>';
                var toolBar = '<div class="authInfo">By <span class="pink">' + author + '</span>'; // | <span>' + moment(publishDate).format('DD.MM.YYYY'); + '</span></div>
                var textualContent = '<div class="tileText">' + titleText + toolBar + '</div>';

                // Feed the HTML with news
                newsContainer.append('<div class="news feedTile rowTile newsTile">' + image + textualContent + '</div>');
            }
        }
    })
    .fail(function() {
        alert( "error" );
    })