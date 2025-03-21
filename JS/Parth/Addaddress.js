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


// function setupChangeAddress(addresses) {
//     document.querySelectorAll(".change-address-btn").forEach(button => {
//         button.addEventListener("click", async function () {
//             const selectedAddressId = localStorage.getItem("selectedAddressId");
//             const userId = localStorage.getItem("userId");

//             if (!userId || !selectedAddressId) {
//                 console.error("User ID or Address ID is missing!");
//                 return;
//             }

//             try {
//                 // Fetch user data
//                 let userResponse = await fetch(`http://localhost:3000/User/${userId}`);
//                 if (!userResponse.ok) {
//                     console.error("User not found in the database!");
//                     return;
//                 }

//                 let userData = await userResponse.json();

//                 // Find the selected address
//                 let selectedAddress = userData.addresses.find(address => address.id === parseInt(selectedAddressId));
//                 console.log('selectedAddress', selectedAddress);
//                 if (!selectedAddress) {
//                     console.error("Address not found!");
//                     return;
//                 }

//                 // Show modal
//                 // const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
//                 // modal.show();

//                 // Populate modal fields
//                 document.querySelector(".first").value = selectedAddress.firstName;
//                 document.querySelector(".last").value = selectedAddress.lastName;
//                 document.querySelector(".Mobileno").value = selectedAddress.mobileNumber;
//                 document.querySelector(".Email").value = selectedAddress.email;
//                 document.querySelector(".ZIP_Postal").value = selectedAddress.zipCode;
//                 document.querySelector(".address1").value = selectedAddress.address1;
//                 document.querySelector(".address2").value = selectedAddress.address2 || "";
//                 document.querySelector(".city").value = selectedAddress.city;
//                 // document.querySelector(".state").value = selectedAddress.state;
//                 // document.querySelector(".counrty").value = selectedAddress.country;
//                  // Fixed selectors for dropdown elements
//                  document.querySelector("select[name='V_state']").value = selectedAddress.state || "";
//                  document.querySelector("select[name='v_country']").value = selectedAddress.country || "";
//                 // Handle update button click
//                 document.querySelector(".V_save_change").onclick = async function () {
//                     if (!validateForm2()) return; // Stop execution if validation fails

                
//                     // Get updated values
//                     const updatedAddress = {
//                         firstName: document.querySelector(".first").value,
//                         lastName: document.querySelector(".last").value,
//                         mobileNumber: document.querySelector(".Mobileno").value,
//                         email: document.querySelector(".Email").value,
//                         zipCode: document.querySelector(".ZIP_Postal").value,
//                         address1: document.querySelector(".address1").value,
//                         address2: document.querySelector(".address2").value,
//                         city: document.querySelector(".city").value,
//                         // Fixed selectors to get values from dropdowns
//                         state: document.querySelector("select[name='V_state']").value,
//                         country: document.querySelector("select[name='v_country']").value
//                     };

//                     // Update only the selected address in the array
//                     let updatedAddresses = userData.addresses.map(address =>
//                         address.id === parseInt(selectedAddressId) ? { ...address, ...updatedAddress } : address
//                     );

//                     // Send PATCH request to update the user data
//                     let updateResponse = await fetch(`http://localhost:3000/User/${userId}`, {
//                         method: "PATCH",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({ addresses: updatedAddresses })
//                     });

//                     if (updateResponse.ok) {
//                         console.log("Address updated successfully!");
//                         // modal.hide(); // Close modal after update
//                     } else {
//                         console.error("Failed to update address!");
//                     }
//                 };
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             }
//         });
//     });

//     // Handle cancel button click
//     document.querySelector(".V_cancle").addEventListener("click", function () {
//         const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
//         modal.hide();
//     });

//     // Handle close button click
//     document.querySelector(".btn-close").addEventListener("click", function () {
//         const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
//         modal.hide();
//     });
// }



// function validateForm2() {
//     let firstName = document.querySelector(".first").value.trim();
//     let lastName = document.querySelector(".last").value.trim();
//     let mobileNumber = document.querySelector(".Mobileno").value.trim();
//     let email = document.querySelector(".Email").value.trim();
//     let zipCode = document.querySelector(".ZIP_Postal").value.trim();
//     let address1 = document.querySelector(".address1").value.trim();
//     let city = document.querySelector(".city").value.trim();
//     let state = document.querySelector(".state").value.trim();
//     let country = document.querySelector(".counrty").value.trim();

//     if (!firstName || !lastName || !mobileNumber || !email || !zipCode || !address1 || !city || !state || !country) {
//         alert("please fill all the fields except street address2");
//         return false;
//     }

