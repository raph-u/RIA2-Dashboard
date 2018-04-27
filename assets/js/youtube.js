'use strict'

var youtubeContainer = $('#youtubeContainer');

var jqxhr = $.get( "youtubeFeed/index.php")
    .done(function(youtubeFeed) {

        // console.log(youtubeFeed);

        for (var video in youtubeFeed.items) {
            var currentVideo = youtubeFeed.items[video];
            
            var snippet = currentVideo.snippet; // Node holding most of the info needed
            var details = currentVideo.contentDetails; // Holds publish date and video id
            var thumbnailData = snippet.thumbnails.default; // Contains URL and dimensions
            var thumbnailURL = thumbnailData.url;
            var thumbnailWidth = thumbnailData.width;
            var thumbnailHeight = thumbnailData.height;
            var title = snippet.title;
            var publishDate = details.videoPublishedAt;
            var videoId = details.videoId; // Used to build the video URL

            // Build the video HTML structure
            var thumbnail = '<a href="https://www.youtube.com/watch?v=' + videoId +'"><img src="' + thumbnailURL + '"></img></a>';
            var mainContent = '<div><p>' + title + '</div>';
            var toolBar = '<div>Published at: ' + moment(publishDate).format('DD.MM.YYYY') + '</div>';

            youtubeContainer.append('<div class="video">' + thumbnail + mainContent + toolBar + '</div>');
        }
    })
    .fail(function(test) {
        console.log(test);
        alert( "Youtube error" );
    })