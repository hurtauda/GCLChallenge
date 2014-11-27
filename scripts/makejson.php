<?php
$it = new RecursiveDirectoryIterator("img/d");
$desktop = array();
$mobile = array();
foreach(new RecursiveIteratorIterator($it) as $file) {
    if($file->isFile()) {
        array_push($desktop, $file->getPathname());
    }
}

$it = new RecursiveDirectoryIterator("img/m");
foreach(new RecursiveIteratorIterator($it) as $file) {
    if($file->isFile()) {
        array_push($mobile, $file->getPathname());
    }
}

$desktopjson = fopen('desktop_images.json', 'w');
fputs($desktopjson, json_encode($desktop)); // On écrit le nouveau nombre de pages vues
fclose($desktopjson);

$mobilejson = fopen('mobile_images.json', 'w');
fputs($mobilejson, json_encode($mobile)); // On écrit le nouveau nombre de pages vues
fclose($mobilejson);