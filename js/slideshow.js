"use strict";
var interval = 3000; // You can change this value to your desired speed. The value is in milliseconds, so if you want to advance a slide every 5 seconds, set this to 5000.
var switching;
var slideNumber = "slideNumber";
var hideable = "hideable";
var totalSlide = "totalSlide";
var transition = true;

window.paused = true;

function toggleInterval(paused) {
    if (paused !== undefined) {
        window.paused = paused;
    }
    var buttonPause = document.getElementById("slideshow-pause");
    if(!window.paused) {
        clearInterval(switching);
        buttonPause.backgroundPosition = "-50px 0px";
        console.log("Stop!");
    } else {
        switching = setInterval("toggleSlide(true)", interval);
        buttonPause.backgroundPosition = "0px 0px";
        console.log("Play!");
    }
    window.paused = !(window.paused);
}

// direction = boolean value: true or false. If true, go to NEXT slide; otherwise go to PREV slide
function toggleSlide(direction) {
    var elements = document.getElementsByClassName(hideable); // gets all the "slides" in our slideshow
    var slideNumberElement=document.getElementById(slideNumber);
    var visibleID = getVisible(elements);

    elements[visibleID].style.display = "none"; // hideable the currently visible LI
    if(!direction) {
        var makeVisible = prev(visibleID, elements.length); // get the previous slide
    } else {
        var makeVisible = next(visibleID, elements.length); // get the next slide
    }

    elements[makeVisible].style.display = "block"; // show the previous or next slide
    if (transition) {
        transitionSlide(visibleID, makeVisible);
    }
    colorBulletPoints(makeVisible);

    slideNumberElement.innerHTML = makeVisible+1;
}

function transitionSlide(from, to) {
    setTimeout(function() {
        var oldImage = document.getElementById(from).children[0];
        var newImage = document.getElementById(to).children[0];
        oldImage.setAttribute("class", "tr");
        newImage.setAttribute("class", "tr opaque");
    }, 15);
}

function changeTransition() {
    transition = !transition;
    resetImageClass(transition);
}

//boolean : true for the transition, false without
function resetImageClass(which) {
    var nbPoints = getTotalNbSlide();
    var image;
    for(var i = 0; i < nbPoints; ++i) {
        image = document.getElementById(i).children[0];
        if (which) {
            image.setAttribute('class', 'tr');
        } else {
            image.removeAttribute('class');
        }
    }
}

function getVisible(elements) {
    for(var i = 0; i < elements.length; ++i) {
        if(elements[i].style.display === "block") {
            return i;
        }
    }
    return -1;
}

function prev(num, arrayLength) {
    return (num === 0) ? arrayLength - 1 : num - 1;
}

function next(num, arrayLength) {
    return (num === arrayLength-1) ? 0 : num + 1;
}

function initSlideshow() {
    setSlideNumber();
    setTotalSlide();
    setBulletPoints();
}

function setSlideNumber() {
    var elements = document.getElementsByClassName(hideable);
    var slideNumberElement = document.getElementById(slideNumber);
    slideNumberElement.innerText = getVisible(elements) + 1;
}

function getTotalNbSlide() {
    var hideableElement = document.getElementsByClassName(hideable);
    return hideableElement.length;
}

function setTotalSlide() {
    var totalSlideElement = document.getElementById(totalSlide);
    totalSlideElement.innerText = getTotalNbSlide();
}

function setBulletPoints() {
    var ul = document.getElementById("bulletPoints");
    ul.innerHTML = "";
    var nbPoints = getTotalNbSlide();

    for(var i = 0; i < nbPoints; ++i) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        ul.appendChild(li);
        a.setAttribute("onClick","goToImage("+i+")");
        a.setAttribute("id", "point"+i);
        li.appendChild(a);
    }
    var otherBulletPoint = document.getElementById("point0");
    otherBulletPoint.style.background = "#7CB17D";
}

function goToImage(selectedId){
    var elements = document.getElementsByClassName(hideable); // gets all the "slides" in our slideshow
    var slideNumberElement = document.getElementById(slideNumber)
    var visibleID = getVisible(elements);
    elements[visibleID].style.display = "none"; // hide the currently visible LI
    elements[selectedId].style.display = "block"; // show the slide
    slideNumberElement.innerHTML = (selectedId + 1);
    colorBulletPoints(selectedId);
}

