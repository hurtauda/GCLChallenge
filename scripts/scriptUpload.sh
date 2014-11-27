#!/bin/bash
/bin/sh scripts/scriptImages.sh $1 $2
/bin/sh scripts/scriptImagesMobile.sh $1 $2
rm $1
