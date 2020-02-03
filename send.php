<?php

$API_KEY = "618316327:AAF6k6dspDoA38xmAtKbEwK0WjAha2-wTxM";
$chat_id = -1001313631881;

$name = $_POST['name'];
$phone = $_POST['phone'];
$location = $_POST['location'];
$people_count = $_POST['people-count'];
$email = $_POST['email'];
$date_from = $_POST['date-from'];
$date_to = $_POST['date-to'];
$msg = $_POST['message'];

$message = "Имя: {$name}\n";
$message .= "Телефон: +998{$phone}\n";
$message .= "Куда: {$location}\n";
$message .= "Сколько человек: {$people_count}\n";
$message .= "Email: {$email}\n";
$message .= "От: {$date_from}\n";
$message .= "До: {$date_to}\n";
$message .= "Сообщение: {$msg}\n";

	$url = 'https://api.telegram.org/bot' . $API_KEY . '/sendMessage?';

	$fields = [
        'chat_id' => urlencode($chat_id),
        'parse_mode' => urlencode('HTML'),
        'text' => urlencode($message),
    ];

//url-ify the data for the POST
foreach ($fields as $key => $value) {
    $fields_string .= $key . '=' . $value . '&';
}
$fields_string = rtrim($fields_string, '&');

$fields_string = str_replace(' ', '', $fields_string);

//echo $fields_string;

header("Location: {$url}{$fields_string}");

?>