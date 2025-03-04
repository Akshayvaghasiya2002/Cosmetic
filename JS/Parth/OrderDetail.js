

window.onload = function () {
    const currentDate = new Date(); // Define current date
    const deliveryDate = new Date(currentDate); // Create a new date object
    deliveryDate.setDate(currentDate.getDate() + 10); // Add 10 days

    // Format date to readable form (e.g., "Thu, 30 Jan")
    const options = { weekday: "short", day: "numeric", month: "short" };
    document.getElementById("expiryDate").innerText = deliveryDate.toLocaleDateString("en-US", options);
};



















document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId");
    const selectedAddressId = localStorage.getItem("selectedAddressId");
    const paymetMethod = localStorage.getItem("paymentMethod");

    if (!userId || !selectedAddressId) {
        console.error("User ID or Selected Address ID not found in local storage.");
        return;
    }

    
    console.log('paymentMethod', paymetMethod);

    document.getElementById("paymentmethod").textContent = paymetMethod;
    document.getElementById("paymentmethod1").textContent = paymetMethod;
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
         console.log('selectedAddress', selectedAddress.firstName);
         document.querySelector("#name").textContent = selectedAddress.firstName;
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






// async function fetchOrders() {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//         console.error("User ID not found in localStorage");
//         return;
//     }

//     try {
//         // Fetch user data from the JSON server
//         const response = await fetch(`http://localhost:3000/User?id=${userId}`);
//         const users = await response.json();

//         if (!users.length) {
//             console.error("User not found");
//             return;
//         }

//         const user = users[0]; // Assuming user ID is unique
//         const orders = user.orders;

//         if (!orders || orders.length === 0) {
//             document.getElementById("order-container").innerHTML = "<p>No orders found.</p>";
//             return;
//         }

//         // Generate dynamic order items
//         const orderContainer = document.getElementById("order-container");
//         orderContainer.innerHTML = orders.map(order => `
//             <div class="row m-0 mt-2 ms-sm-2 ms-md-0">
//                 <div class="col-12 col-sm-3 col-md-12 col-lg-4">
//                     <img src="${order.image}" alt="${order.name}" class="w-100 V_eveline_height">
//                 </div>
//                 <div class="col-12 col-sm-9 col-md-12 col-lg-8 d-flex flex-lg-row flex-column justify-content-between">
//                     <div class="V_cart_item_text w-100">
//                         <p class="text mb-0 mt-2 mt-lg-0">${order.name}</p>
//                         <p class="text m-0 mt-2"> <span class="V_shade">Shade :</span> ${order.selectedColor ? order.selectedColor : "N/A"} </p>
//                     </div>
//                     <div class="d-flex flex-column justify-content-between">
//                         <div class="d-flex flex-lg-column flex-column-reverse">
//                             <p class="text V_selected_price m-0 text-lg-end">$${order.currentPrice}</p>
//                             <p class="text V_shade m-0 text-lg-end">X${order.quantity}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <hr class="mx-auto mt-3 V_line">
//         `).join(""); 

//     } catch (error) {
//         console.error("Error fetching orders:", error);
//     }
// }

// // Call function on page load
// fetchOrders();


// async function fetchConfirmedOrders() {
//     const userId = localStorage.getItem("userId");
//     const batchId = localStorage.getItem("batchId"); // Replace with dynamic batchId if needed

//     if (!userId) {
//         console.error("User ID not found in localStorage");
//         return;
//     }

//     try {
//         // Fetch user data from JSON server
//         const response = await fetch(`http://localhost:3000/User?id=${userId}`);
//         const users = await response.json();

//         if (!users.length) {
//             console.error("User not found");
//             return;
//         }

//         const user = users[0]; // Assuming user ID is unique
//         const confirmedOrders = user.confirmedOrders || [];

//         // Filter orders based on batchId
//         const matchingOrder = confirmedOrders.find(order => order.batchId === batchId);

//         if (!matchingOrder) {
//             document.getElementById("order-container").innerHTML = "<p>No matching orders found.</p>";
//             return;
//         }

