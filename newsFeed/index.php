<?php
    include '../functions.php';

    $config = loadConfig();

    $apiKey = $config['news']['apiKey'];

    // String identifying the verge as a news source on news API
    $vergeId = 'the-verge';

    $newsUrl = 'https://newsapi.org/v2/everything?sources=' . $vergeId . '&sortBy=publishedAt';
    $newsHeaders = [
        'header'  => "X-Api-Key: $apiKey \r\n"
    ];

    $news = request('GET', $newsUrl, $newsHeaders);

    // Making sure we received the news feed
    if ($news !== false) {
        header('Content-Type: application/json');
        echo json_encode($news);
    }
?>
