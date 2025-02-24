document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId");
    const selectedAddressId = localStorage.getItem("selectedAddressId");

    if (!userId || !selectedAddressId) {
        console.error("User ID or Selected Address ID not found in local storage.");
        return;
    }

    try {
        // Fetch user data from JSON server
        const response = await fetch(`http://localhost:3000/User/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        // console.log('userData', userData.email);

       

        // Find the selected address
        const selectedAddress = userData.addresses.find(
            address => address.id.toString() === selectedAddressId
        );

        // console.log('selectedAddress', selectedAddress.email);
        if (!selectedAddress) {
            console.error("Selected address not found.");
            return;
        }

        // Construct full address
        const fullAddress = `${selectedAddress.address1}, ${selectedAddress.address2 ? selectedAddress.address2 + ', ' : ''}${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zipCode}, ${selectedAddress.country}`;

         // Update email
         document.querySelector(".email").textContent = selectedAddress.email;
         console.log('selectedAddress', selectedAddress);
        // Update shipping and billing address
        document.querySelector(".shipping-name").textContent = `${selectedAddress.firstName} ${selectedAddress.lastName}`;
        document.querySelector(".shipping-address").textContent = fullAddress;
        document.querySelector(".shipping-mobile").textContent = selectedAddress.mobileNumber;

        document.querySelector(".billing-name").textContent = `${selectedAddress.firstName} ${selectedAddress.lastName}`;
        document.querySelector(".billing-address").textContent = fullAddress;
        document.querySelector(".billing-mobile").textContent = selectedAddress.mobileNumber;

    } catch (error) {
        console.error("Error fetching address details:", error);
    }
});






async function fetchOrders() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("User ID not found in localStorage");
        return;
    }

    try {
        // Fetch user data from the JSON server
        const response = await fetch(`http://localhost:3000/User?id=${userId}`);
        const users = await response.json();

        if (!users.length) {
            console.error("User not found");
            return;
        }

        const user = users[0]; // Assuming user ID is unique
        const orders = user.orders;

        if (!orders || orders.length === 0) {
            document.getElementById("order-container").innerHTML = "<p>No orders found.</p>";
            return;
        }

        // Generate dynamic order items
        const orderContainer = document.getElementById("order-container");
        orderContainer.innerHTML = orders.map(order => `
            <div class="row m-0 mt-2 ms-sm-2 ms-md-0">
                <div class="col-12 col-sm-3 col-md-12 col-lg-4">
                    <img src="${order.image}" alt="${order.name}" class="w-100 V_eveline_height">
                </div>
                <div class="col-12 col-sm-9 col-md-12 col-lg-8 d-flex flex-lg-row flex-column justify-content-between">
                    <div class="V_cart_item_text w-100">
                        <p class="text mb-0 mt-2 mt-lg-0">${order.name}</p>
                        <p class="text m-0 mt-2"> <span class="V_shade">Shade :</span> ${order.selectedColor ? order.selectedColor : "N/A"} </p>
                    </div>
                    <div class="d-flex flex-column justify-content-between">
                        <div class="d-flex flex-lg-column flex-column-reverse">
                            <p class="text V_selected_price m-0 text-lg-end">$${order.currentPrice}</p>
                            <p class="text V_shade m-0 text-lg-end">X${order.quantity}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="mx-auto mt-3 V_line">
        `).join(""); 

    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

// Call function on page load
fetchOrders();



async function fetchAndCalculateOrderTotal() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("User ID not found in localStorage");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/User?id=${userId}`);
        const users = await response.json();

        if (!users.length) {
            console.error("User not found");
            return;
        }

        const user = users[0]; // Assuming user ID is unique
        const orders = user.orders;

        if (!orders || orders.length === 0) {
            document.getElementById("price-details-container").innerHTML = "<p>No orders found.</p>";
            return;
        }

        // Calculate total price
        let totalItems = 0;
        let totalPrice = 0;
        let totalDiscount = 0;

        orders.forEach(order => {
            totalItems += order.quantity;
            totalPrice += order.currentPrice * order.quantity;
            totalDiscount += (order.currentPrice * order.quantity) * 0.2; // Assuming 30% discount
        });

        const platformFee = 1;
        const finalTotal = totalPrice - totalDiscount + platformFee;

        // Update UI
        document.getElementById("total-items").innerText = totalItems;
        document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;
        document.getElementById("discount").innerText = `-$${totalDiscount.toFixed(2)}`;
        document.getElementById("final-total").innerText = `$${finalTotal.toFixed(2)}`;
        document.getElementById("final-total1").innerText = `$${finalTotal.toFixed(2)}`;

    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

// Call function on page load
fetchAndCalculateOrderTotal();

