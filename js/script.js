document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.cart-total');
    const toggleCartButton = document.querySelector('.checkout');
    const cartSidebar = document.querySelector('.shopping-cart');
    const paymentForm = document.querySelector('.payment-form');
    const paymentFormElement = document.getElementById('payment-form');
    let cart = {};


    function toggleCart() {
        cartSidebar.classList.toggle('open');
    }


    toggleCartButton.addEventListener('click', function() {
        if (Object.keys(cart).length > 0) {
            toggleCart();
            paymentForm.style.display = 'block';
        } else {
            alert('Your cart is empty. Please add items to the cart before checking out.');
        }
    });


    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = button.dataset.item;
            const itemPrice = parseFloat(button.dataset.price.replace('RM ', ''));
            const itemImage = button.dataset.image;


            if (!cart[itemName]) {
                cart[itemName] = { price: itemPrice, quantity: 1, image: itemImage };
            } else {
                cart[itemName].quantity++;
            }
            renderCartItems();
        });
    });


    function renderCartItems() {
        cartItemsList.innerHTML = '';
        let total = 0;


        for (const [itemName, itemDetails] of Object.entries(cart)) {
            total += itemDetails.price * itemDetails.quantity;
            const listItem = document.createElement('li');
            listItem.classList.add('cart-item');


            listItem.innerHTML = `
                <div class="item-details">
                    <img src="${itemDetails.image}" alt="${itemName}" class="cart-item-image">
                    <div>
                        <span class="item-name">${itemName}</span>
                        <span class="item-price">RM ${itemDetails.price.toFixed(2)}</span>
                    </div>
                </div>
                <input type="number" min="1" value="${itemDetails.quantity}" class="item-quantity">
                <button class="update-quantity">Update</button>
                <button class="remove-item">Remove</button>
            `;


            cartItemsList.appendChild(listItem);
        }


        totalElement.textContent = `Total: RM ${total.toFixed(2)}`;


        // Add event listeners for update and remove buttons
        document.querySelectorAll('.update-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const listItem = button.closest('.cart-item');
                const itemName = listItem.querySelector('.item-name').textContent;
                const newQuantity = parseInt(listItem.querySelector('.item-quantity').value);
                if (newQuantity > 0) {
                    cart[itemName].quantity = newQuantity;
                }
                renderCartItems();
            });
        });


        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const listItem = button.closest('.cart-item');
                const itemName = listItem.querySelector('.item-name').textContent;
                delete cart[itemName];
                renderCartItems();
            });
        });
    }


    paymentFormElement.addEventListener('submit', function(event) {
        event.preventDefault();


        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;


        if (cardNumber && expiryDate && cvv) {
            alert('Payment successful!');
            cart = {};
            renderCartItems();
            totalElement.textContent = 'Total: RM 0.00';
            paymentForm.style.display = 'none';
            toggleCart();
        } else {
            alert('Please fill in all payment details.');
        }
    });
});