//         // Generate dynamic order items
//         const orderContainer = document.getElementById("order-container");
//         orderContainer.innerHTML = matchingOrder.orders.map(order => `
//             <div class="row m-0 mt-2 ms-sm-2 ms-md-0">
//                 <div class="col-12 col-sm-3 col-md-12 col-lg-4">
//                     <img src="${order.image}" alt="${order.name}" class="w-100 V_eveline_height">
//                 </div>
//                 <div class="col-12 col-sm-9 col-md-12 col-lg-8 d-flex flex-lg-row flex-column justify-content-between">
//                     <div class="V_cart_item_text w-100">
//                         <p class="text mb-0 mt-2 mt-lg-0">${order.name}</p>
//                         <p class="text m-0 mt-2"> <span class="V_shade">Shade :</span> ${order.selectedColor ? order.selectedColor : "N/A"} </p>
//                     </div>
//                     <div class="d-flex flex-column justify-content-between">
//                         <div class="d-flex flex-lg-column flex-column-reverse">
//                             <p class="text V_selected_price m-0 text-lg-end">$${order.currentPrice}</p>
//                             <p class="text V_shade m-0 text-lg-end">X${order.quantity}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <hr class="mx-auto mt-3 V_line">
//         `).join(""); 

//     } catch (error) {
//         console.error("Error fetching confirmed orders:", error);
//     }
// }

// // Call function on page load
// fetchConfirmedOrders();




// document.addEventListener("DOMContentLoaded", async function () {
//     const userId = localStorage.getItem("userId");
//     const totalAmount =  localStorage.getItem("finalTotal");

//     totalAmount = parseFloat(totalAmount).toFixed(2);

//     if (!userId) {
//         console.error("User ID not found in localStorage.");
//         return;
//     }

//     try {
//         // ✅ Fetch User Data
//         const response = await fetch(`http://localhost:3000/User/${userId}`);
//         if (!response.ok) throw new Error("Failed to fetch user data.");
//         const userData = await response.json();

//         if (!userData.orders || userData.orders.length === 0) {
//             console.log("No orders found.");
//             return;
//         }

//         // ✅ Ensure `confirmedOrders` array exists
//         const confirmedOrders = userData.confirmedOrders || [];

//         // ✅ Create Unique Batch ID
//         const orderBatchId = `batch_${Date.now()}`;
//         const store = localStorage.setItem("batchId", orderBatchId);
// console.log('lo');
//         // ✅ Process Orders into Confirmed Orders
//         const currentDate = new Date();
//         const deliveryDate = new Date();
//         deliveryDate.setDate(currentDate.getDate() + 10);

//         const newConfirmedOrder = {
//             batchId: orderBatchId,
//             orderDate: currentDate.toISOString().split("T")[0],
//             deliveryDate: deliveryDate.toISOString().split("T")[0],
//             orderStatus: "pending",
//             totalAmount: Number(totalAmount), 
//             orders: userData.orders.map(order => ({
//                 ...order,
//                 orderId: `order_${Date.now()}`, // Unique Order ID
//                 totalAmount: order.currentPrice * order.quantity
//             }))
//         };

       
//         // ✅ Append the new order batch
//         confirmedOrders.push(newConfirmedOrder);

//         // ✅ Update JSON Server: Move orders to `confirmedOrders` and clear `orders`
//         const updateResponse = await fetch(`http://localhost:3000/User/${userId}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 confirmedOrders: confirmedOrders,
//                 orders: [] // Clear the `orders` array
//             })
//         });

//         if (!updateResponse.ok) throw new Error("Failed to update order data.");
//         console.log("Orders moved to confirmedOrders successfully.");

//     } catch (error) {
//         console.error("Error processing orders:", error);
//     }
// });




// async function fetchAndCalculateConfirmedOrderTotal() {
//     const userId = localStorage.getItem("userId");
//     const batchId = localStorage.getItem("batchId");

