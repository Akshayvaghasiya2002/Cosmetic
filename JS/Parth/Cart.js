





function gotoaddresspage() {
    window.location.href = "../../Parth/AddAddress.html";
}

// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", async () => {

    const cartContainer = document.getElementById("cartContainer");
    const cartHeader = document.getElementById("offcanvasRightLabel");
    const totalAmount = document.getElementById("totalAmount");
    const emptyCartSection = document.querySelector(".emptycart.h-100.d-none");
    const filledCartSection = document.querySelector(".filledcart:not(.h-100.d-none)");

    let cartItems = [];

    // 🔹 Fetch Cart Items from JSON Server
    async function fetchCartItems() {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/User/${userId}`);
            const userData = await response.json();

            // If cart exists, map data; otherwise, set an empty cart
            cartItems = userData.orders && userData.orders.length > 0 ? userData.orders.map(order => ({
                id: order.id,
                name: order.name,
                brand: order.brand,
                price: order.currentPrice,
                quantity: order.quantity,
                image: order.image,
                selectedColor: order.selectedColor
            })) : [];

            renderCart(); // 🔹 Call function to display items
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    }

    // 🔹 Update Quantity (Increase/Decrease)
    async function updateQuantity(id, action) {
        const item = cartItems.find(cartItem => cartItem.id === id);
        if (!item) return;

        // Increase or Decrease Quantity
        if (action === "increase") {
            item.quantity++;
        } else if (action === "decrease" && item.quantity > 1) {
            item.quantity--;
        }

        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://localhost:3000/User/${userId}`);
            const userData = await response.json();

            // Update quantity in server data
            userData.orders = userData.orders.map(order =>
                order.id === id ? { ...order, quantity: item.quantity } : order
            );

            await fetch(`http://localhost:3000/User/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orders: userData.orders })
            });

            // 🔹 Update UI immediately after update
            document.getElementById(`itemCount${id}`).textContent = item.quantity;
            document.getElementById(`itemPrice${id}`).textContent = `$${(item.quantity * item.price).toFixed(2)}`;

            updateCartSummary(); // 🔹 Refresh cart summary
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    }

    // 🔹 Update Cart Summary
    function updateCartSummary() {

        console.log('updatecart called');

        console.log("Updating cart summary...", cartItems);

        const totalCount = cartItems?.length;
        const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

        console.log("Total Items:", totalCount, "Total Price:", totalPrice);

        // 🔹 Update cart header count
        cartHeader.textContent = `Cart(${totalCount})`;

        // 🔹 Update total amount
        totalAmount.textContent = `$${totalPrice.toFixed(2)}`;

         // 🔹 Toggle visibility of empty and filled cart sections
    if (cartItems.length === 0) {
        emptyCartSection.classList.remove("d-none");
        filledCartSection.classList.add("d-none");
    } else {
        emptyCartSection.classList.add("d-none");
        filledCartSection.classList.remove("d-none");
    }
    }

    // 🔹 Render Cart Items
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
                            <p class="text m-0">${item.name}</p>
                            ${item.selectedColor ? `<p class="text m-0 mt-2"><span class="V_shade">Shade:</span> <span>${item.selectedColor}</span></p>` : ""}
                        </div>
                        <div class="d-flex flex-column justify-content-between">
                            <div>
                                <p class="text V_selected_price m-0 text-end" id="itemPrice${item.id}">$${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div class="d-flex justify-content-center align-items-center justify-content-between pt-4">
                                <button class="px-xl-2 V_minus text-center mt-4" data-action="decrease" data-id="${item.id}">-</button>
                                <div class="text V_count m-0 mt-4">
                                    <p class="mx-1 px-xl-3 m-0 item-count" id="itemCount${item.id}">${item.quantity}</p>
                                </div>
                                <button class="px-xl-2 V_plus text-center mt-4" data-action="increase" data-id="${item.id}">+</button>
                                <button class="V_delete ms-1 ms-xl-2 pt-2" data-action="delete" data-id="${item.id}">
                                    <img src="../IMG/Parth/delete.png" alt="delete btn" class="ms-auto w-100">
                                </button>
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

    // 🔹 Handle Button Clicks (Increase, Decrease, Delete)
    cartContainer.addEventListener("click", async (event) => {
       
        
        const target = event.target.closest("[data-action]");
        if (!target) return;

        // Prevent default behavior (important to stop page reload)
        event.preventDefault();
        event.stopPropagation();

        const action = target.getAttribute("data-action");
        const id = parseInt(target.getAttribute("data-id"));

        if (action === "increase" || action === "decrease") {
            await updateQuantity(id, action);
        } else if (action === "delete") {
            await deleteItem(id);
        }
    });

    // 🔹 Delete Item from Cart
    async function deleteItem(id) {

        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://localhost:3000/User/${userId}`);
            const userData = await response.json();

            // Remove item from JSON server
            userData.orders = userData.orders.filter(order => order.id !== id);
            await fetch(`http://localhost:3000/User/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orders: userData.orders })
            });

            // Remove from local cart
            cartItems = cartItems.filter(cartItem => cartItem.id !== id);

            // Remove item from UI
            const itemToRemove = document.querySelector(`div.row[data-id="${id}"]`);
            if (itemToRemove) {
                // Also remove the <hr> element that follows the item
                const nextSibling = itemToRemove.nextElementSibling;
                if (nextSibling && nextSibling.tagName === 'HR') {
                    nextSibling.remove();
                }
                itemToRemove.remove();
            }
            
            updateCartSummary();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }

    // Fetch cart items on page load
    await fetchCartItems();
});
