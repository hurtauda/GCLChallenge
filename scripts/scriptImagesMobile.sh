#!/bin/bash
/opt/local/bin/convert $1 -scale 320x128\> upload/m$2
/opt/local/bin/jpegtran -copy none -optimize -progressive -outfile img/m/user/$2 upload/m$2
rm upload/m$2