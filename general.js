function updateNavBar() {
    var x = document.querySelector("nav");
    if(x.className === 'navBar')
        x.className += " responsive";
    else
        x.className = 'navBar';
}