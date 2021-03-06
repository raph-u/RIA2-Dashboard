'use strict'

var tweetContainer = $('#tweetContainer');

var jqxhr = $.get( "twitterFeed/index.php")
    .done(function(tweetFeed) {

        for (var tweet in tweetFeed) {
            var tweetData = tweetFeed[tweet];
            // console.log(tweetData);

            var profilePictureUrl = tweetFeed[tweet]['user']['profile_image_url_https'];

            var favoriteCount = tweetFeed[tweet]['favorite_count'];
            var retweetCount = tweetFeed[tweet]['retweet_count'];

            // TODO handle twitter videos

            var pic = undefined; // Holds the tweet pic, if any
            var media = null;
            var actualPicture = '';
            var tweetUrl = tweetData['url'];

            var extendedEntities = tweetFeed[tweet]['extended_entities'];
            var entities = tweetFeed[tweet]['entities'];

            // Are there extended entities ?
            if (extendedEntities !== undefined) {
                // Wheat about medias ?
                if (extendedEntities['media'] !== undefined) {
                    media = extendedEntities['media'][0];
                    // Is the media a picture or video (thubmnail preview atm for performances reasons) ?
                    if (media.type === 'photo' || media.type === 'video') {
                        pic = media.media_url;
                        // console.log('pic', pic);
                    }
                }
            }
            
            // Define the tweet URL
            if (entities !== undefined) {
                if (entities['media'] !== undefined)
                    tweetUrl = entities['media'][0]['url'];
            }

            // Define the picture html
            if (pic !== undefined) {
                actualPicture = '<img src="' + pic + '" width=' + media.sizes.small.w / 2 + ' height=' + media.sizes.small.h  / 2 + '></img>';
            }

            // Build the profile picture
            var posterPic = '<img src="' + profilePictureUrl + '"></img>';
            // Contains the tweets text
            var topContent = '<div class="topTweetInfo">' + posterPic + '<a href="' + tweetUrl + '" target="_blank" class="pinkable">' + tweetData['text'] + '</a></div>';
            // Contains tweet pictures / videos
            var mediaContainer = '<div class="tweetMedia"><a href="' + tweetUrl + '" target="_blank" class="pinkable">' + actualPicture + '</a></div>'
            // Contains retweet count, favorite count
            var toolBar = '<div class="tweetInfo">retweet: <span class="pink">' + retweetCount + '</span> | favorite: <span class="pink">' + favoriteCount + '</span></div>';

            tweetContainer.append('<div class="tweet feedTile">' + topContent + mediaContainer + toolBar + '</div>');
        }
    })
    .fail(function() {
        alert( "error" );
    })