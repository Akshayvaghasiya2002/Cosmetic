document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("User not logged in");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/User/${userId}`);
        const userData = await response.json();
        const wishlistData = userData.wishlist || [];

        console.log('wishlistData', wishlistData);
        const wishlistContainer = document.getElementById("wishlistContainer");
        const emptyWishlistSection = document.querySelector("section.d-none");

        if (wishlistData.length === 0) {
            emptyWishlistSection.classList.remove("d-none"); // Show empty state
            wishlistContainer.innerHTML = ""; // Clear any existing content
        } else {
            emptyWishlistSection.classList.add("d-none"); // Hide empty state
            renderWishlist(wishlistData);
        }
    } catch (error) {
        console.error("Error fetching wishlist:", error);
    }
});

function renderWishlist(wishlistData) {
    const wishlistContainer = document.getElementById("wishlistContainer");
    wishlistContainer.innerHTML = wishlistData.map((item, index) => {
        const colorsHTML = (item.colors || []).map((color, colorIndex) =>
            `<div class="V_color_border mx-1" data-item-id="${item.id}" data-color="${color}">
                <p class="V_color" style="background-color: ${color};"></p>
            </div>`
        ).join("");

        console.log(item.image);

        const moreColorHTML = item.moreColors ? 
            `<div class="V_color_border mx-1"><p class="V_color V_more d-flex align-items-center justify-content-center">+${item.moreColors}</p></div>` : "";

            // console.log('moreColorHTML', moreColorHTML);
            const badgeHTML = item.badge === true ?
            `<img src="../../IMG/Parth/top rated.png" alt="top rated" class="V_top_rated">` : "";

        return `
            <div class="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-5 mb-sm-4 wishlist-item" data-id="${item.id}">
                <div class="V_border mx-auto">
                    <div class="position-relative">
                        ${badgeHTML}
                        <img src=${item.image} alt="${item.name}" class="V_image mx-auto">
                        <div class="V_dil_border d-flex align-items-center justify-content-center" data-id="${item.id}">
                            <i class="fa-solid fa-heart" style="color: #ff0000;"></i>
                        </div>
                    </div>
                    <div class="V_name_width mx-auto">
                        <p class="text text-center V_name">${item.name}</p>
                        <div class="d-flex justify-content-center align-items-center">
                            <p class="text V_price mx-2 mb-0">${item.currentPrice}</p>
                            <p class="text V_actual_price mb-0 mx-1">${item.originalPrice}</p>
                            <p class="text V_green mb-0 mx-2">${item.discount}</p>
                        </div>
                        <div class="d-flex V_height justify-content-center mt-2 color-options">
                            ${colorsHTML}
                            ${moreColorHTML}
                        </div>
                        <div class="V_cart_btn my-4">
                            <p class="text text-center mb-0 py-2">Move to Cart</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    applyStoredColorSelection();
}

// Global color selection logic
let lastSelectedColor = null;

document.getElementById("wishlistContainer").addEventListener("click", async (event) => {
    event.preventDefault();
    const selectedElement = event.target.closest(".V_color_border");
    if (!selectedElement) return;

    const itemId = selectedElement.getAttribute("data-item-id");
    const selectedColor = selectedElement.getAttribute("data-color");

    // Reset the previously selected color's border
    if (lastSelectedColor) {
        lastSelectedColor.style.border = "0.6px solid rgba(20, 20, 20, 0.2)";
    }

    // Apply border to the newly selected color
    selectedElement.style.border = "0.6px solid rgba(20, 20, 20, 0.2)";
    lastSelectedColor = selectedElement;

    // Update selected color in JSON Server
    try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:3000/User/${userId}`);
        const userData = await response.json();

        const updatedWishlist = userData.wishlist.map(item => {
            if (item.id === itemId) {
                return { ...item, selectedColor };
            }
            return item;
        });

        await fetch(`http://localhost:3000/User/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wishlist: updatedWishlist })
        });

        localStorage.setItem("selectedColor", selectedColor);
    } catch (error) {
        console.error("Error updating selected color:", error);
    }
});

function applyStoredColorSelection() {
    document.querySelectorAll(".V_color_border").forEach(el => {
        const storedColor = localStorage.getItem("selectedColor");
        if (el.getAttribute("data-color") === storedColor) {
            el.style.border = "1px solid black";
            lastSelectedColor = el;
        } else {
            el.style.border = "0.6px solid rgba(20, 20, 20, 0.2)";
        }
    });
}

// Remove item from wishlist
document.getElementById("wishlistContainer").addEventListener("click", async (event) => {
    const heartIcon = event.target.closest(".V_dil_border");
    if (!heartIcon) return;

    const itemId = heartIcon.getAttribute("data-id");
    const userId = localStorage.getItem("userId");

    if (!userId) {
        console.error("User not logged in");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/User/${userId}`);
        const userData = await response.json();

        const updatedWishlist = userData.wishlist.filter(item => item.id !== itemId);

        await fetch(`http://localhost:3000/User/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wishlist: updatedWishlist })
        });

        document.querySelector(`.wishlist-item[data-id="${itemId}"]`).remove(); // Remove from UI

        if (updatedWishlist.length === 0) {
            document.querySelector("section.d-none").classList.remove("d-none"); // Show empty state
        }
    } catch (error) {
        console.error("Error removing item from wishlist:", error);
    }
});
