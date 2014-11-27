<?php

define('DESKTOP_FILE', __DIR__.'/desktop_images.json');
define('MOBILE_FILE', __DIR__.'/mobile_images.json');

require_once 'lib/Mobile_Detect.php';

$mobileDetect = new Mobile_Detect();

$path = $mobileDetect->isMobile() ? MOBILE_FILE : DESKTOP_FILE;

readfile($path);