const alertElement = document.getElementById("alert");

var addButtons = document.querySelectorAll("button[data-id]");

addButtons.forEach(button => {
    button.addEventListener("click", () => {
        var data = {...button.dataset};   // gets all the special "data-" variables 
        // (... is what specifies all and .dataset is what specifies to get "data-" variables)
        addToCart(data);    // data should be a JSON
        alertElement.style.opacity = '1';
        setInterval(() => alertElement.style.opacity = '0', 3500);
    });
});

function addToCart(data) {
    var cart = getCart();
    var prevQuantity;

    if(cart[data.id])
        prevQuantity = cart[data.id].quantity;
    else
        prevQuantity = 0;

    // cart is a map of IDs that correspond to JSONs that have a quantity attribute and data (another JSON)
    cart[data.id] = {
        quantity: prevQuantity + 1, // sets the quantity (so even if quantity didn't exist before, it's created now)
        data    // the JSON acquired from button's "data-" variables
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}


function getCart() {
    // the || operator in this case returns the left if the left is true, otherwise it returns the right value
    // in this case, it would mean that if there is no item called "cart", then return an empty JSON
    return JSON.parse(localStorage.getItem('cart')) || {}; 
}