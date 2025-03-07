// $(document).ready(async function () {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//         console.error("User not logged in.");
//         return;
//     }
//     const url = `http://localhost:3000/User/${userId}`;
//     let userData = await fetchUserData(url);
//     let wishlist = userData.wishlist || [];
//     let cart = userData.orders || [];
//     let lastSelectedColor = null; // Track last selected color

//     async function fetchUserData(url) {
//         try {
//             const response = await fetch(url);
//             if (!response.ok) throw new Error("User not found");
//             return await response.json();
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//             return {};
//         }
//     }

//     async function updateUserData(url, updatedData) {
//         try {
//             await fetch(url, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(updatedData)
//             });
//         } catch (error) {
//             console.error("Error updating user data:", error);
//         }
//     }

//     async function fetchProducts(endpoint, containerId) {
//         try {
//             const response = await fetch(`http://localhost:3000/${endpoint}`);
//             if (!response.ok) throw new Error("Failed to fetch products");
//             const products = await response.json();
//             const container = $(containerId);
//             container.empty(); 

//             products.forEach(product => {
//                 const isWishlisted = wishlist.some(item => item.id === product.id);
//                 let colorDotsHTML = product.colors ? product.colors.map((color, index) => `
//                     <div class="V_color_border mx-1" data-color-index="${index}" data-color="${color.color}" data-product-id="${product.id}">
//                         <p class="color-dot" style="background-color: ${color.color};"></p>
//                     </div>
//                 `).join('') : "";
//                 let moreColorsHTML = product.moreColors ? `<span class="more-colors ">+${product.moreColors}</span>` : '';

//                 const productElement = $(`
//                     <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 item" data-id="${product.id}">
//                         <div class="card h-100 text-center p-3">
//                             <div class="d-flex justify-content-between align-items-center">
//                                 <div>${product.tags ? `<span class="badge">${product.tags}</span>` : ''}</div>
//                                 <span class="ms-auto heart-container">
//                                     <i class="fa-regular fa-heart wishlist-btn ${isWishlisted ? 'd-none' : ''}"></i>
//                                     <i class="fa-solid fa-heart wishlist-btn ${isWishlisted ? '' : 'd-none'}" style="color: #ff0000;"></i>
//                                 </span>
//                             </div>
//                             <img src="${product.image}" class="card-img-top A_img_size mx-auto d-block" alt="${product.name}">
//                             <div class="card-body">
//                                 <h6 class="card-title">${product.name}</h6>
//                                 <div class="product-price justify-content-center">
//                                     <span class="current-price">$${product.price}</span>
//                                     <span class="original-price">$${product.originalPrice}</span>
//                                     <span class="discount">${product.discount}</span>
//                                 </div>
//                                 <div class="color-options justify-content-center">
//                                     ${colorDotsHTML} ${moreColorsHTML}
//                                 </div>
//                                 <button class="mt-2 w-100 A_addtocart_hover">Add To Cart</button>
//                             </div>
//                         </div>
//                     </div>
//                 `);
//                 container.append(productElement);
//             });
//         } catch (error) {
//             console.error("Error fetching products:", error.message);
//         }
//     }

//     async function toggleWishlist(event) {
//         event.stopPropagation();
//         const heartContainer = $(event.currentTarget).closest(".heart-container");
//         const productId = $(event.currentTarget).closest(".item").data("id");

//         const regularHeart = heartContainer.find(".fa-regular.fa-heart");
//         const solidHeart = heartContainer.find(".fa-solid.fa-heart");

//         const response = await fetch(`http://localhost:3000/products/${productId}`);
//         if (!response.ok) return;
//         const product = await response.json();

//         const existingItemIndex = wishlist.findIndex(item => item.id === product.id);

//         if (existingItemIndex !== -1) {
//             wishlist.splice(existingItemIndex, 1);
//             regularHeart.removeClass("d-none");
//             solidHeart.addClass("d-none");
//         } else {
//             wishlist.push({
//                 id: product.id,
//                 image: product.image,
//                 brand: product.brand,
//                 name: product.name,
//                 originalPrice: product.originalPrice,
//                 currentPrice: product.price,
//                 discount: product.discount,
//                 colors: product.colors ? product.colors.map(color => color.color) : [],
//                 moreColors: product.moreColors || 0,
//                 selectedColor: null,
//                 badge: product.tags ? true : false
//             });
//             regularHeart.addClass("d-none");
//             solidHeart.removeClass("d-none");
//         }
//         await updateUserData(userUrl, { wishlist });
//     }

//     $(document).on("click", ".V_color_border", function (event) {
//         const selectedElement = event.target.closest(".V_color_border");
//         if (!selectedElement) return;

