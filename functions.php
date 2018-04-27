<?php
    function loadConfig() {
        $jsonPath = __DIR__ . '/config.json';

        $jsonContent = file_get_contents($jsonPath);

        if ($jsonContent !== false) {
            $config = json_decode($jsonContent, true);
            return $config;
        }
    }

    function request($type, $url, $headerData = null) {
        $options= array(
            'http' => array(),
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false
            )
        );
        if ($headerData !== null)
            $options['http'] = $headerData;
        // Define the nature of the request GET, POST, etc.
        $options['http']['method'] = $type;

        // Make the request
        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        if ($result === FALSE) {
           return json_encode("{\"error\": \"Request error...\"}");
        } else {
            return json_decode($result, true);
        }

        return false;
    }
?>