//     if (!/^\d{10}$/.test(mobileNumber)) {
//         alert("Please enter a valid 10-digit mobile number.");
//         return false;
//     }

//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//         alert("Please enter a valid email address.");
//         return false;
//     }

//     if (!/^\d{5,6}$/.test(zipCode)) {
//         alert("ZIP/Postal Code should be 5 or 6 digits.");
//         return false;
//     }

//     return true; // Validation passed
// }




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
                console.log('selectedAddress', selectedAddress);
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
                
                // Set values for dropdown elements - using both class and name attribute for certainty
                const stateSelect = document.querySelector("select.state");
                const countrySelect = document.querySelector("select.counrty");
                
                console.log("State from database:", selectedAddress.state);
                console.log("Country from database:", selectedAddress.country);
                
                if (stateSelect) {
                    stateSelect.value = selectedAddress.state || "";
                    console.log("State dropdown set to:", stateSelect.value);
                }
                
                if (countrySelect) {
                    countrySelect.value = selectedAddress.country || "";
                    console.log("Country dropdown set to:", countrySelect.value);
                }
                
                // Handle update button click
                document.querySelector(".V_save_change").onclick = async function () {
                    if (!validateForm2()) return; // Stop execution if validation fails

                    // Get updated values
                    const updatedAddress = {
                        id: parseInt(selectedAddressId), // Make sure ID is preserved
                        firstName: document.querySelector(".first").value,
                        lastName: document.querySelector(".last").value,
                        mobileNumber: document.querySelector(".Mobileno").value,
                        email: document.querySelector(".Email").value,
                        zipCode: document.querySelector(".ZIP_Postal").value,
                        address1: document.querySelector(".address1").value,
                        address2: document.querySelector(".address2").value,
                        city: document.querySelector(".city").value,
                        state: document.querySelector("select.state").value,
                        country: document.querySelector("select.counrty").value
                    };

                    console.log("Updated address data:", updatedAddress);

                    // Update only the selected address in the array
                    let updatedAddresses = userData.addresses.map(address =>
                        address.id === parseInt(selectedAddressId) ? { ...address, ...updatedAddress } : address
                    );

                    console.log("Full addresses array being sent:", updatedAddresses);

                    // Send PATCH request to update the user data
                    let updateResponse = await fetch(`http://localhost:3000/User/${userId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ addresses: updatedAddresses })
                    });

                    if (updateResponse.ok) {
                        console.log("Address updated successfully!");
                        alert("Address updated successfully!");
                        modal.hide(); // Close modal after update
                        // Reload the page to reflect the changes
                        location.reload();
                    } else {
                        console.error("Failed to update address!");
                        alert("Failed to update address. Please try again.");
                    }
                };
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert("An error occurred: " + error.message);
            }
        });
    });

    // Handle cancel button click
    document.querySelector(".V_cancle").addEventListener("click", function () {
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        if (modal) modal.hide();
    });

    // Handle close button click
    document.querySelector(".btn-close").addEventListener("click", function () {
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        if (modal) modal.hide();
    });
}

function validateForm2() {
    let firstName = document.querySelector(".first").value.trim();
    let lastName = document.querySelector(".last").value.trim();
    let mobileNumber = document.querySelector(".Mobileno").value.trim();
    let email = document.querySelector(".Email").value.trim();
    let zipCode = document.querySelector(".ZIP_Postal").value.trim();
    let address1 = document.querySelector(".address1").value.trim();
    let city = document.querySelector(".city").value.trim();
    let state = document.querySelector("select.state").value.trim();
    let country = document.querySelector("select.counrty").value.trim();

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
        let otherType = document.getElementById("Othervalue").value.trim();
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
        ? document.getElementById("Othervalue").value.trim()
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

// ================================================  ADD ADDRESS POPUP MODAL
 

// This function remains unchanged
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

// Fixed handleAddress function
async function handleAddress(event) {
    event.preventDefault();
    const userID = localStorage.getItem("userId");

    let firstName = document.getElementById("ds_add_first")?.value.trim();
    let lastName = document.getElementById("ds_add_last")?.value.trim();
    let mobile = document.getElementById("ds_add_mobile")?.value.trim();
    let email = document.getElementById("ds_add_email")?.value.trim();
    let zip = document.getElementById("ds_add_zip")?.value.trim();
    let address = document.getElementById("ds_add_bilding")?.value.trim();
    let address2 = document.getElementById("ds_add_street")?.value.trim();
    let city = document.getElementById("ds_add_city")?.value.trim();
    
   // Fix the selectors for state and country
   let stateElement = document.querySelector("select.ds_pro_input[name='V_state']");
   let countryElement = document.querySelector("select.ds_pro_input[name='V_country']");
   
   // Check if elements exist before trying to get their values
   let state = stateElement ? stateElement.value : null;
   let country = countryElement ? countryElement.value : null;
   
   let otherAddress = document.getElementById("ds_address_type_input")?.value.trim();

   // Log the values for debugging
   console.log("State:", state);
   console.log("Country:", country);
   console.log("State element:", stateElement);
   console.log("Country element:", countryElement);

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/;
    let zipPattern = /^\d{5,}$/;

    // Validation checks
    if (!firstName || !lastName || !mobilePattern.test(mobile) || !emailPattern.test(email) ||
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
        if (!userResponse.ok) {
            throw new Error("User not found");
        }
        
        const userData = await userResponse.json();
        console.log('userID', userID);

        if (!userData.addresses) {
            userData.addresses = []; // Initialize addresses array if not already present
        }

        // Add the new address to the user's addresses
        userData.addresses.push(addressData);

        // Update the user data in the database (db.json)
        const updateResponse = await fetch(`http://localhost:3000/User/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!updateResponse.ok) {
            throw new Error("Failed to update user data");
        }

        alert("Address saved successfully!");

        // Close the modal using Bootstrap
        const modalElement = document.getElementById('addressModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        } else {
            // Fallback for jQuery
            $('#addressModal').modal('hide');
            $('.modal-backdrop').remove();
        }

    } catch (error) {
        console.error("Error while saving address: ", error);
        alert("Failed to save address: " + error.message);
    }
}

