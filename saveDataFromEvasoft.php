<?php

header("Access-Control-Allow-Origin: https://innergy.xn--80ad1blgl2d.xn--p1ai");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $emailPhone = isset($_POST['emailPhone']) ? $_POST['emailPhone'] : '';

    if (!empty($name) && !empty($emailPhone)) {
        $file = 'data.txt';

        $currentDateTime = date('Y-m-d H:i:s');

        $data = "Date/Time: $currentDateTime, Name: $name, Email/Phone: $emailPhone" . PHP_EOL;

        if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {
            echo "Данные успешно записаны.";
        } else {
            echo "Ошибка при записи данных.";
        }
    } else {
        echo "Пожалуйста, укажите оба параметра: name и emailPhone.";
    }
} else {
    echo "Используйте метод POST для отправки данных.";
}
?>
