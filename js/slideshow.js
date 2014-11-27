var interval = 3000; // You can change this value to your desired speed. The value is in milliseconds, so if you want to advance a slide every 5 seconds, set this to 5000.
var switching = setInterval("toggleSlide(true)", interval);

var slideNumber = "slideNumber";
var hideable = "hideable";
var totalSlide = "totalSlide";

window.paused = false;

function toggleInterval() {
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
    var visibleID = getVisible(elements);

    elements[visibleID].style.display = "none"; // hideable the currently visible LI
    if(!direction) {
        var makeVisible = prev(visibleID, elements.length); // get the previous slide
    } else {
        var makeVisible = next(visibleID, elements.length); // get the next slide
    }
    elements[makeVisible].style.display = "block"; // show the previous or next slide
    colorBulletPoints(makeVisible);
    document.getElementById(slideNumber).innerHTML = (makeVisible + 1);
}

function getVisible(elements) {
    for(var i = 0; i < elements.length; i++) {
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
    var visibleID = getVisible(elements);

    var sn = document.getElementById(slideNumber);
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
    document.getElementById(slideNumber).innerText = getVisible(elements) + 1;
}

function getTotalNbSlide() {
    return document.getElementsByClassName(hideable).length;
}
function setTotalSlide() {
    document.getElementById(totalSlide).innerText = getTotalNbSlide();
}

function setBulletPoints() {
    var ul = document.getElementById("bulletPoints");
    var nbPoints = getTotalNbSlide();
    for(var i = 0; i < nbPoints; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        ul.appendChild(li);
        a.appendChild(document.createTextNode(i));
        a.setAttribute("onClick","goToImage("+i+")")
        a.setAttribute("id", "point"+i);
        a.setAttribute("style","cursor:pointer;background: green;");
        li.appendChild(a);
    }
}

function goToImage(selectedId){
    var elements = document.getElementsByClassName(hideable); // gets all the "slides" in our slideshow
    var visibleID = getVisible(elements);
    elements[visibleID].style.display = "none"; // hide the currently visible LI
    elements[selectedId].style.display = "block"; // show the slide
    document.getElementById(slideNumber).innerHTML = (selectedId + 1);
    colorBulletPoints(selectedId);
}

function colorBulletPoints(selectedId){
    var currentPoint = document.getElementById("point"+selectedId);
    for(var i = 0; i < getTotalNbSlide(); i++) {
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
                if (key == 0) {
                    li.setAttribute('style', 'display: block;');
                }

                var img = document.createElement('img');
                img.setAttribute("src", images[key]);

                li.appendChild(img);
                document.getElementById('slideshow-ul').appendChild(li);
            }
            initSlideshow();
        }
    }

    xhr.open("GET", "get-images.php", true);
    xhr.send();
});
