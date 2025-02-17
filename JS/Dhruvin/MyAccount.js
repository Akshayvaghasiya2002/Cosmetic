document.getElementById("calendarIcon").addEventListener("click", function() {
    document.getElementById("datePicker").showPicker();
});


function handleManage(element) {
    const value = element.dataset.value;
    
    if (value === "6") {
        // Open the modal if the logout button is clicked
        const modalElement = document.getElementById("logOutModal");
        if (modalElement) {
            let modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            console.error("Logout modal not found.");
        }
        return; // Stop further execution
    }

    // Other menu items handling
    const menuItems = document.querySelectorAll(".ds_func_manage, .ds_func_manage2, .ds_func_manage3, .ds_func_manage4, .ds_func_manage5, .ds_func_manage6");
    const sections = {
        1: document.getElementById("profileSection"),
        2: document.getElementById("orderSection"),
        3: document.getElementById("addressSection"),
        4: document.getElementById("passwordSection"),
        5: document.getElementById("deactivateSection"),
    };

    // Remove active class from all menu items
    menuItems.forEach(item => item.classList.remove("ds_active-border"));

    // Hide all sections
    Object.values(sections).forEach(section => {
        if (section) section.classList.add("d-none");
    });

    // Activate the selected menu item and show the corresponding section
    if (sections[value]) {
        // console.log("bgnrjkbgnrkbgoik " , sections[value]);
        element.classList.add("ds_active-border");
        sections[value].classList.remove("d-none");

        const sectionH4 = sections[value].querySelector("h4");
        if (sectionH4) {
            document.getElementById("ds_above_text").innerHTML = sectionH4.textContent.trim()
            // console.log("Section Title:", sectionH4.textContent.trim()); // Logs the text of the <h4>
        }
    }
}

// *********** My Profile **********

// ----- Edit Profile 
function handleEditSubmit(event) {
    event.preventDefault();

    let firstName = document.getElementById("ds_edit_first").value.trim();
    let lastName = document.getElementById("ds_edit_last").value.trim();
    let mobile = document.getElementById("ds_edit_mobile").value.trim();
    let email = document.getElementById("ds_edit_email").value.trim();
    let dob = document.getElementById("datePicker").value.trim();
    let femaleChecked = document.getElementById("female").checked;
    let maleChecked = document.getElementById("male").checked;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/; // Assumes a 10-digit mobile number

    if (firstName === "") {
        alert("First Name is required");
        return;
    }
    if (lastName === "") {
        alert("Last Name is required");
        return;
    }
    if (!mobilePattern.test(mobile)) {
        alert("Enter a valid 10-digit Mobile Number");
        return;
    }
    if (!emailPattern.test(email)) {
        alert("Enter a valid Email Address");
        return;
    }
    if (dob === "") {
        alert("Date of Birth is required");
        return;
    }
    if (!femaleChecked && !maleChecked) {
        alert("Please select a gender");
        return;
    }

    alert("Form submitted successfully!");
}





// *********** My Address **********
function toggleDropdown(icon) {
    let dropdown = icon.parentElement.parentElement.querySelector(".ds_add_dropdown");

    // Hide all other dropdowns
    document.querySelectorAll(".ds_add_dropdown").forEach(d => {
        if (d !== dropdown) d.classList.add("d-none");
    });

    // Toggle the clicked dropdown
    dropdown.classList.toggle("d-none");
}

function selectAddressType(button, type) {
    // Remove active class from all buttons
    document.querySelectorAll('.ds_add_popup_btn, .ds_add_non_select').forEach(btn => {
        btn.classList.remove('ds_add_popup_btn');
        btn.classList.add('ds_add_non_select');
    });

    // Add active class to the selected button
    button.classList.remove('ds_add_non_select');
    button.classList.add('ds_add_popup_btn');

}

// --- Gender Selection 
function selectGender(gender) {
    document.querySelectorAll('.gender-option').forEach(el => el.classList.remove('active'));

    let selectedInput = document.getElementById(gender);
    selectedInput.checked = true;
    selectedInput.parentElement.classList.add('active');
}

let selectedAddressType = "Home";

function selectAddressType(button, type , event) {
    event.preventDefault()
    document.querySelectorAll('.ds_add_popup_btn, .ds_add_non_select').forEach(btn => {
        btn.classList.remove('ds_add_popup_btn');
        btn.classList.add('ds_add_non_select');
    });

    button.classList.remove('ds_add_non_select');
    button.classList.add('ds_add_popup_btn');

    selectedAddressType = type;
}

