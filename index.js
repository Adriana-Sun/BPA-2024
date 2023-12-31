var body = document.querySelector("body");
var fragment = new DocumentFragment();  // since a document fragment is emptied when added, we can reuse it

// General content slider functions
function addSliders(carousel, containerClipWidth, wrapperWidth){
    // calculating the number of button sliders needed to scroll through all of the content
    var numButtons = Math.ceil(wrapperWidth / containerClipWidth);

    if(numButtons > 1){ // if the content can't fit within the container (resulting in numButtons > 1)
        for(let i = 0; i < numButtons; i++){    // create that many buttons and append it to the doc fragment
            let sldBtn = document.createElement("button");
            sldBtn.classList.add("slider");

            if(i == 0)  // the first slider button should always have a data-slideAmt of 0px
                sldBtn.setAttribute("data-slideAmt", "0px");
            else if(i == numButtons - 1){ // the last slider button should not slide beyond the amount of items remaining
                let widthNeeded = wrapperWidth - containerClipWidth;
                sldBtn.setAttribute("data-slideAmt", (-1 * widthNeeded) + "px");
            }
            else{  // every other slider button should slide the full amount
                sldBtn.setAttribute("data-slideAmt", (-1 * containerClipWidth * i) + "px");
            }
            
            fragment.appendChild(sldBtn);
        }
        carousel.appendChild(fragment);
    }
}
function setupSliders(sliders, type){
    // setup the event listeners for each slider button
    for (let i = 0; i < sliders.length; i++) {
        var slider = sliders[i];
        slider.addEventListener('click', setClickedSlider);

        // auto-assigns each slider with an ID (from 0 to i)
        slider.id = i;
    }
}

/* MENU SLIDER SETUP CODE */
var menuWrapper = document.querySelector(".menuWrapper");
var menuContainer = document.querySelector(".menuContainer");
var menuCarousel = document.querySelector(".menuCarousel");
var menuItems = menuCarousel.querySelectorAll(".slideItem");
const menuWrapWidth = menuWrapper.clientWidth;    // this should be a constant
addSliders(menuCarousel, menuContainer.clientWidth, menuWrapWidth);

var menuSliders = menuCarousel.querySelectorAll(".slider");

// stores which menuSlider button is currently active (being shown)
var activeMSlider = 0;
setupSliders(menuSliders, "menu");

// set first slider as active
menuSliders[activeMSlider].classList.add("active");

/* EVENTS SLIDER SETUP CODE */
var eventsWrapper = document.querySelector(".eventsWrapper");
var eventsContainer = document.querySelector(".eventsContainer");
var eventsCarousel = document.querySelector(".eventsCarousel");
var eventsItems = eventsCarousel.querySelectorAll(".slideItem");
const eventsWrapWidth = eventsWrapper.clientWidth;    // this should be a constant
addSliders(eventsCarousel, eventsContainer.clientWidth, eventsWrapWidth);

var eventsSliders = eventsCarousel.querySelectorAll(".slider");

// stores which menuSlider button is currently active (being shown)
var activeESlider = 0;
setupSliders(eventsSliders);

// set first slider as active
eventsSliders[activeESlider].classList.add("active");

/* SPECIFIC FUNCTIONS */
function setClickedSlider(e) {
    var clickedSlider = e.target;
    var classType = clickedSlider.parentNode.className;
    removeActiveSliders(classType);  //clearing "active" from all sliders

    if(classType === "menuCarousel")
        activeMSlider = clickedSlider.id;    //setting active slider to clicked one (menu)
    else
        activeESlider = clickedSlider.id;   //setting active slider to clicked one (events)

    //now we call a function to slide the wrapper to give the illusion of moving
    changePosition(clickedSlider); 
}

function removeActiveSliders(classType) {
    if(classType === "menuCarousel"){
        for (var i = 0; i < menuSliders.length; i++) {
            menuSliders[i].classList.remove("active");
        }
    }
    else{
        for (var i = 0; i < eventsSliders.length; i++) {
            eventsSliders[i].classList.remove("active");
        }
    }
}

// Slide the wrapper to show the next items,
// but also making sure not to go over
// as well as setting the right slider to "active"
function changePosition(clickedSlider) {
    var slideVal = clickedSlider.getAttribute("data-slideAmt");

    var translateValue = "translate3d(" + slideVal + ", 0px, 0)";
    if(clickedSlider.parentNode.className === "menuCarousel")
        menuWrapper.style.transform = translateValue;
    else
        eventsWrapper.style.transform = translateValue;

    clickedSlider.classList.add("active");
}

// When the window is resized, we should update the number of clickable sliders
// to fit the amount of content
var prevMenuWidth = menuContainer.clientWidth;
var prevEventsWidth = eventsContainer.clientWidth;

const interval = setInterval(function() {
    // getting the window's width to track when @media takes effect
    menuContainer = document.querySelector(".menuContainer");
    var newMenuWidth = menuContainer.clientWidth;
    
    if(newMenuWidth > prevMenuWidth || newMenuWidth < prevMenuWidth){
        prevMenuWidth = menuContainer.clientWidth;
        // go through each slider and delete them
        for(let i = 0; i < menuSliders.length; i++){
            menuSliders[i].remove();
        }

        addSliders(menuCarousel, menuContainer.clientWidth, menuWrapWidth);
        menuSliders = menuCarousel.querySelectorAll(".slider");
        setupSliders(menuSliders);
    }

    // getting the window's width to track when @media takes effect
    eventsContainer = document.querySelector(".eventsContainer");
    var newEventsWidth = eventsContainer.clientWidth;
    
    if(newEventsWidth > prevEventsWidth || newEventsWidth < prevEventsWidth){
        prevEventsWidth = eventsContainer.clientWidth;
        // go through each slider and delete them
        for(let i = 0; i < eventsSliders.length; i++){
            eventsSliders[i].remove();
        }

        addSliders(eventsCarousel, eventsContainer.clientWidth, eventsWrapWidth);
        eventsSliders = eventsCarousel.querySelectorAll(".slider");
        setupSliders(eventsSliders);
    }
}, 100);    //run every 0.1 seconds

// TODO: make the wrapper draggable, not just clickable