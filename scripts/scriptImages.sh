#!/bin/bash
convert $1 -scale 900x360\> $2
jpegtran -copy none -optimize -progressive -outfile $2 $2
