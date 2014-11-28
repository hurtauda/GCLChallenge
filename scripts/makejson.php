<?php
$it = new RecursiveDirectoryIterator("img/d");
$desktop = array();
$mobile = array();
foreach(new RecursiveIteratorIterator($it) as $file) {
    $extension = strtolower($file->getExtension());
    if ($extension === 'jpg' || $extension === 'jpeg' || $extension === 'png') {
        $image = array('src' => $file->getPathname(), 'desc' => '');

        $propertyFilePath = $file->getPath() . '/' . $file->getBasename('.' . $file->getExtension()) . '.prop';
        if (file_exists($propertyFilePath)) {
            $file = file($propertyFilePath);
            foreach ($file as $lineContent) {
                if (substr($lineContent, 0, 12) === "Description=") {
                    $image['desc'] = substr($lineContent, 12);
                    break;
                }
            }
        }

        $desktop[] = $image;
    }
}

$it = new RecursiveDirectoryIterator("img/m");
foreach(new RecursiveIteratorIterator($it) as $file) {
    $extension = strtolower($file->getExtension());
    if ($extension === 'jpg' || $extension === 'jpeg' || $extension === 'png') {
        $image = array('src' => $file->getPathname(), 'desc' => '');

        $propertyFilePath = $file->getPath() . '/' . $file->getBasename('.' . $file->getExtension()) . '.prop';
        if (file_exists($propertyFilePath)) {
            $file = file($propertyFilePath);
            foreach ($file as $lineContent) {
                if (substr($lineContent, 0, 12) === "Description=") {
                    $image['desc'] = substr($lineContent, 12);
                    break;
                }
            }
        }

        $mobile[] = $image;
    }
}

$desktopjson = fopen('desktop_images.json', 'w');
fputs($desktopjson, json_encode($desktop)); // On écrit le nouveau nombre de pages vues
fclose($desktopjson);

$mobilejson = fopen('mobile_images.json', 'w');
fputs($mobilejson, json_encode($mobile)); // On écrit le nouveau nombre de pages vues
fclose($mobilejson);