// ==========================================

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
        document.getElementById("discount").innerText = `-$${totalDiscount.toFixed(2)}`;
        document.getElementById("final-total").innerText = `$${finalTotal.toFixed(2)}`;

    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

// Call function on page load
fetchAndCalculateOrderTotal();




















function displayPwd() {

    const displayPassword = document.querySelector(".fa-eye-slash");
    displayPassword.classList.toggle("d-none");
    const hidePassword = document.querySelector(".fa-eye");
    hidePassword.classList.toggle('d-none');

    const fieldtype = document.getElementById("pwd");
    if (fieldtype.type === "password") {
        fieldtype.type = "text";
    } else {
        fieldtype.type = "password";
    }

}

function displayPwd1() {

    const displayNewPassword = document.getElementById("closeeye1");
    displayNewPassword.classList.toggle("d-none");
    const hideNewPassword = document.getElementById("openeye1");
    hideNewPassword.classList.toggle('d-none');

    const newPassword = document.getElementById("pwd1");
    if (newPassword.type === "password") {
        newPassword.type = "text";
    } else {
        newPassword.type = "password";
    }

}

function displayPwd2() {

    const displayConfirmPassword = document.getElementById("closeeye2");
    displayConfirmPassword.classList.toggle("d-none");
    const hideConfirmPassword = document.getElementById("openeye2");
    hideConfirmPassword.classList.toggle('d-none');

    const confirmPassword = document.getElementById("pwd2");
    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
    } else {
        confirmPassword.type = "password";
    }

}

function displayPwd3() {

    const displayConfirmPassword = document.getElementById("closeeye3");
    displayConfirmPassword.classList.toggle("d-none");
    const hideConfirmPassword = document.getElementById("openeye3");
    hideConfirmPassword.classList.toggle('d-none');

    const confirmPassword = document.getElementById("pwd3");
    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
    } else {
        confirmPassword.type = "password";
    }

}

function displayLogin() {
    const displayLogin = document.querySelector(".V_login_section");
    displayLogin.classList.toggle("d-none");
    const displaySignUp = document.querySelector(".V_sign_section");
    displaySignUp.classList.toggle('d-none');
}

function verifyEmail() {
    const hideResister = document.querySelector('.V_sign_section');
    hideResister.classList.add('d-none');
    const displaySignUp = document.querySelector(".V_520");
    displaySignUp.classList.remove('d-none');
    const displayEmail = document.querySelector(".V_verify_email_section");
    displayEmail.classList.remove("d-none");
    const displayOtp = document.querySelector(".V_verify_section");
    displayOtp.classList.add('d-none');
    const displayResetPwd = document.querySelector(".V_reset_section");
    displayResetPwd.classList.add('d-none');
    const hideforPwd = document.querySelector(".V_Forgot_section");
    hideforPwd.classList.add("d-none");
}

function displayForgetPwd() {
    const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) {
                // backdrop.remove(); 
            }
    const displayLogin = document.querySelector(".V_login_section");
    displayLogin.classList.add("d-none");
    const displaySignUp = document.querySelector(".V_520");
    displaySignUp.classList.remove('d-none');
    const displayOtp = document.querySelector(".V_verify_section");
    displayOtp.classList.add('d-none');
    const displayResetPwd = document.querySelector(".V_reset_section");
    displayResetPwd.classList.add('d-none');
    const displayEmail = document.querySelector(".V_verify_email_section");
    displayEmail.classList.add("d-none");
    const RegisterModal = document.querySelector(".V_sign_login");
    RegisterModal.classList.add("d-none");

}

