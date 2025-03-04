document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        console.warn("User is not logged in!");
        return;
    }

    try {
        // Fetch user data from JSON server
        let response = await fetch(`http://localhost:3000/User/${userId}`);
        if (!response.ok) {
            console.error("User not found in the database!");
            return;
        }

        let user = await response.json();

        // Check if the user has addresses
        let hasAddress = user.addresses && user.addresses.length > 0;

        // Toggle visibility based on address existence
        document.querySelector(".V_add_address_first_time").classList.toggle("d-none", hasAddress);
        document.querySelector(".V_already_add_in_DB").classList.toggle("d-none", !hasAddress);

    } catch (error) {   
        console.error("Error fetching user data:", error);
    }
});



document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem("userId");
    const addressContainer = document.getElementById("addressContainer");
    const proceedToPayment = document.getElementById("proceedToPayment");

    if (!userId) {
        console.warn("User is not logged in!");
        return;
    }

    try {
        // Load the modal HTML dynamically from another file
        // await loadModal();

        // Fetch user data
        let response = await fetch(`http://localhost:3000/User/${userId}`);
        if (!response.ok) {
            console.error("User not found in the database!");
            return;
        }

        let user = await response.json();

        if (!user.addresses || user.addresses.length === 0) {
            console.warn("No addresses found for this user.");
            return;
        }

        // Clear existing addresses
        addressContainer.innerHTML = "";

        // Loop through addresses and create HTML dynamically
        user.addresses.forEach((address, index) => {
            let addressHTML = `
                <div class="col-12 col-sm-6 mb-3">
                    <div class="V_select_add1 ${index === 0 ? "selected_border" : ""}" data-address-id="${address.id}">
                        <p class="py-2 px-3 V_place mb-0 text-center my-3 ms-4 ms-xl-5 text">${address.addressType || "Home"}</p>
                        <hr class="V_line mx-auto mt-3">
                        <p class="text ms-4 ms-xl-5 V_nsme">${address.firstName} ${address.lastName}</p>
                        <p class="text ms-4 ms-xl-5 V_nsme">${address.mobileNumber}</p>
                        <p class="text mx-4 mx-xl-5 V_Address">${address.address1}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}</p>
                        <p class="py-2 px-3 ms-4 ms-xl-5 V_change text-center change-address-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Change
                        </p>
                    </div>
                </div>
            `;
            addressContainer.innerHTML += addressHTML;
        });

        // Store first address ID in localStorage by default
        localStorage.setItem("selectedAddressId", user.addresses[0].id);

        // Add event listener to all address divs for selection
        setupAddressSelection();

        // Add event listener to "Change" buttons to open modal and populate data
        setupChangeAddress(user.addresses);

        // Show "Proceed to Payment" button if at least one address exists
        proceedToPayment.classList.remove("d-none");

    } catch (error) {
        console.error("Error fetching user data:", error);
    }
});

function setupAddressSelection() {
    const addressDivs = document.querySelectorAll(".V_select_add1");
    const changeButtons = document.querySelectorAll(".V_change");

    // Function to handle selection
    function selectAddress(element) {
        // Remove "selected_border" class from all addresses
        addressDivs.forEach(item => item.classList.remove("selected_border"));

        // Find the closest address div
        const addressDiv = element.closest(".V_select_add1");
        if (!addressDiv) return;

        // Add "selected_border" class to the clicked address
        addressDiv.classList.add("selected_border");

        // Store the selected address ID in localStorage
        const selectedAddressId = addressDiv.getAttribute("data-address-id");
        localStorage.setItem("selectedAddressId", selectedAddressId);
        console.log("Selected Address ID stored:", selectedAddressId);
    }

    // Attach event listener to all address divs
    addressDivs.forEach(div => {
        div.addEventListener("click", function () {
            selectAddress(this);
        });
    });

    // Attach event listener to all change buttons
    changeButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent the event from bubbling to parent
            selectAddress(this);
        });
    });
}

// Call the function after rendering addresses
setupAddressSelection();


