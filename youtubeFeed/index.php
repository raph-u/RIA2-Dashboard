<?php
    include '../functions.php';

    $config = loadConfig();

    $apiKey = $config['youtube']['apiKey'];

    // Fetch the upload playlist id so we can fetch related videos
    $channelRequestURL = 'https://www.googleapis.com/youtube/v3/channels'
        . '?key=' . $apiKey
        . '&part=contentDetails&forUsername=TheVerge';

    $channelInfo = request('GET', $channelRequestURL);

    $mainItem = $channelInfo['items'][0];
    $channelPlaylists = $mainItem['contentDetails']['relatedPlaylists'];
    $uploadsPlayListId = $channelPlaylists['uploads'];
    
    // Did we receive the upload playlist id ?
    if ($uploadsPlayListId !== false) {
        // Fetch the videos uploaded to the channel
        $channelVideosURL = 'https://www.googleapis.com/youtube/v3/playlistItems'
        . '?key=' . $apiKey
        . '&part=snippet,contentDetails'
        . '&maxResults=10'
        . '&playlistId=' . $uploadsPlayListId;

        $channelVideos = request('GET', $channelVideosURL);

        // Making sure we received the list of videos
        if ($channelVideos !== false) {
            header('Content-Type: application/json');
            echo json_encode($channelVideos);
        }
    }
?>
