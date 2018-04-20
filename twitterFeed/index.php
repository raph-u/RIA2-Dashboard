<?php
    include '../functions.php';

    $config = loadConfig();

    $tweeterConfig = $config['tweeter']['keys'];

    $consumerKey = $tweeterConfig['consumerKey'];
    $consumerSecret = $tweeterConfig['consumerSecret'];

    // Bearer token creation

    // Encode consumer key and secret
    $encodedConsumerKey = urlencode($consumerKey);
    $encodedConsumerSecret = urlencode($consumerSecret);

    $concatenatedKey = $encodedConsumerKey . ':' . $encodedConsumerSecret;
    $base64Key = base64_encode($concatenatedKey);

    // Build the request
    $tokenUrl = 'https://api.twitter.com/oauth2/token';
    $tokenHeaders = [
        'header'  => "Content-type: application/x-www-form-urlencoded;charset=UTF-8\r\n"
        . "Authorization: Basic $base64Key\r\n",
        'content' => 'grant_type=client_credentials'
    ];

    // Request the bearer token
    $tokenResponse = request('POST', $tokenUrl, $tokenHeaders);

    // Making sure the value associated with the token_type key is bearer, according to twitter's recommandation
    if ($tokenResponse['token_type'] === 'bearer') {
        $token = $tokenResponse['access_token'];

        // Build and send a request to fetch the tweeter feed
        $feedUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=100&screen_name=verge';
        $feedHeaders = [
            'header'  => "Authorization: Bearer $token \r\n"
        ];

        $feed = request('GET', $feedUrl, $feedHeaders);

        // Making sure we received the twitter feed
        if ($feed !== false) {
            // Return the JSON feed as content for this page
            header('Content-Type: application/json');
            echo json_encode($feed);
        }
    }
?>
