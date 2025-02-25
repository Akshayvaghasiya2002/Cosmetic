
function gotoaddresspage() {
    window.location.href = "../../Parth/AddAddress.html";
    console.log('btn');
}


document.addEventListener("DOMContentLoaded", async () => {
    const cartContainer = document.getElementById("cartContainer");
    const cartHeader = document.getElementById("offcanvasRightLabel");
    const totalAmount = document.getElementById("totalAmount");
    const emptyCartSection = document.querySelector(".offcanvas-body.h-100.d-none");
    const filledCartSection = document.querySelector(".offcanvas-body:not(.h-100.d-none)");

    let cartItems = [];

    // Fetch cart items from JSON server based on userId
    async function fetchCartItems() {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/User/${userId}`);
            const userData = await response.json();

            cartItems = userData.orders && userData.orders.length > 0 ? userData.orders.map(order => ({
                id: order.id,
                name: order.name,
                brand: order.brand,
                price: order.currentPrice,
                quantity: order.quantity,
                image: order.image,
                selectedColor: order.selectedColor
            })) : [];

            renderCart();
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    }


        // Update item quantity (increase or decrease) without reloading entire cart
        async function updateQuantity(id, action, event) {
            // event.preventd

            const item = cartItems.find(cartItem => cartItem.id === id);
            if (!item) return;
    
            if (action === "increase") {
                item.quantity++;
            } else if (action === "decrease" && item.quantity > 1) {
                item.quantity--;
            }
    
            try {
                const userId = localStorage.getItem("userId");
                const response = await fetch(`http://localhost:3000/User/${userId}`);
                const userData = await response.json();
    
                userData.orders = userData.orders.map(order =>
                    order.id === id ? { ...order, quantity: item.quantity } : order
                );
    
                await fetch(`http://localhost:3000/User/${userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orders: userData.orders })
                });
    
                // Update UI without full re-render
                document.getElementById(`itemCount${id}`).textContent = item.quantity;
                document.getElementById(`itemPrice${id}`).textContent = `$${(item.quantity * item.price).toFixed(2)}`;
    
                updateCartSummary();
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        }

        
    // Update the cart header and total price
    function updateCartSummary() {
        const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

        cartHeader.textContent = `Cart(${totalCount})`;
        totalAmount.textContent = `$${totalPrice.toFixed(2)}`;

        if (cartItems.length === 0) {
            emptyCartSection.classList.remove("d-none");
            filledCartSection.classList.add("d-none");
        } else {
            emptyCartSection.classList.add("d-none");
            filledCartSection.classList.remove("d-none");
        }
    }

    // Render the cart items
    function renderCart() {
        cartContainer.innerHTML = "";
        cartItems.forEach((item) => {
            const cartItemHTML = `
                <div class="row m-0 mt-2" data-id="${item.id}">
                    <div class="col-12 col-md-3">
                        <img src="${item.image}" alt="${item.name}" class="w-100 V_eveline_height">
                    </div>
                    <div class="col-12 col-md-9 d-flex justify-content-between mt-4">
                        <div class="V_cart_item_text">
                            <p class="text m-0">${item.brand} - ${item.name}</p>
                            ${item.selectedColor ? `<p class="text m-0 mt-2"><span class="V_shade">Shade:</span> <span">${item.selectedColor}</span></p>` : ""}
                        </div>
                        <div class="d-flex flex-column justify-content-between">
                            <div>
                                <p class="text V_selected_price m-0 text-end" id="itemPrice${item.id}">$${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div class="d-flex justify-content-center align-items-center justify-content-between pt-4">
                                <div class="px-xl-2 V_minus text-center mt-4" data-action="decrease" data-id="${item.id}">-</div>
                                <div class="text V_count m-0 mt-4">
                                    <p class="mx-1 px-xl-3 m-0 item-count" id="itemCount${item.id}">${item.quantity}</p>
                                </div>
                                <div class="px-xl-2 V_plus text-center mt-4" data-action="increase" data-id="${item.id}">+</div>
                                <div class="V_delete ms-1 ms-xl-2 pt-2" data-action="delete" data-id="${item.id}">
                                    <img src="../IMG/Parth/delete.png" alt="delete btn" class="ms-auto w-100">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            `;
            cartContainer.innerHTML += cartItemHTML;
        });

        updateCartSummary();
    }

    // Event delegation for cart actions (increase, decrease, delete)
    cartContainer.addEventListener("click", async (event) => {
        const target = event.target.closest("[data-action]");
        if (!target) return;

        const action = target.getAttribute("data-action");
        const id = parseInt(target.getAttribute("data-id"));

        if (action === "increase" || action === "decrease") {
            await updateQuantity(id, action);
        } else if (action === "delete") {
            await deleteItem(id);
        }
    });



    // Delete item from cart and update JSON server
    async function deleteItem(id) {
        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://localhost:3000/User/${userId}`);
            const userData = await response.json();

            userData.orders = userData.orders.filter(order => order.id !== id);

            await fetch(`http://localhost:3000/User/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orders: userData.orders })
            });

            // Remove from local cartItems array
            cartItems = cartItems.filter(cartItem => cartItem.id !== id);

            // Remove item from UI
            document.querySelector(`[data-id="${id}"]`).remove();

            updateCartSummary();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }

    // Fetch cart items on page load
    await fetchCartItems();
});

