
document.addEventListener("DOMContentLoaded", async function () {
    try {
        // ✅ Fetch Offer Data from JSON Server (Always)
        const response = await fetch("http://localhost:3000/offer");
        if (!response.ok) throw new Error("Failed to fetch offer data.");
        const offerData = await response.json();
        console.log("Offer Data:", offerData);

        // ✅ Check for User Login
        const userId = localStorage.getItem("userId");
        let wishlist = [];
        let cart = [];

        if (userId) {
            const userUrl = `http://localhost:3000/User/${userId}`;
            const userData = await fetchUserData(userUrl);
            wishlist = userData.wishlist || [];
            cart = userData.orders || [];
        }

        // ✅ Render Offer Data & Reinitialize Owl Carousel
        renderOfferData(offerData, wishlist);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

// ✅ Fetch User Data Function (Only if Logged In)
async function fetchUserData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("User data not found");
        return await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        return {};
    }
}

// ✅ Function to Render Offers & Initialize Owl Carousel
function renderOfferData(offerData, wishlist) {
    const OfferContainer = document.querySelector("#OfferContainer");

    if (!OfferContainer) {
        console.error("Error: OfferContainer element not found.");
        return;
    }

    let offerHTML = offerData.map((item) => {
        // ✅ Check if Item is in Wishlist (Only If User is Logged In)
        const isWishlisted = wishlist?.some(wishItem => wishItem.id === item.id);

        // ✅ Generate Colors HTML
        const colorsHTML = item.colors.map(colorObj => `
            <div class="V_color_border mx-1" data-itemid="${item.id}" data-color="${colorObj.color}">
                <p class="V_color" style="background-color: ${colorObj.color};"></p>
            </div>
        `).join("");

        // ✅ More Colors HTML (If Exists)
        const moreColorsHTML = item.moreColors ? `
            <div class="V_color_border mx-1">
                <p class="V_color V_more d-flex align-items-center justify-content-center">
                    +${item.moreColors}
                </p>
            </div>
        ` : "";

        // ✅ Generate Offer Item HTML
        return `
            <div class="item" data-itemid="${item.id}" data-selectedColor="">
                <div class="V_border mx-auto">
                    <div class="position-relative">
                        <a href="../../Akshay/singlepage.html?id=${item.id}&array=offer">
                            <img src="${item.image}" alt="${item.name}" class="V_image mx-auto">
                        </a>
                        ${item.topRated ? `<img src="${item.topRated}" alt="Top Rated" class="V_top_rated w-auto">` : ""}

                        <div class="V_dil_border d-flex align-items-center justify-content-center wishlist-container">
                            <i class="fa-regular fa-heart wishlist-btn ${isWishlisted ? 'd-none' : ''}" data-id="${item.id}"></i>
                            <i class="fa-solid fa-heart wishlist-btn text-danger ${isWishlisted ? '' : 'd-none'}" data-id="${item.id}"></i>
                        </div>
                    </div>
                    <div class="V_name_width px-2 mx-auto">
                        <p class="text text-center V_name">${item.name}</p>
                        <div class="d-flex justify-content-center align-items-center">
                            <p class="text V_price mx-2 mb-0 defe">$${item.price}</p>
                            <p class="text V_actual_price mb-0 mx-1">$${item.originalPrice}</p>
                            <p class="text V_green mb-0 mx-2">${item.discount}</p>
                        </div>
                        <div class="d-flex V_height justify-content-center mt-2 color-container">
                            ${colorsHTML}
                            ${moreColorsHTML}
                        </div>
                        <div class="V_cart_btn my-4 mx-3">
                            <p class="text text-center mb-0 py-2">Move to Cart</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    OfferContainer.innerHTML = offerHTML;

    // ✅ Initialize or Refresh Owl Carousel
    $("#OfferContainer").owlCarousel('destroy');
    $("#OfferContainer").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        // autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: { items: 1, nav: true },
            576: { items: 2, nav: true },
            992: { items: 3, nav: true },
            1500: { items: 4, nav: true}
        }
    });
}

// ✅ Wishlist Toggle Functionality (Only If User is Logged In)
$(document).on("click", ".wishlist-container", async function (event) {
    event.stopPropagation();

    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("Please log in to manage your wishlist.");
        return;
    }

    const heartContainer = $(event.currentTarget);
    const productId = heartContainer.find(".wishlist-btn").data("id");

    const userUrl = `http://localhost:3000/User/${userId}`;
    let userData = await fetchUserData(userUrl);
    let wishlist = userData.wishlist || [];

    const response = await fetch(`http://localhost:3000/offer/${productId}`);
    if (!response.ok) return;
    const product = await response.json();

    const existingIndex = wishlist.findIndex(item => item.id === product.id);

    if (existingIndex !== -1) {
        wishlist.splice(existingIndex, 1);
    } else {
        wishlist.push({
            id: product.id,
            image: product.image,
            brand: product.brand,
            name: product.name,
            originalPrice: product.originalPrice,
            currentPrice: product.price,
            discount: product.discount,
            colors: product.colors ? product.colors.map(color => color.color) : [],
            moreColors: product.moreColors || 0,
            badge: false // Default value
        });
    }

    await updateUserData(userUrl, { wishlist });
});




// ✅ Color Selection Functionality
$(document).on("click", ".V_color_border", function () {
    const selectedColorElement = $(this);
    const selectedColor = selectedColorElement.data("color");
    const productElement = selectedColorElement.closest(".item");

    // ✅ Remove previous selected color border from ALL products
    $(".V_color_border").removeClass("V_selected_color");

    // ✅ Add border to the newly selected color
    selectedColorElement.addClass("V_selected_color");

    // ✅ Store selected color in data attribute of the product
    productElement.attr("data-selectedColor", selectedColor);
});




// ✅ Color Selection Functionality
let lastSelectedColor = null; // ✅ Store the last selected color globally

$(document).on("click", ".V_color_border", function (event) {
    const userId = localStorage.getItem("userId"); // ✅ Ensure user is logged in
    if (!userId) return;

    const selectedElement = event.target.closest(".V_color_border");
    if (!selectedElement) return;

    const productElement = $(selectedElement).closest(".item");
    const selectedColor = selectedElement.getAttribute("data-color");

    // ✅ Remove border from the previously selected color (if any)
    if (lastSelectedColor) {
        lastSelectedColor.style.border = "0.6px solid rgba(20, 20, 20, 0.2)";
    }

    // ✅ Apply border to the newly selected color
    selectedElement.style.border = "1px solid black";

    // ✅ Update last selected color
    lastSelectedColor = selectedElement;

    // ✅ Store the selected color in the product's `data-selectedColor` attribute
    productElement.attr("data-selectedColor", selectedColor);
});




// ✅ Add to Cart (Updated to Include Selected Color)
$(document).on("click", ".V_cart_btn", async function (event) {
    event.stopPropagation();

    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("Please log in to add items to your cart.");
        return;
    }

    const productElement = $(this).closest(".item");
    const productId = productElement.data("itemid");
    const selectedColor = productElement.attr("data-selectedColor") || null; // Default to null if no color selected

    const userUrl = `http://localhost:3000/User/${userId}`;
    let userData = await fetchUserData(userUrl);
    let cart = userData.orders || [];

    const response = await fetch(`http://localhost:3000/offer/${productId}`);
    if (!response.ok) return;
    const product = await response.json();

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.selectedColor = selectedColor; // ✅ Update selected color
    } else {
        cart.push({
            id: Date.now(),
            image: product.image,
            name: product.name,
            currentPrice: product.price,
            quantity: 1,
            selectedColor: selectedColor // ✅ Store selected color
        });
    }

    await updateUserData(userUrl, { orders: cart });
});





// ✅ Update User Data
async function updateUserData(url, updatedData) {
    try {
        await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });
    } catch (error) {
        console.error("Error updating user data:", error);
    }
}
