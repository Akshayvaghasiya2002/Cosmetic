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
