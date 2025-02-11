document.getElementById("calendarIcon").addEventListener("click", function() {
    document.getElementById("datePicker").showPicker();
});


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