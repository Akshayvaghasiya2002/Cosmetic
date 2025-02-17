function changeColor(element, type) {
    console.log(`Button clicked: ${type}`);  // Add this log to check if the type is being passed correctly.

    // Remove the 'selected' class from all buttons
    const buttons = document.querySelectorAll('.V_layout');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

    // Add the 'selected' class to the clicked button
    element.classList.add('selected');

    // Debugging: Check which button is clicked
    if (type.trim() === 'Other') {
        console.log("Other button clicked. Showing the 'Other' section.");
        showOtherSection();  // Show the hidden section if 'Other' button is clicked
    }
}

// Function to show or hide the 'Other' input section
function showOtherSection() {
    const hiddenSection = document.querySelector('.V_other');
    
    // Toggle the visibility of the section by adding/removing 'd-none' 
    hiddenSection.classList.toggle('d-none');
}



document.addEventListener("DOMContentLoaded", function () {
    // Select both address divs
    const addressDivs = document.querySelectorAll(".V_select_add, .V_select_add1");

    // Add click event listener to each address div
    addressDivs.forEach(div => {
        div.addEventListener("click", function () {
            // Remove "selected" class from all divs
            addressDivs.forEach(item => item.classList.remove("selected_border"));

            // Add "selected" class to the clicked div
            this.classList.add("selected_border");
        });
    });
});







document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".V_proceed_payment").addEventListener("click", saveAddress);
});

async function saveAddress() {
    const userId = localStorage.getItem("userId"); // Get user ID from local storage

    if (!userId) {
        alert("User is not logged in!");
        return;
    }

    // Collect input values
    const addressData = {
        firstName: document.getElementById("first").value,
        lastName: document.getElementById("last").value,
        mobileNumber: document.getElementById("Mobileno").value,
        email: document.getElementById("Email").value,
        zipCode: document.getElementById("ZIP/Postal").value,
        address1: document.getElementById("address1").value,
        address2: document.getElementById("address2").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        country: document.getElementById("counrty").value,
        addressType: document.querySelector(".V_layout.selected") 
                     ? document.querySelector(".V_layout.selected").innerText 
                     : "Other"
    };

    try {
        // Fetch user data from JSON server
        let response = await fetch(`http://localhost:3000/users/${userId}`);
        let user = await response.json();

        if (!user) {
            alert("User not found!");
            return;
        }

        // Add address inside the user's object
        if (!user.addresses) {
            user.addresses = []; // Create addresses array if not exists
        }
        user.addresses.push(addressData);

        // Update user data on JSON server
        await fetch(`http://localhost:3000/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        // Store updated user data in local storage
        localStorage.setItem("userData", JSON.stringify(user));

        alert("Address saved successfully!");
    } catch (error) {
        console.error("Error saving address:", error);
        alert("Failed to save address. Please try again.");
    }
}

// Function to handle address type selection