function colorBulletPoints(selectedId){
    var currentPoint = document.getElementById("point"+selectedId);
    for(var i = 0; i < getTotalNbSlide(); ++i) {
        var otherBulletPoint = document.getElementById("point"+i);
        otherBulletPoint.style.background = "black";
    }
    currentPoint.style.background = "#7CB17D";
}

function detectswipe(el,func) {
    var swipe_det = new Object();
    swipe_det.sX = 0;
    swipe_det.sY = 0;
    swipe_det.eX = 0;
    swipe_det.eY = 0;
    var min_x = 20;  //min x swipe for horizontal swipe
    var max_x = 40;  //max x difference for vertical swipe
    var min_y = 40;  //min y swipe for vertical swipe
    var max_y = 50;  //max y difference for horizontal swipe
    var direc = "";
    var ele = document.getElementById(el);
    ele.addEventListener('touchstart',function(e){
        var t = e.touches[0];
        swipe_det.sX = t.screenX;
        swipe_det.sY = t.screenY;
    },false);
    ele.addEventListener('touchmove',function(e){
        e.preventDefault();
        var t = e.touches[0];
        swipe_det.eX = t.screenX;
        swipe_det.eY = t.screenY;
    },false);
    ele.addEventListener('touchend',function(e){
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
            if(swipe_det.eX > swipe_det.sX) direc = "r";
            else direc = "l";
        }
        //vertical detection
        if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
            if(swipe_det.eY > swipe_det.sY) direc = "d";
            else direc = "u";
        }

        if (direc != "") {
            if(typeof func == 'function') func(el,direc);
        }
        direc = "";
    },false);
}

function swipeListener(el,d) {
    if (d === "l"){
        toggleSlide(true);
    } else{
        toggleSlide(false)
    }
}

detectswipe('slideshow-ul',swipeListener);

document.addEventListener("DOMContentLoaded", function(event) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            var images = JSON.parse(xhr.responseText);
            for (var key in images) {
                var li = document.createElement('li');
                li.setAttribute('id', key);
                li.setAttribute('class', 'hideable');

                var img = document.createElement('img');
                img.setAttribute("src", images[key]);

                if (key == 0) {
                    li.setAttribute('style', 'display: block;');
                    if (transition) {
                        img.setAttribute('class', 'tr opaque');
                    }
                } else {
                    li.setAttribute('style', 'display: none;');
                    if (transition) {
                        img.setAttribute('class', 'tr');
                    }
                }

                li.appendChild(img);
                var slideshow_ulElement = document.getElementById('slideshow-ul');
                slideshow_ulElement.appendChild(li);
            }
            initSlideshow();
            toggleInterval();

            slideshow_ulElement = document.getElementById('slideshow-ul');
            slideshow_ulElement.addEventListener('mouseover', function() {
                toggleInterval(false);
            });
            slideshow_ulElement.addEventListener('mouseout', function() {
                toggleInterval(true);
            });

            document.onkeydown = function(e) {
                e = e || window.event;
                switch (e.which || e.keyCode) {
                    case 32:
                        toggleInterval();
                        break;

                    case 37:
                        toggleSlide(false);
                        break;

                    case 39:
                        toggleSlide(true);
                        break;
                }
            }

            /*
            var slideshow_navbar_pauseElement = document.getElementById('slideshow-navbar-pause');
            var navItemsPause = slideshow_navbar_pauseElement.children;

            for (var i = 0; i < navItemsPause.length; ++i) {
                navItemsPause[i].removeAttribute('disabled');
            }

            var slideshow_navbar_LbuttonElement = document.getElementById('slideshow-navbar-Lbutton');
            var navItemsLButton = slideshow_navbar_LbuttonElement.children;

            for (var i = 0; i < navItemsLButton.length; ++i) {
                navItemsLButton[i].removeAttribute('disabled');
            }

            var slideshow_navbar_RbuttonElement = document.getElementById('slideshow-navbar-Rbutton');
            var navItemsRButton = slideshow_navbar_RbuttonElement.children;

            for (var i = 0; i < navItemsRButton.length; ++i) {
                navItemsRButton[i].removeAttribute('disabled');
            }
            */

        }
    }
    xhr.open("GET", "get-images.php", true);
    xhr.send();
});
