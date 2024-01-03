const body = document.querySelector("body");

/* MENU SLIDER SETUP CODE */
var menuContainer = document.querySelector(".menuContainer");
const menuWrapper = document.querySelector(".menuWrapper");
const menuItems = menuWrapper.querySelectorAll(".slideItem");
let menuDragStart = false, prevMenuX, prevMenuScroll;

const arrowMenuSliders = menuContainer.querySelectorAll(".arrowSlider");
let firstMenuItemWidth = menuItems[0].clientWidth + 20;    // width + margin (20px)
arrowMenuSliders.forEach((arrow) => {
    arrow.addEventListener("click", () =>{
        if(arrow.id == "left")
            menuWrapper.scrollLeft -= firstMenuItemWidth;
        else
            menuWrapper.scrollLeft += firstMenuItemWidth;
    });
});

// TODO: make arrows disappear if at edge

// let menuScrollWidth = menuWrapper.scrollWidth - menuWrapper.clientWidth;
// const showHideIcons = () =>{
//     if(menuWrapper.scrollLeft === 0)
//         arrowMenuSliders[0].style.display = "none";
//     else
//         arrowMenuSliders[0].style.display = "block";

//     if(menuWrapper.scrollLeft === menuScrollWidth)
//         arrowMenuSliders[1].style.display = "none";
//     else
//         arrowMenuSliders[1].style.display = "block";
// }

// TODO: snap to slideItem

function dragMenuStart(e){
    menuDragStart = true;
    prevMenuX = e.pageX || e.touches[0].pageX;
    prevMenuScroll = menuWrapper.scrollLeft;
}

function draggingMenu(e){
    if(!menuDragStart) return;  // if the mouse is not dragging, then don't move the wrapper
    e.preventDefault();
    menuWrapper.classList.add("dragging");
    let posDiff = (e.pageX || e.touches[0].pageX) - prevMenuX;  // calculating how much the position changes
    menuWrapper.scrollLeft = prevMenuScroll - posDiff;  // scroll based on that amount
}

function dragMenuStop(){
    menuDragStart = false;
    menuWrapper.classList.remove("dragging");
}

// mouse events
menuWrapper.addEventListener("mousedown", dragMenuStart);
menuWrapper.addEventListener("mousemove", draggingMenu);
menuWrapper.addEventListener("mouseup", dragMenuStop);

// touch events (mobile)
menuWrapper.addEventListener("touchstart", dragMenuStart);
menuWrapper.addEventListener("touchmove", draggingMenu);
menuWrapper.addEventListener("touchend", dragMenuStop);

/* EVENTS SLIDER SETUP CODE */
var eventsContainer = document.querySelector(".eventsContainer");
const eventsWrapper = document.querySelector(".eventsWrapper");
const eventsItems = eventsWrapper.querySelectorAll(".slideItem");

let eventsDragStart = false, prevEventsX, prevEventsScroll;

const arrowEventsSliders = eventsContainer.querySelectorAll(".arrowSlider");
let firstEventsItemWidth = eventsItems[0].clientWidth + 25;    // width + margin (25px)
arrowEventsSliders.forEach((arrow) => {
    arrow.addEventListener("click", () =>{
        if(arrow.id == "left")
            eventsWrapper.scrollLeft -= firstEventsItemWidth;
        else
            eventsWrapper.scrollLeft += firstEventsItemWidth;
    });
});

function dragEventsStart(e){
    eventsDragStart = true;
    prevEventsX = e.pageX || e.touches[0].pageX;
    prevEventsScroll = eventsWrapper.scrollLeft;
}

function draggingEvents(e){
    if(!eventsDragStart) return;  // if the mouse is not dragging, then don't move the wrapper
    e.preventDefault();
    eventsWrapper.classList.add("dragging");
    let posDiff = (e.pageX || e.touches[0].pageX) - prevEventsX;  // calculating how much the position changes
    eventsWrapper.scrollLeft = prevEventsScroll - posDiff;  // scroll based on that amount
}

function dragEventsStop(){
    eventsDragStart = false;
    eventsWrapper.classList.remove("dragging");
}

// mouse events
eventsWrapper.addEventListener("mousedown", dragEventsStart);
eventsWrapper.addEventListener("mousemove", draggingEvents);
eventsWrapper.addEventListener("mouseup", dragEventsStop);

// touch events (mobile)
eventsWrapper.addEventListener("touchstart", dragEventsStart);
eventsWrapper.addEventListener("touchmove", draggingEvents);
eventsWrapper.addEventListener("touchend", dragEventsStop);

// When the window is resized, we should update how much the buttons slide
// var prevMenuWidth = menuContainer.clientWidth;
// var prevEventsWidth = eventsContainer.clientWidth;

// const interval = setInterval(function() {

// }, 100);    //run every 0.1 seconds