// ------ add address popup
function handleAddress(event) {
    event.preventDefault();

    let firstName = document.getElementById("ds_add_first")?.value.trim();
    let lastName = document.getElementById("ds_add_last")?.value.trim();
    let mobile = document.getElementById("ds_add_mobile")?.value.trim();
    let email = document.getElementById("ds_add_email")?.value.trim();
    let zip = document.getElementById("ds_add_zip")?.value.trim();
    let address = document.getElementById("ds_add_bilding")?.value.trim();
    let city = document.getElementById("ds_add_city")?.value.trim();
    let state = document.querySelector("select.ds_pro_input[name='state']")?.value;
    let country = document.querySelector("select.ds_pro_input[name='country']")?.value;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/;
    let zipPattern = /^\d{5,}$/; // Minimum 5 digits ZIP Code

    if (!firstName) {
        alert("First Name is required");
        return;
    }
    if (!lastName) {
        alert("Last Name is required");
        return;
    }
    if (!mobilePattern.test(mobile)) {
        alert("Enter a valid 10-digit Mobile Number");
        return;
    }
    if (!emailPattern.test(email)) {
        alert("Enter a valid Email Address");
        return;
    }
    if (!zipPattern.test(zip)) {
        alert("Enter a valid ZIP / Postal Code (at least 5 digits)");
        return;
    }
    if (!address) {
        alert("Address is required");
        return;
    }
    if (!city) {
        alert("City is required");
        return;
    }
    if (!state || state === "State") {
        alert("Please select a State");
        return;
    }
    if (!country || country === "Country") {
        alert("Please select a Country");
        return;
    }
    if (!selectedAddressType) {
        alert("Please select an Address Type (Home, Office, or Other)");
        return;
    }

    alert("Address saved successfully!");
    // Close the modal
    $('#addressModal').hide(); // Hide the modal
    
    // Remove the backdrop
    $('.modal-backdrop').remove(); // Remove the backdrop

}

// ------ Edit address popup
function handleEditAddress(event) {
    event.preventDefault(); // Prevent the form from submitting until validation is complete
    
    let firstName = document.getElementById("ds_add_edit_first")?.value.trim();
    let lastName = document.getElementById("ds_add_edit_last")?.value.trim();
    let mobile = document.getElementById("ds_add_edit_mobile")?.value.trim();
    let email = document.getElementById("ds_add_edit_email")?.value.trim();
    let zip = document.getElementById("ds_add_edit_zip")?.value.trim();
    let address = document.getElementById("ds_add_edit_bilding")?.value.trim();
    let city = document.getElementById("ds_add_edit_city")?.value.trim();
    let state = document.querySelector("select.ds_pro_input[name='ds_state']")?.value;
    let country = document.querySelector("select.ds_pro_input[name='ds_country']")?.value;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/;
    let zipPattern = /^\d{5,}$/; // Minimum 5 digits ZIP Code

    if (!firstName) {
        alert("First Name is required");
        return;
    }
    if (!lastName) {
        alert("Last Name is required");
        return;
    }
    if (!mobilePattern.test(mobile)) {
        alert("Enter a valid 10-digit Mobile Number");
        return;
    }
    if (!emailPattern.test(email)) {
        alert("Enter a valid Email Address");
        return;
    }
    if (!zipPattern.test(zip)) {
        alert("Enter a valid ZIP / Postal Code (at least 5 digits)");
        return;
    }
    if (!address) {
        alert("Address is required");
        return;
    }
    if (!city) {
        alert("City is required");
        return;
    }
    if (!state || state === "State") {
        alert("Please select a State");
        return;
    }
    if (!country || country === "Country") {
        alert("Please select a Country");
        return;
    }
    if (!selectedAddressType) {
        alert("Please select an Address Type (Home, Office, or Other)");
        return;
    }

    alert("Address saved successfully!");
    // Close the modal
    $('#editModal').hide(); // Hide the modal
    
    // Remove the backdrop
    $('.modal-backdrop').remove(); // Remove the backdrop
}



// Hide dropdowns when clicking outside
document.addEventListener("click", function (event) {
    if (!event.target.closest(".fa-ellipsis-vertical")) {
        document.querySelectorAll(".ds_add_dropdown").forEach(d => d.classList.add("d-none"));
    }
});


// <!-- -------------- Deactivate  Account Popup  -------------- -->

const otpFields = document.querySelectorAll('.ds_deactivate_otp');

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
