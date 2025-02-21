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
