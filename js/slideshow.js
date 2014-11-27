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
    var button = document.getElementById("pauseButton");
    if(!window.paused) {
        clearInterval(switching);
        button.value = "Play";
    } else {
        switching = setInterval("toggleSlide(true)", interval);
        button.value = "Pause";
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

function getVisible(elements) {
    for(var i = 0; i < elements.length; ++i) {
        if(elements[i].style.display == "block") {
            return i;
        }
    }
    return -1;
}

function prev(num, arrayLength) {
    return (num == 0) ? arrayLength - 1 : num - 1;
}

function next(num, arrayLength) {
    return (num == arrayLength-1) ? 0 : num + 1;
}

function goToEdge(where) {
    var elements = document.getElementsByClassName(hideable);
    var sn = document.getElementById(slideNumber);
    var visibleID = getVisible(elements);

    elements[visibleID].style.display = "none";
    if(!where) {
        elements[0].style.display = "block";
        sn.innerHTML = 1;
        colorBulletPoints(0);
    } else {
        elements[elements.length-1].style.display = "block";
        sn.innerHTML = elements.length;
        colorBulletPoints(elements.length-1);
    }
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
    otherBulletPoint.style.background = "green";
}

function goToImage(selectedId){
    var elements = document.getElementsByClassName(hideable); // gets all the "slides" in our slideshow
    var slideNumberElement = document.getElementById(slideNumber)
    var visibleID = getVisible(elements);
    elements[visibleID].style.display = "none"; // hide the currently visible LI
    elements[selectedId].style.display = "block"; // show the slide
    slideNumber.innerHTML = (selectedId + 1);
    colorBulletPoints(selectedId);
}

function colorBulletPoints(selectedId){
    var currentPoint = document.getElementById("point"+selectedId);
    for(var i = 0; i < getTotalNbSlide(); ++i) {
        var otherBulletPoint = document.getElementById("point"+i);
        otherBulletPoint.style.background = "black";
    }
    currentPoint.style.background = "green";
}

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
            slideshow_ulElement.addEventListener('touchstart', function() {
                toggleInterval(false);
            });
            slideshow_ulElement.addEventListener('touchend', function() {
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

            var slideshow_navbarElement = document.getElementById('slideshow-navbar');
            var navItems = slideshow_navbarElement.children;

            for (var i = 0; i < navItems.length; ++i) {
                navItems[i].removeAttribute('disabled');
            }

        }
    }
    xhr.open("GET", "get-images.php", true);
    xhr.send();
});
