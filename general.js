var body = document.querySelector('body');

function updateNavBar() {
    var x = document.querySelector("nav");
    if(x.className === 'navBar')
        x.className += " responsive";
    else
        x.className = 'navBar';
}

var pageLinks = document.querySelectorAll(".pageLink");
pageLinks.forEach(function(currentValue) {
    currentValue.addEventListener('click', function(e){
        body.style.opacity = 0;
        setTimeout(function() { 
            window.location.href = href;
        }, 500);
    });
});

document.addEventListener('DOMContentLoaded', function(e){
    setTimeout(function() {
        body.style.opacity = 1;
    }, 500);
})