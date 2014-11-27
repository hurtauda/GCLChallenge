#!/bin/bash
/usr/bin/convert $1 -scale 320x128\> img/m/user/$2 #upload/m$2
#/usr/bin/jpegtran -copy none -optimize -progressive -outfile img/m/user/$2 upload/m$2
#rm upload/m$2