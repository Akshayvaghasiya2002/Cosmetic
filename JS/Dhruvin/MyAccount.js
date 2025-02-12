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

// Hide dropdowns when clicking outside
document.addEventListener("click", function (event) {
    if (!event.target.closest(".fa-ellipsis-vertical")) {
        document.querySelectorAll(".ds_add_dropdown").forEach(d => d.classList.add("d-none"));
    }
});