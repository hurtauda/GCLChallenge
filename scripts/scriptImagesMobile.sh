#!/bin/bash
convert $1 -scale 320x128\> $2
jpegtran -copy none -optimize -progressive -outfile $2 $2
