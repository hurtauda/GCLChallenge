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
    	/opt/local/bin/convert $file -scale 900x360\> upload/d$filename
        /opt/local/bin/jpegtran -copy none -optimize -progressive -outfile img/d/serv/$filename upload/d$filename
        rm upload/d$filename

        /opt/local/bin/convert $file -scale 320x128\> upload/m$filename
        /opt/local/bin/jpegtran -copy none -optimize -progressive -outfile img/m/serv/$filename upload/m$filename
        rm upload/m$filename
done

php scripts/makejson.php