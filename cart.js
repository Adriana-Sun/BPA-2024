var docFrag = new DocumentFragment();

displayCart();

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

function displayCart(){
    var cartBody = document.querySelector(".cartItems");
    var cart = getCart();

    calcSubtotal(cart);

    // remove all cart items
    while (cartBody.firstChild) {
        cartBody.removeChild(cartBody.firstChild);
    }

    // add cart items back
    for (var item in cart) {
        let cartItem = cart[item];
        let itemContainer = document.createElement("div");
        itemContainer.classList.add("item");

        let img = document.createElement("img");
        img.src = cartItem.data.url;
        itemContainer.appendChild(img);

        let name = document.createElement("p");
        name.innerText = cartItem.data.name;
        name.classList.add("name");
        itemContainer.appendChild(name);

        let quantity = document.createElement("p");
        quantity.innerText = "Quantity: ";
            let quantitySpan = document.createElement("span");
                let quantityInput = document.createElement("input")
                quantityInput.type = "number";
                quantityInput.value = cartItem.quantity;
                quantityInput.addEventListener('input', updateQuantity(item));
                quantitySpan.appendChild(quantityInput);
            quantity.appendChild(quantitySpan);
        itemContainer.appendChild(quantity);

        let price = document.createElement("p");
        price.innerText = "Price: $";
            let priceVal = document.createElement("span");
            priceVal.innerText = cartItem.data.price;
        price.appendChild(priceVal);
        itemContainer.appendChild(price);

        let remButton = document.createElement("button");
        remButton.addEventListener("click", removeListener(item));
        remButton.innerText = "Remove";
        itemContainer.appendChild(remButton);

        docFrag.appendChild(itemContainer);
    }
    cartBody.appendChild(docFrag);

// Ideally the HTML should look like this:
//     <section class="cartItems">
//          <div class="item">
//              <img src="*insert URL here*">
//              <p>Name</p>
//              <p>Quantity: <span><input type="number" value="*insert quantity*"></span></p>
//              <p>Price: $<span>4.99</span></p>
//              <button>Remove</button>
//          </div>
//      </section>
}

// wrapper event listener so the variable "id" can be passed to removeFromCart
function removeListener(id) {
    return function(e) {
        removeFromCart(id);
    }
}

// also wrapper event listener for updateQuantity
function updateQuantity(id){
    return function(e){
        var cart = getCart();
        cart[id].quantity = e.target.value;
        calcSubtotal(cart);
    }
}

function removeFromCart(id) {
    var cart = getCart();
    if (!cart[id]) {
        console.error(`${id} not found in cart`);
        return;
    }

    delete cart[id];

    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
}

function getCart() {
    // the || operator in this case returns the left if the left is true, otherwise it returns the right value
    // in this case, it would mean that if there is no item called "cart", then return an empty JSON
    return JSON.parse(localStorage.getItem('cart')) || {}; 
}