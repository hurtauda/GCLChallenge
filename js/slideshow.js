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
    } else {
        elements[elements.length-1].style.display = "block";
        sn.innerHTML = elements.length;
    }
}

function initSlideshow() {
    setSlideNumber();
    setTotalSlide();
}

function setSlideNumber() {
    var elements = document.getElementsByClassName(hideable);
    document.getElementById(slideNumber).innerText = getVisible(elements) + 1;
}

function setTotalSlide() {
    document.getElementById(totalSlide).innerText = document.getElementsByClassName(hideable).length;
}