function setupChangeAddress(addresses) {
    document.querySelectorAll(".change-address-btn").forEach(button => {
        button.addEventListener("click", async function () {
            const selectedAddressId = localStorage.getItem("selectedAddressId");
            const userId = localStorage.getItem("userId");

            if (!userId || !selectedAddressId) {
                console.error("User ID or Address ID is missing!");
                return;
            }

            try {
                // Fetch user data
                let userResponse = await fetch(`http://localhost:3000/User/${userId}`);
                if (!userResponse.ok) {
                    console.error("User not found in the database!");
                    return;
                }

                let userData = await userResponse.json();

                // Find the selected address
                let selectedAddress = userData.addresses.find(address => address.id === parseInt(selectedAddressId));
                if (!selectedAddress) {
                    console.error("Address not found!");
                    return;
                }

                // Show modal
                // const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
                // modal.show();

                // Populate modal fields
                document.querySelector(".first").value = selectedAddress.firstName;
                document.querySelector(".last").value = selectedAddress.lastName;
                document.querySelector(".Mobileno").value = selectedAddress.mobileNumber;
                document.querySelector(".Email").value = selectedAddress.email;
                document.querySelector(".ZIP_Postal").value = selectedAddress.zipCode;
                document.querySelector(".address1").value = selectedAddress.address1;
                document.querySelector(".address2").value = selectedAddress.address2 || "";
                document.querySelector(".city").value = selectedAddress.city;
                document.querySelector(".state").value = selectedAddress.state;
                document.querySelector(".counrty").value = selectedAddress.country;

                // Handle update button click
                document.querySelector(".V_save_change").onclick = async function () {
                    if (!validateForm1()) return; // Stop execution if validation fails

                
                    // Get updated values
                    const updatedAddress = {
                        firstName: document.querySelector(".first").value,
                        lastName: document.querySelector(".last").value,
                        mobileNumber: document.querySelector(".Mobileno").value,
                        email: document.querySelector(".Email").value,
                        zipCode: document.querySelector(".ZIP_Postal").value,
                        address1: document.querySelector(".address1").value,
                        address2: document.querySelector(".address2").value,
                        city: document.querySelector(".city").value,
                        state: document.querySelector(".state").value,
                        country: document.querySelector(".counrty").value
                    };

                    // Update only the selected address in the array
                    let updatedAddresses = userData.addresses.map(address =>
                        address.id === parseInt(selectedAddressId) ? { ...address, ...updatedAddress } : address
                    );

                    // Send PATCH request to update the user data
                    let updateResponse = await fetch(`http://localhost:3000/User/${userId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ addresses: updatedAddresses })
                    });

                    if (updateResponse.ok) {
                        console.log("Address updated successfully!");
                        // modal.hide(); // Close modal after update
                    } else {
                        console.error("Failed to update address!");
                    }
                };
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        });
    });

    // Handle cancel button click
    document.querySelector(".V_cancle").addEventListener("click", function () {
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();
    });

    // Handle close button click
    document.querySelector(".btn-close").addEventListener("click", function () {
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();
    });
}


function validateForm1() {
    let firstName = document.querySelector(".first").value.trim();
    let lastName = document.querySelector(".last").value.trim();
    let mobileNumber = document.querySelector(".Mobileno").value.trim();
    let email = document.querySelector(".Email").value.trim();
    let zipCode = document.querySelector(".ZIP_Postal").value.trim();
    let address1 = document.querySelector(".address1").value.trim();
    let city = document.querySelector(".city").value.trim();
    let state = document.querySelector(".state").value.trim();
    let country = document.querySelector(".counrty").value.trim();

    if (!firstName || !lastName || !mobileNumber || !email || !zipCode || !address1 || !city || !state || !country) {
        alert("please fill all the fields except street address2");
        return false;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
        alert("Please enter a valid 10-digit mobile number.");
        return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (!/^\d{5,6}$/.test(zipCode)) {
        alert("ZIP/Postal Code should be 5 or 6 digits.");
        return false;
    }

    return true; // Validation passed
}









// =====================  Add Address Page   ========================= 


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".V_add_click").addEventListener("click", function () {
        if (validateForm()) {
            saveAddress();
        }
    });

    // Handle Address Type Selection
    document.querySelectorAll(".V_layout").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".V_layout").forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");

            if (this.id === "Other") {
                document.querySelector(".V_other").classList.remove("d-none"); // Show input field
            } else {
                document.querySelector(".V_other").classList.add("d-none"); // Hide input field
            }
        });
    });
});

// Function to validate form inputs
function validateForm() {
    let errors = [];

    function validateField(id, errorMsg) {
        let field = document.getElementById(id);
        if (!field.value.trim()) {
            errors.push(errorMsg);
        }
    }

    validateField("first", "First Name is required.");
    validateField("last", "Last Name is required.");
    validateField("Mobileno", "Mobile Number is required.");
    validateField("Email", "Email is required.");
    validateField("ZIP_Postal", "ZIP/Postal Code is required.");
    validateField("address1", "Address is required.");
    validateField("city", "City is required.");

    // Validate Select Dropdowns
    let state = document.getElementById("state").value;
    let country = document.getElementById("counrty").value;

    if (state === "State") {
        errors.push("Please select a state.");
    }
    if (country === "Country") {
        errors.push("Please select a country.");
    }

    // Validate Address Type
    let selectedButton = document.querySelector(".V_layout.selected");
    if (!selectedButton) {
        errors.push("Please select an address type.");
    } else if (selectedButton.id === "Other") {
        let otherType = document.getElementById("exampleInputEmail1").value.trim();
        if (!otherType) {
            errors.push("Please specify the 'Other' address type.");
        }
    }

    // **🔹 RegEx Validation for Email & Mobile Number**
    let email = document.getElementById("Email").value.trim();
    let mobile = document.getElementById("Mobileno").value.trim();

    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email validation
    let mobilePattern = /^[6-9]\d{9}$/; // Mobile number should start with 6-9 and be 10 digits

    if (!emailPattern.test(email)) {
        errors.push("Invalid Email format.");
    }
    if (!mobilePattern.test(mobile)) {
        errors.push("Invalid Mobile Number format. Must be 10 digits starting with 6-9.");
    }

    // **🔹 If Errors Exist, Show All in One Alert**
    if (errors.length > 0) {
        alert("Please fix the following errors:\n\n" + errors.join("\n"));
        return false; // Prevent form submission
    }

    return true; // Proceed with saving address
}

async function saveAddress() {
    const userId = localStorage.getItem("userId"); // Get user ID from local storage
    console.log('userId', userId);

    if (!userId) {
        alert("User is not logged in!");
        return;
    }

    // Get selected Address Type
    let selectedButton = document.querySelector(".V_layout.selected");
    let addressType = selectedButton ? selectedButton.innerText.trim() : "Other";

    let otherTypeValue = addressType === "Other"
        ? document.getElementById("exampleInputEmail1").value.trim()
        : null;

    // Collect input values
    const addressData = {
        id: Date.now(), // Unique ID for each address
        firstName: document.getElementById("first").value.trim(),
        lastName: document.getElementById("last").value.trim(),
        mobileNumber: document.getElementById("Mobileno").value.trim(),
        email: document.getElementById("Email").value.trim(),
        zipCode: document.getElementById("ZIP_Postal").value.trim(),
        address1: document.getElementById("address1").value.trim(),
        address2: document.getElementById("address2").value.trim(),
        city: document.getElementById("city").value.trim(),
        state: document.getElementById("state").value.trim(),
        country: document.getElementById("counrty").value.trim(),
        addressType: addressType,
        otherType: otherTypeValue
    };

    try {
        // Fetch user data from JSON server
        let response = await fetch(`http://localhost:3000/User/${userId}`);
        let user;

        if (response.ok) {
            user = await response.json();
        } else {
            alert("User not found in the database!");
            return;
        }

        if (!user.addresses) {
            user.addresses = []; // Ensure addresses array exists
        }

        user.addresses.push(addressData); // Append new address

        // Update user data in JSON server (PUT request)
        await fetch(`http://localhost:3000/User/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        alert("Address saved successfully in JSON server!");

        window.location.href = "../../Parth/Payment.html"; 
    } catch (error) {
        console.error("Error saving address:", error);
        alert("Failed to save address. Please try again.");
    }
}



function payment() {
    window.location.href = "../../Parth/Payment.html";
}



// ===================   Add Address Popup Modal   ==================== 


let selectedAddressType = 'Home';

function selectAddressType(button, type, event) {
        event.preventDefault();

        // Reset button states
        document.querySelectorAll('.ds_add_popup_btn, .ds_add_non_select').forEach(btn => {
            btn.classList.remove('ds_add_popup_btn');
            btn.classList.add('ds_add_non_select');
        });

        // Highlight the selected button
        button.classList.remove('ds_add_non_select');
        button.classList.add('ds_add_popup_btn');

        // Set selected address type
        selectedAddressType = type;

        // Show or hide input field based on the selected address type
        const inputContainer = document.getElementById('ds_address_type');
        if (type === 'Other') {
            inputContainer.style.display = 'block'; // Show input field for 'Other'
        } else {
            inputContainer.style.display = 'none'; // Hide input field for other types
        }
}

async function handleAddress(event) {
    event.preventDefault();
    const userID = localStorage.getItem("userId")

    let firstName = document.getElementById("ds_add_first")?.value.trim();
    let lastName = document.getElementById("ds_add_last")?.value.trim();
    let mobile = document.getElementById("ds_add_mobile")?.value.trim();
    let email = document.getElementById("ds_add_email")?.value.trim();
    let zip = document.getElementById("ds_add_zip")?.value.trim();
    let address = document.getElementById("ds_add_bilding")?.value.trim();
    let address2 = document.getElementById("ds_add_street")?.value.trim();
    let city = document.getElementById("ds_add_city")?.value.trim();
    let state = document.querySelector("select.ds_pro_input[name='state']")?.value;
    let country = document.querySelector("select.ds_pro_input[name='country']")?.value;
    let otherAddress = document.getElementById("ds_address_type_input")?.value.trim();

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/;
    let zipPattern = /^\d{5,}$/;

    // Validation checks
    if (!firstName || !lastName || !mobilePattern.test(mobile) || !emailPattern.test(email)
 ||
        !zipPattern.test(zip) || !address || !city || !state || !country || !selectedAddressType) {
        alert("Please fill all required fields correctly.");
        return;
    }

    if (selectedAddressType === "Other" && !otherAddress) {
        alert("Please enter an Address Type for 'Other'");
        return;
    }

    // Collect the address data
    const addressData = {
        id: Date.now(), 
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobile,
        email: email,
        zipCode: zip,
        address1: address,
        address2: address2 || "",
        city: city,
        state: state,
        country: country,
        addressType: selectedAddressType,
        otherType: otherAddress || ""
    };

    // Send the address data to the backend
    try {
        // This should be dynamically fetched based on the logged-in user
        const userResponse = await fetch(`http://localhost:3000/User/${userID}`);
        const userData = await userResponse.json();
        console.log('userID', userID);

        if (!userData.addresses) {
            userData.addresses = []; // Initialize addresses array if not already present
        }

        // Add the new address to the user's addresses
        userData.addresses.push(addressData);

        // Update the user data in the database (db.json)
        await fetch(`http://localhost:3000/User/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        alert("Address saved successfully!");

        // Close the modal 
        $('#addressModal').hide();
        $('.modal-backdrop').remove(); // Remove the backdrop

    } catch (error) {
        console.error("Error while saving address: ", error);
        alert("Failed to save address.");
    }

}




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


    const currentDate = new Date(); // Define current date
    const deliveryDate = new Date(currentDate); // Create a new date object
    deliveryDate.setDate(currentDate.getDate() + 10); // Add 10 days
    
    const options = { year: "numeric", month: "long", day: "numeric" };
    document.getElementById("expiryDtae").innerText = deliveryDate.toLocaleDateString("en-US", options);
    
    
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
        document.getElementById("discount").innerText = `-$${parseFloat(totalDiscount)}`;
        document.getElementById("final-total").innerText = `$${finalTotal.toFixed(2)}`;

    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

// Call function on page load
fetchAndCalculateOrderTotal();







