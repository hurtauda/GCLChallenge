#!/bin/bash
/opt/local/bin/convert $1 -scale 900x360\> upload/d$2
/opt/local/bin/jpegtran -copy none -optimize -progressive -outfile img/d/user/$2 upload/d$2
rm upload/d$2
php scripts/makejson.php