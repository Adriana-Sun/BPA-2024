var docFrag = new DocumentFragment();

displayCart();

function displayCart() {
    var receiptBody = document.querySelector(".receipt");
    var cart = getCart();

    calcSubtotal(cart);

    // add cart items
    for (var item in cart) {
        let cartItem = cart[item];
        let itemContainer = document.createElement("div");
        itemContainer.classList.add("item");
        itemContainer.style.background = "linear-gradient(0.25turn, rgba(40, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url('" + cartItem.data.url + "')";
        itemContainer.style.backgroundSize = "100%";
        itemContainer.style.backgroundPosition = "50%";

        let name = document.createElement("p");
        name.innerText = cartItem.data.name;
        name.classList.add("name");
        itemContainer.appendChild(name);

        let quantity = document.createElement("p");
        quantity.innerText = "Quantity: " + cartItem.quantity;
        quantity.classList.add("quantity");
        itemContainer.appendChild(quantity);

        let price = document.createElement("p");
        price.innerText = "Price: $" + cartItem.data.price;
        price.setAttribute("tabindex", "0");
        price.classList.add("price");
        itemContainer.appendChild(price);

        docFrag.appendChild(itemContainer);
    }
    receiptBody.appendChild(docFrag);
}

function getCart() {
    // the || operator in this case returns the left if the left is true, otherwise it returns the right value
    // in this case, it would mean that if there is no item called "cart", then return an empty JSON
    return JSON.parse(localStorage.getItem('cart')) || {}; 
}

function calcSubtotal(cart){
    // calculating the subtotal
    var subtotalElement = document.getElementById("subtotal");
    // get the data.ids within cart
    var keys = Object.keys(cart);
    var total = 0;
    keys.forEach((key) => {
        total += cart[key].quantity * cart[key].data.price;
    });
    subtotalElement.innerText = total.toFixed(2);  // changing the HTML and making sure total is only to hundredths place
}

const alertElement = document.getElementById("alert");
const submitButton = document.querySelector("input[type='submit']");

submitButton.addEventListener("click", (e) => {
    let allAreFilled = true;    // assume fields are filled out by default
        submitButton.parentElement.querySelectorAll("[required]").forEach(function(i) {
        if(!allAreFilled) return;   // if one of the prev required fields is empty, just return so as to not waste time
        
        if(!i.value) 
            allAreFilled = false;  // if there is no value, then the required field is not filled
        });
        
        if(!allAreFilled){
            setInterval(() => submitButton.classList.add("invalidSubmitAnimation"), 200);
            submitButton.classList.remove("invalidSubmitAnimation");
            return;
        }

        alertElement.style.visibility = 'visible';
        alertElement.style.opacity = '1';

        clearCart();
});

function clearCart(){
    var cart = getCart();

    for(var id in cart){
        if (!cart[id]) {
            console.error(`${id} not found in cart`);
            return;
        }

        delete cart[id];
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}