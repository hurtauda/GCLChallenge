#!/bin/bash
cd /var/www/ca600820cc/
#cd /Users/hurtauda/GCLChallenge/GCLChallenge
echo "[]" > desktop_images.json
echo "[]" > mobile_images.json

rm img/d/serv/*
rm img/m/serv/*


for file in /var/www/gclcimages/*; do
#for file in /Users/hurtauda/GCLChallenge/GCLChallenge/gclcimages/*; do
        filename=$(basename "$file")
        extension="${filename##*.}"

    	if [[ $extension == "png" ]] || [[ $extension == "jpg" ]] || [[ $extension == "jpeg" ]]
    	then
    	    /usr/bin/convert $file -scale 900x360\> img/d/serv/$filename
    	    /usr/bin/convert $file -scale 320x128\> img/m/serv/$filename
    	    jpegtran -copy none -optimize img/d/serv/$filename
    	    jpegtran -copy none -optimize img/d/serv/$filename
    	elif [[ $extension == "prop" ]]
        then
            cp "${file}" img/d/serv/$filename
            cp "${file}" img/m/serv/$filename
    	fi

    	rm /tmp/magick-*
done

/usr/bin/php scripts/makejson.php