//     if (!userId) {
//         console.error("User ID not found in localStorage");
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:3000/User?id=${userId}`);
//         const users = await response.json();

//         if (!users.length) {
//             console.error("User not found");
//             return;
//         }

//         const user = users[0]; // Assuming user ID is unique
//         const confirmedOrders = user.confirmedOrders || [];

//         // Find the matching batch ID
//         const matchingOrder = confirmedOrders.find(order => order.batchId === batchId);

//         if (!matchingOrder || !matchingOrder.orders.length) {
//             document.getElementById("price-details-container").innerHTML = "<p>No confirmed orders found.</p>";
//             return;
//         }

//         // Initialize totals
//         let totalItems = 0;
//         let totalPrice = 0;
//         let totalDiscount = 0;
//         const platformFee = 1;

//         // Calculate totals
//         matchingOrder.orders.forEach(order => {
//             totalItems += order.quantity;
//             totalPrice += order.currentPrice * order.quantity;
//             totalDiscount += (order.currentPrice * order.quantity) * 0.2; // Assuming 30% discount
//         });

//         const finalTotal = totalPrice - totalDiscount + platformFee;
//         localStorage.setItem("finalTotal", finalTotal);

//         // Update UI
//         document.getElementById("total-items").innerText = totalItems;
//         document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;
//         document.getElementById("discount").innerText = `-$${totalDiscount.toFixed(2)}`;
//         document.getElementById("final-total").innerText = `$${finalTotal.toFixed(2)}`;
//         document.getElementById("final-total1").innerText = `$${finalTotal.toFixed(2)}`;
        

//     } catch (error) {
//         console.error("Error fetching confirmed orders:", error);
//     }
// }

// // Call function on page load
// fetchAndCalculateConfirmedOrderTotal();








// document.addEventListener("DOMContentLoaded", function () {
//     const batchId = localStorage.getItem("batchId");
//     if (batchId) {
//         document.getElementById("id").innerText = batchId;
//     } else {
//         console.error("Batch ID not found in localStorage.");
//     }
// });





document.addEventListener("DOMContentLoaded", async function () {
    await processOrders(); // Step 1
    await fetchConfirmedOrders(); // Step 2
    await fetchAndCalculateConfirmedOrderTotal(); // Step 3
    displayBatchId(); // Step 4
});

/**
 * Step 1: Fetch User Data & Move Orders to Confirmed Orders
 */
async function processOrders() {
    const userId = localStorage.getItem("userId");
    const total = localStorage.getItem("finalTotal");
    const selectedAddressId = localStorage.getItem("selectedAddressId");

   
    if (!userId || !selectedAddressId) {
        console.error("User ID or Selected Address ID not found in local storage.");
        return;
    }

    try {
        // ✅ Fetch User Data
        const response = await fetch(`http://localhost:3000/User/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data.");
        const userData = await response.json();

        if (!userData.orders || userData.orders.length === 0) {
            console.log("No orders found.");
            return;
        }
        // Find the selected address
        const selectedAddress = userData.addresses.find(
            address => address.id.toString() === selectedAddressId
        );

        if (!selectedAddress) {
            console.error("Selected address not found.");
            return;
        }

        // Construct full address
        const fullAddress = `${selectedAddress.address1}, ${selectedAddress.address2 ? selectedAddress.address2 + ', ' : ''}${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zipCode}, ${selectedAddress.country}`;



        // ✅ Create Unique Batch ID
        const batchId = `batch_${Date.now()}`;
        localStorage.setItem("batchId", batchId);

        // ✅ Process Orders
        const currentDate = new Date();
        const deliveryDate = new Date();
        deliveryDate.setDate(currentDate.getDate() + 10);

        const newConfirmedOrder = {
            batchId: batchId,
            orderDate: currentDate.toISOString().split("T")[0],
            deliveryDate: deliveryDate.toISOString().split("T")[0],
            orderStatus: "pending",
            totalAmount: total,
           shippingDetails: {
                name: `${selectedAddress.firstName} ${selectedAddress.lastName}`,
                address: fullAddress,
                mobile: selectedAddress.mobileNumber,
            },
            orders: userData.orders.map(order => ({
                ...order,
                orderId: `order_${Date.now()}`,
                totalAmount: order.currentPrice * order.quantity
            }))
        };

        // ✅ Append new confirmed order
        const confirmedOrders = userData.confirmedOrders || [];
        confirmedOrders.push(newConfirmedOrder);

        // ✅ Update JSON Server: Move orders to `confirmedOrders` and clear `orders`
        const updateResponse = await fetch(`http://localhost:3000/User/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                confirmedOrders: confirmedOrders,
                orders: [] // Clear the `orders` array
            })
        });

        if (!updateResponse.ok) throw new Error("Failed to update order data.");
        console.log("Orders moved to confirmedOrders successfully.");

    } catch (error) {
        console.error("Error processing orders:", error);
    }
}

/**
 * Step 2: Fetch and Display Confirmed Orders
 */
async function fetchConfirmedOrders() {
    const userId = localStorage.getItem("userId");
    const batchId = localStorage.getItem("batchId");

    if (!userId || !batchId) {
        console.error("User ID or Batch ID not found in localStorage");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/User/${userId}`);
        const user = await response.json();

        const confirmedOrders = user.confirmedOrders || [];
        const matchingOrder = confirmedOrders.find(order => order.batchId === batchId);

        if (!matchingOrder) {
            document.getElementById("order-container").innerHTML = "<p>No matching orders found.</p>";
            return;
        }

        // Generate dynamic order items
        document.getElementById("order-container").innerHTML = matchingOrder.orders.map(order => `
            <div class="row m-0 mt-2 ms-sm-2 ms-md-0">
                <div class="col-12 col-sm-3 col-md-12 col-lg-4">
                    <img src="${order.image}" alt="${order.name}" class="w-100 V_eveline_height">
                </div>
                <div class="col-12 col-sm-9 col-md-12 col-lg-8 d-flex flex-lg-row flex-column justify-content-between">
                    <div class="V_cart_item_text w-100">
                        <p class="text mb-0 mt-2 mt-lg-0">${order.name}</p>
                        <p class="text m-0 mt-2"> <span class="V_shade">Shade :</span> ${order.selectedColor || "N/A"} </p>
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
        console.error("Error fetching confirmed orders:", error);
    }
}

/**
 * Step 3: Fetch and Calculate Confirmed Order Total
 */
async function fetchAndCalculateConfirmedOrderTotal() {
    const userId = localStorage.getItem("userId");
    const batchId = localStorage.getItem("batchId");

    if (!userId || !batchId) {
        console.error("User ID or Batch ID not found in localStorage");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/User/${userId}`);
        const user = await response.json();

        const confirmedOrders = user.confirmedOrders || [];
        const matchingOrder = confirmedOrders.find(order => order.batchId === batchId);

        if (!matchingOrder) {
            document.getElementById("price-details-container").innerHTML = "<p>No confirmed orders found.</p>";
            return;
        }

        let totalItems = 0, totalPrice = 0, totalDiscount = 0, platformFee = 1;

        matchingOrder.orders.forEach(order => {
            totalItems += order.quantity;
            totalPrice += order.currentPrice * order.quantity;
            totalDiscount += (order.currentPrice * order.quantity) * 0.2;
        });

        const finalTotal = totalPrice - totalDiscount + platformFee;
       
        document.getElementById("total-items").innerText = totalItems;
        
        document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;
        document.getElementById("discount").innerText = `-$${totalDiscount.toFixed(2)}`;
        document.getElementById("final-total").innerText = `$${finalTotal.toFixed(2)}`;
        document.getElementById("final-total1").innerText = `$${finalTotal.toFixed(2)}`;
    } catch (error) {
        console.error("Error fetching confirmed orders:", error);
    }
}

/**
 * Step 4: Display Batch ID
 */
function displayBatchId() {
    const batchId = localStorage.getItem("batchId");
    if (batchId) document.getElementById("id").innerText = batchId;
}