function loginClose() {
    const displayLogin = document.querySelector(".V_login_section");
    displayLogin.classList.add("d-none");
    const displaySignUp = document.querySelector(".V_sign_section");
    displaySignUp.classList.remove('d-none');
}

function asItIs() {
    const displaySignUp = document.querySelector(".V_sign_section");
    displaySignUp.classList.remove("d-none");
    const displayLogin = document.querySelector(".V_520");
    displayLogin.classList.add('d-none');
    const hideforPwd = document.querySelector(".V_Forgot_section");
    hideforPwd.classList.remove("d-none");
}

function verifyOtp1() {
    
    
    const veriEmail = document.getElementById("ds_verify_email").value.trim()
    
    if(registerId){
        if(handleObj?.email == veriEmail){
            const displayOtp = document.querySelector(".V_verify_section");
            displayOtp.classList.remove('d-none'); 
            const hideforPwd = document.querySelector(".V_Forgot_section");
            hideforPwd.classList.add("d-none");
            setTimeout(()=>{
               alert("Your Otp Is -: 123456")
            }, 500)
        }
        else{
            alert("Your Emil Is Wrong!")
        }
    }
}

function resetPassword() {
    let otpInputs = document.querySelectorAll(".ds_verify_otp");
    let enteredOtp = Array.from(otpInputs).map(input => input.value.trim()).join('');
    
    // Check if OTP fields are empty
    if (!enteredOtp || enteredOtp.length !== 6) {
        alert("Please enter a valid 6-digit OTP.");
        return;
    }
    
    // Simulate API call for OTP verification (Replace this with actual API request)
    dsVerifyOtp(enteredOtp).then(isValid => {
        if (!isValid) {
            alert("Invalid OTP. Please try again.");
            return;
        }
        
        // Hide OTP section and show reset password section
        document.querySelector(".V_verify_section").classList.add("d-none");
        document.querySelector(".V_reset_section").classList.remove("d-none");
    }).catch(error => {
        alert("Error verifying OTP. Please try again later.");
        console.error("OTP Verification Error:", error);
    });
}

// Simulated API function (Replace with real API request)
function dsVerifyOtp(otp) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(otp === "123456"); // Replace with actual API logic
        }, 1000);
    });
}


async function handleResetPassword() {
    let newPass = document.getElementById("pwd1").value.trim();
    let conPass = document.getElementById("pwd2").value.trim();
 
    // Password validation regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 
    if (!newPass || !conPass) {
       alert("Both password fields are required.");
       return;
    }
 
    if (!passwordRegex.test(newPass)) {
       alert("Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
       return;
    }
 
    if (newPass !== conPass) {
       alert("Passwords do not match.");
       return;
    }
 
    let obj = {
       fullName: `${handleObj.fullName}`,
       phoneNumber: handleObj?.phoneNumber,
       email: handleObj?.email,
       dateOfBirth: handleObj?.dateOfBirth,
       gender: handleObj?.gender,
       password: conPass,
       addresses: handleObj?.addresses ? handleObj?.addresses : []
    };
 
    try {
       const response = await fetch(`http://localhost:3000/User/${registerId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
       });
 
       console.log("Response:", response);
       alert("Password changed successfully!");
    } catch (error) {
       alert("Error: " + error.message);
    }
 }
 


const otpFields = document.querySelectorAll('.V_otp_6');

otpFields.forEach((field, index) => {
    field.addEventListener('input', (e) => {
        let value = e.target.value;

        // Ensure only a single digit is entered
        e.target.value = value.replace(/\D/g, '').slice(0, 1);

        // Move to next field if a digit is entered
        if (e.target.value && index < otpFields.length - 1) {
            otpFields[index + 1].focus();
        }
    });

    field.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !field.value && index > 0) {
            otpFields[index - 1].focus();
        }
    });
});



function addWishList(event) {
    // Get the clicked heart icon
    const clickedHeart = event.target;

    // Find the container (parent) that holds both hearts
    const heartContainer = clickedHeart.closest(".heart-container");

    // Select the hearts inside the same container
    const regularHeart = heartContainer.querySelector(".fa-regular");
    const solidHeart = heartContainer.querySelector(".fa-solid");

    // Toggle visibility
    regularHeart.classList.toggle("d-none");
    solidHeart.classList.toggle("d-none");
}