#!/bin/bash
/usr/bin/convert $1 -scale 900x360\> upload/d$2
/usr/bin/jpegtran -copy none -optimize -progressive -outfile img/d/user/$2 upload/d$2
rm upload/d$2
/usr/bin/php scripts/makejson.php