//         const productElement = $(selectedElement).closest(".item");
//         const selectedColor = selectedElement.getAttribute("data-color");

//         if (lastSelectedColor) {
//             lastSelectedColor.style.border = "0.6px solid rgba(20, 20, 20, 0.2)";
//         }

//         selectedElement.style.border = "1px solid black";
//         lastSelectedColor = selectedElement;
//         productElement.data("selectedColor", selectedColor);
//     });

//     $(document).on("click", ".A_addtocart_hover", async function (event) {
//         event.stopPropagation();
//         const productElement = $(this).closest(".item");
//         const productId = productElement.data("id");
//         const selectedColor = productElement.data("selectedColor") || null;

//         try {
//             const response = await fetch(`http://localhost:3000/products/${productId}`);
//             if (!response.ok) throw new Error("Product not found");
//             const product = await response.json();

//             const existingItemIndex = cart.findIndex(item => item.id === product.id);

//             if (existingItemIndex !== -1) {
//                 cart[existingItemIndex].quantity += 1;
//             } else {
//                 cart.push({
//                     id: product.id,
//                     image: product.image,
//                     brand: product.brand,
//                     name: product.name,
//                     currentPrice: product.price,
//                     quantity: 1,
//                     selectedColor: selectedColor
//                 });
//             }

//             await updateUserData(userUrl, { orders: cart });
//         } catch (error) {
//             console.error("Error adding to cart:", error);
//         }
//     });

//     $(document).on("click", ".heart-container", toggleWishlist);

//     await fetchProducts("products", "#product-container");
// });
























$(document).ready(async function () {
    const userId = localStorage.getItem("userId");
    let wishlist = [];
    let cart = [];
    let lastSelectedColor = null;

    if (userId) {
        const url = `http://localhost:3000/User/${userId}`;
        let userData = await fetchUserData(url);
        wishlist = userData.wishlist || [];
        cart = userData.orders || [];
    }

    async function fetchUserData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("User not found");
            return await response.json();
        } catch (error) {
            console.error("Error fetching user data:", error);
            return {};
        }
    }

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

    async function fetchProducts(endpoint, containerId) {
        try {
            const response = await fetch(`http://localhost:3000/${endpoint}`);
            if (!response.ok) throw new Error("Failed to fetch products");
            const products = await response.json();
            const container = $(containerId);
            container.empty();

            products.forEach(product => {
                const isWishlisted = userId && wishlist.some(item => item.id === product.id);
                let colorDotsHTML = product.colors ? product.colors.map((color, index) => `
                    <div class="V_color_border mx-1" data-color-index="${index}" data-color="${color.color}" data-product-id="${product.id}">
                        <p class="color-dot" style="background-color: ${color.color};"></p>
                    </div>
                `).join('') : "";
                let moreColorsHTML = product.moreColors ? `<span class="more-colors">+${product.moreColors}</span>` : '';

                const productElement = $(`
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 item" data-id="${product.id}">
                        <div class="card h-100 text-center p-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="position-relative">
                                    <div>${product.tags ? `<span class="badge">${product.tags}</span>` : ''}</div>
                                    ${product.tags ?  `<img src="../IMG/Dhruvin/star.png" class="ds_label_star">` : ""}
                                </div>
                                <span class="ms-auto heart-container ${userId ? '' : 'disabled'}">
                                    <i class="fa-regular fa-heart wishlist-btn ${isWishlisted ? 'd-none' : ''}"></i>
                                    <i class="fa-solid fa-heart wishlist-btn ${isWishlisted ? '' : 'd-none'}" style="color: #ff0000;"></i>
                                </span>
                            </div>
                            <a href="../../Akshay/singlepage.html?id=${product.id}">
                                <img src="${product.image}" class="card-img-top w-100 mx-auto d-block" alt="${product.name}">
                            </a>
                            <div class="card-body">
                                <h6 class="card-title text-truncate">${product.name}</h6>
                                <div class="product-price justify-content-center">
                                    <span class="current-price">$${product.price}</span>
                                    <span class="original-price">$${product.originalPrice}</span>
                                    <span class="discount">${product.discount}</span>
                                </div>
                                <div class="color-options  justify-content-center">
                                    ${colorDotsHTML} ${moreColorsHTML}
                                </div>
                            </div>
                                <button class="mt-2 w-100 A_addtocart_hover ${userId ? '' : 'disabled'}">Add To Cart</button>

                        </div>
                    </div>
                `);
                container.append(productElement);
            });
        } catch (error) {
            console.error("Error fetching products:", error.message);
        }
    }

    async function toggleWishlist(event) {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Please log in to manage your wishlist.");
            return;
        }

        event.stopPropagation();
        const heartContainer = $(event.currentTarget).closest(".heart-container");
        const productId = $(event.currentTarget).closest(".item").data("id");

        const regularHeart = heartContainer.find(".fa-regular.fa-heart");
        const solidHeart = heartContainer.find(".fa-solid.fa-heart");

        const response = await fetch(`http://localhost:3000/products/${productId}`);
        if (!response.ok) return;
        const product = await response.json();

        const existingItemIndex = wishlist.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            wishlist.splice(existingItemIndex, 1);
            regularHeart.removeClass("d-none");
            solidHeart.addClass("d-none");
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
                selectedColor: null,
                badge: product.tags ? true : false
            });
            regularHeart.addClass("d-none");
            solidHeart.removeClass("d-none");
        }
        await updateUserData(`http://localhost:3000/User/${userId}`, { wishlist });
    }

    $(document).on("click", ".V_color_border", function (event) {
        if (!userId) return;  // Prevent color selection if user is not logged in

        const selectedElement = event.target.closest(".V_color_border");
        if (!selectedElement) return;

        const productElement = $(selectedElement).closest(".item");
        const selectedColor = selectedElement.getAttribute("data-color");

        if (lastSelectedColor) {
            lastSelectedColor.style.border = "0.6px solid rgba(20, 20, 20, 0.2)";
        }

        selectedElement.style.border = "1px solid black";
        lastSelectedColor = selectedElement;
        productElement.data("selectedColor", selectedColor);
    });

    $(document).on("click", ".A_addtocart_hover", async function (event) {
         // Prevent adding to cart if user is not logged in
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Please log in to add items to your cart.");
            return;
        }
        event.stopPropagation();
        const productElement = $(this).closest(".item");
        const productId = productElement.data("id");
        const selectedColor = productElement.data("selectedColor") || null;

        try {
            const response = await fetch(`http://localhost:3000/products/${productId}`);
            if (!response.ok) throw new Error("Product not found");
            const product = await response.json();

            const existingItemIndex = cart.findIndex(item => item.id === product.id);

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({
                    id: Date.now(),
                    image: product.image,
                    brand: product.brand,
                    name: product.name,
                    currentPrice: product.price,
                    quantity: 1,
                    selectedColor: selectedColor
                });
            }

            await updateUserData(`http://localhost:3000/User/${userId}`, { orders: cart });
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    });

    $(document).on("click", ".heart-container", toggleWishlist);

    await fetchProducts("products", "#product-container");  // Always fetch products on page load
});

