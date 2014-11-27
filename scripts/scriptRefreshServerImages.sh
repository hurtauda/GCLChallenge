#!/bin/bash
cd /var/www/ca600820cc/
#cd /Users/hurtauda/GCLChallenge/GCLChallenge
echo "[]" > desktop_images.json
echo "[]" > mobile_images.json

rm img/d/serv/*
rm img/m/serv/*


for file in /var/www/gclcimages/*; do
#for file in /Users/hurtauda/GCLChallenge/GCLChallenge/gclcimages/*; do
        filename=$(basename $file)
    	/usr/bin/convert $file -scale 900x360\> img/d/serv/$filename #upload/d$filename
        #/usr/bin/jpegtran -copy none -optimize -progressive -outfile img/d/serv/$filename upload/d$filename
        #rm upload/d$filename

        /usr/bin/convert $file -scale 320x128\> img/m/serv/$filename #upload/m$filename
        #/usr/bin/jpegtran -copy none -optimize -progressive -outfile img/m/serv/$filename upload/m$filename
        #rm upload/m$filename
done

/usr/bin/php scripts/makejson.php