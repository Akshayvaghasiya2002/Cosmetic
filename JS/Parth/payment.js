document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem("userId");
    const selectedAddressId = localStorage.getItem("selectedAddressId");

    if (!userId || !selectedAddressId) {
        console.error("User ID or Selected Address ID is missing in local storage.");
        return;
    }

    try {
        // Fetch user data from JSON Server
        const response = await fetch("http://localhost:3000/User"); // Update with your JSON server URL
        const users = await response.json();

        // Find the user by ID
        const user = users.find(user => user.id === userId);

        if (!user) {
            console.error("User not found!");
            return;
        }

        // Find the address inside the user's addresses array
        const selectedAddress = user.addresses.find(addr => addr.id == selectedAddressId);

        if (selectedAddress) {
            // Update the HTML elements dynamically using querySelector
            document.querySelector(".V_summary").textContent = "Shipping Address";
            document.querySelector(".V_place").textContent = selectedAddress.addressType || "Other";
            document.querySelector(".V_nsme:nth-of-type(1)").textContent = `${selectedAddress.firstName} ${selectedAddress.lastName}`;
            document.querySelector(".V_nsme:nth-of-type(2)").textContent = selectedAddress.mobileNumber;
            document.querySelector(".V_Address").textContent =
                `${selectedAddress.address1}, ${selectedAddress.address2}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}, ${selectedAddress.zipCode}`;
        } else {
            console.error("Address not found for the given user and selected address ID.");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
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
        localStorage.setItem("finalTotal", finalTotal);

        // Update UI
        document.getElementById("total-items").innerText = totalItems;
        document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;
        document.getElementById("discount").innerText = `-$${totalDiscount.toFixed(2)}`;
        document.getElementById("final-total").innerText = `$${finalTotal.toFixed(2)}`;
        document.getElementById("V_total").innerText = `$${finalTotal.toFixed(2)}`;

    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

// Call function on page load
fetchAndCalculateOrderTotal();
























document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();
    const cardNumber = document.getElementById("cardNumber");
    const expiryDate = document.getElementById("expiryDtae");
    const cvv = document.getElementById("cvv");
    const cardHolderName = document.getElementById("cardholdername");
    const proceedPaymentBtn = document.querySelector(".V_proceed_payment");
    const successModal = new bootstrap.Modal(document.getElementById("successModal"));

    proceedPaymentBtn.addEventListener("click", async function () {
        let errors = [];

        // Get userId from localStorage
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("User not logged in!");
            return;
        }

        // ✅ Validate Card Details
        const cardNumRegex = /^\d{12,16}$/;
        if (!cardNumRegex.test(cardNumber.value)) errors.push("Card Number must be 12 to 16 digits.");

        const expRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
        if (!expRegex.test(expiryDate.value)) {
            errors.push("Expiry Date must be in MM/YYYY format.");
        } else {
            const [month, year] = expiryDate.value.split("/").map(Number);
            const currentDate = new Date();
            if (year < currentDate.getFullYear() || (year === currentDate.getFullYear() && month < currentDate.getMonth() + 1)) {
                errors.push("Your card has expired.");
            }
        }

        const cvvRegex = /^\d{3,6}$/;
        if (!cvvRegex.test(cvv.value)) errors.push("CVV must be 3 to 6 digits.");

        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(cardHolderName.value.trim())) errors.push("Card Holder Name must contain only letters.");

        if (!cardNumber.value || !expiryDate.value || !cvv.value || !cardHolderName.value) {
            errors.push("Please fill in all required fields.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        // ✅ Prepare Card Data
        const cardData = {
            cardNumber: cardNumber.value,
            expiryDate: expiryDate.value,
            cvv: cvv.value,
            cardHolderName: cardHolderName.value.trim().toUpperCase()
        };

        try {
            // ✅ Fetch User Data
            const response = await fetch(`http://localhost:3000/User/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch user data.");
            let userData = await response.json();

            // ✅ Ensure `carddetails` array exists
            if (!userData.carddetails) userData.carddetails = [];

            // ✅ Append New Card Data
            userData.carddetails.push(cardData);

            // ✅ Update User Data in JSON Server
            const updateResponse = await fetch(`http://localhost:3000/User/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ carddetails: userData.carddetails })
            });

            if (!updateResponse.ok) throw new Error("Failed to update card details.");

            // ✅ Show Success Modal & Redirect
            successModal.show();

            setTimeout(() => {
                successModal.hide();
                // setTimeout(() => {
                //     window.location.href = "/Parth/OrderDetail.html"; // Redirect after 3s + 2s = 5s
                // }, 2000);
            }, 3000);

            window.location.href="/Parth/OrderDetail.html";

        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    });
});