document.getElementById("wishlistContainer").addEventListener("click", async (event) => {
    const moveToCartButton = event.target.closest(".A_addtocart_hover");
    if (!moveToCartButton) return; // Ignore clicks that are not on the button

    const itemElement = moveToCartButton.closest(".wishlist-item");
    const itemId = itemElement.getAttribute("data-id");
    // const userId = localStorage.getItem("userId");

    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("Please log in to add items to your cart.");
        return;
    }

    try {
        // Fetch user data from JSON server
        const response = await fetch(`http://localhost:3000/User/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        let wishlist = userData.wishlist || [];
        let cart = userData.orders || [];

        // Find the item in the wishlist
        const itemToMove = wishlist.find(item => item.id === itemId);
        if (!itemToMove) {
            console.error("Item not found in wishlist");
            return;
        }

        // Check for selected color, use default if none selected
        const selectedColor = itemToMove.selectedColor || null;

        // Create the cart item
        const cartItem = {
            id: itemToMove.id,
            image: itemToMove.image,
            brand: itemToMove.brand || "", // Ensure brand exists
            name: itemToMove.name,
            currentPrice: itemToMove.currentPrice,
            quantity: 1,
            selectedColor: selectedColor
        };

        // Check if item already exists in cart
        const existingCartItem = cart.find(item => item.id === itemId);
        if (existingCartItem) {
            existingCartItem.quantity += 1; // Increase quantity if already in cart
        } else {
            cart.push(cartItem); // Otherwise, add new item
        }

        // Remove the item from the wishlist
        wishlist = wishlist.filter(item => item.id !== itemId);

        // Update user data on JSON server
        await fetch(`http://localhost:3000/User/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wishlist, orders: cart })
        });

        // Remove item from UI
        itemElement.remove();

        // Show empty wishlist message if needed
        if (wishlist.length === 0) {
            document.querySelector("section.d-none").classList.remove("d-none");
        }

        console.log("Item successfully moved to cart!");
    } catch (error) {
        console.error("Error moving item to cart:", error);
    }
});
