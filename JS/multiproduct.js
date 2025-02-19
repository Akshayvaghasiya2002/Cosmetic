const menu = document.querySelector(".menu");
const menuInner = menu.querySelector(".menu-inner");
const menuArrow = menu.querySelector(".menu-arrow");
const burger = document.querySelector(".burger");
const overlay = document.querySelector(".overlay");

// Navbar Menu Toggle Function
function toggleMenu() {
    menu.classList.toggle("is-active");
    overlay.classList.toggle("is-active");
}

// Show Mobile Submenu Function
function showSubMenu(children) {
    subMenu = children.querySelector(".submenu");
    subMenu.classList.add("is-active");
    subMenu.style.animation = "slideLeft 0.35s ease forwards";
    const menuTitle = children.querySelector("i").parentNode.childNodes[0]
        .textContent;
    menu.querySelector(".menu-title").textContent = menuTitle;
    menu.querySelector(".menu-header").classList.add("is-active");
}

// Hide Mobile Submenu Function
function hideSubMenu() {
    subMenu.style.animation = "slideRight 0.35s ease forwards";
    setTimeout(() => {
        subMenu.classList.remove("is-active");
    }, 300);

    menu.querySelector(".menu-title").textContent = "";
    menu.querySelector(".menu-header").classList.remove("is-active");
}

// Toggle Mobile Submenu Function
function toggleSubMenu(e) {
    if (!menu.classList.contains("is-active")) {
        return;
    }
    if (e.target.closest(".menu-dropdown")) {
        const children = e.target.closest(".menu-dropdown");
        showSubMenu(children);
    }
}

// Fixed Navbar Menu on Window Resize
window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
        if (menu.classList.contains("is-active")) {
            toggleMenu();
        }
    }
});

// Initialize All Event Listeners
burger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);
menuArrow.addEventListener("click", hideSubMenu);
menuInner.addEventListener("click", toggleSubMenu);


//////////////////////////  parth js search  //////////////////////////

function emptyNav() {
    const emptyNavbar = document.querySelector("nav");
    emptyNavbar.classList.toggle("d-none");
    const displaySearch = document.querySelector(".V_search");
    displaySearch.classList.toggle('d-none');
}

const searchInput = document.querySelector(".V_input");
const searchResult = document.querySelector(".V_result");

// Function to toggle d-none class based on input value
searchInput.addEventListener("input", function () {
    if (searchInput.value.trim() !== "" || searchInput.value.length > 0) {
        searchResult.classList.remove("d-none"); // Show results
    } else {
        searchResult.classList.add("d-none"); // Hide results
    }
});


// password

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

function verifyOtp() {
    const hideforPwd = document.querySelector(".V_Forgot_section");
    hideforPwd.classList.add("d-none");
    const displayOtp = document.querySelector(".V_verify_section");
    displayOtp.classList.remove('d-none');
}

function resetPassword() {
    const hideforPwd = document.querySelector(".V_Forgot_section");
    hideforPwd.classList.add("d-none");
    const hideOtp = document.querySelector(".V_verify_section");
    hideOtp.classList.add('d-none');
    const displayResetPwd = document.querySelector(".V_reset_section");
    displayResetPwd.classList.remove('d-none');
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
// /////////////////////// multiproduct filter part /////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter headers
    const filterHeaders = document.querySelectorAll('.filter-header');
    
    // Add click event to each header
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            section.classList.toggle('active');
        });
    });
    
    // Remove all filters button
    const removeAllButton = document.querySelector('.remove-all');
    removeAllButton.addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    });
    
    // Show more buttons
    const showMoreButtons = document.querySelectorAll('.show-more');
    showMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Here you would add logic to show more options
            // For simplicity, we'll just toggle the button text
            if (this.textContent === 'Show More') {
                this.textContent = 'Show Less';
            } else {
                this.textContent = 'Show More';
            }
        });
    });
    
    // Price slider functionality
    const priceSlider = document.querySelector('.price-range');
    priceSlider.addEventListener('input', function() {
        // Here you would update price labels based on slider value
        // For simplicity, we're not implementing the full slider functionality
    });
});


// Add this script to your JS file
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const minPriceDisplay = document.getElementById('minPriceInput');
const maxPriceDisplay = document.getElementById('maxPriceInput');

minPriceInput.addEventListener('input', function() {
    if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
        minPriceInput.value = maxPriceInput.value;
    }
    minPriceDisplay.value = '$' + minPriceInput.value;
});

maxPriceInput.addEventListener('input', function() {
    if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
        maxPriceInput.value = minPriceInput.value;
    }
    maxPriceDisplay.value = '$' + maxPriceInput.value;
});
// /////////////////////// multiproduct filter part /////////////////////////
// /////////////////////// product card part  /////////////////////////
const products = [
    {
        id: 1,
        brand: "Eveline Cosmetics",
        name: "Wonder Match Creamy Liquid Matte Lipstick",
        currentPrice: 4.50,
        originalPrice: 6.00,
        discount: "20% OFF",
        badge: { type: "TOP RATED", class: "badge-top-rated" },
        image: "/IMG/Akshay/bodyshot.png",
        colors: [
            { color: "#D69F9F" },
            { color: "#9D2235" },
            { color: "#CC3333" },
            { color: "#E68FAC" }
        ],
        moreColors: 4
    },
    {
        id: 2,
        brand: "MAC",
        name: "Glow Play Tender Talk Lip Balm",
        currentPrice: 4.50,
        originalPrice: 6.00,
        discount: "20% OFF",
        image: "/IMG/Akshay/lip balm.png",
        colors: [
            { color: "#FF9EBF" },
            { color: "#EFCFCE" },
            { color: "#FFBE7D" },
            { color: "#E04F80" }
        ],
        moreColors: 10
    },
    {
        id: 3,
        brand: "SUGAR",
        name: "Matte As Hell Mini Crayon Lipstick - 07 Viola",
        currentPrice: 4.50,
        originalPrice: 6.00,
        discount: "20% OFF",
        badge: { type: "BEST SELLER", class: "badge-best-seller" },
        image: "/IMG/Akshay/pink lipstick.png",
        colors: [
            { color: "#A54E4E" },
            { color: "#8A2232" },
            { color: "#B95C5C" },
            { color: "#C06A6A" }
        ],
        moreColors: 2
    },
    {
        id: 4,
        brand: "SWISS BEAUTY",
        name: "Non-Transfer Lipstick",
        currentPrice: 4.50,
        originalPrice: 6.00,
        discount: "20% OFF",
        badge: { type: "BEST SELLER", class: "badge-best-seller" },
        image: "/IMG/Akshay/makeup.png",
        colors: [
            { color: "#C88C8C" },
            { color: "#5A142A" },
            { color: "#FF2D2D" },
            { color: "#F29B9B" }
        ],
        moreColors: 2
    },
    {
        id: 5,
        brand: "COLORBAR",
        name: "Power Kiss Matte Lipstick",
        currentPrice: 4.50,
        originalPrice: 6.00,
        discount: "20% OFF",
        image: "/IMG/Akshay/eyes.png",
        colors: [
            { color: "#B97562" },
            { color: "#612A31" },
            { color: "#CC5B6B" },
            { color: "#843344" }
        ],
        moreColors: 10
    },
    {
        id: 6,
        brand: "RENEE FAB",
        name: "5 Matte Finish 5 in 1 Lipstick 7.5gm",
        currentPrice: 4.50,
        originalPrice: 6.00,
        discount: "20% OFF",
        badge: { type: "BESTSELLER", class: "badge" },
        image: "/IMG/Akshay/bodyshot.png",
        colors: [
            { color: "#BB5A5A" },
            { color: "#7D3131" }
        ]
    }
];
const filters = [
    // { name: "Lipstick", class: "" },
    // { name: "SUGAR", class: "" },
    // { name: "SWISS BEAUTY", class: "" },
    // { name: "Pink", class: "pink" },
    // { name: "Purple", class: "purple" },
    // { name: "$50 And Above", class: "" },
    // { name: "$50 - $200", class: "" }
];

// Render filters
function renderFilters() {
    const filtersContainer = document.getElementById('filters-container');
    filtersContainer.innerHTML = '';

    filters.forEach(filter => {
        const filterTag = document.createElement('div');
        filterTag.className = `filter-tag ${filter.class}`;
        filterTag.innerHTML = `
            ${filter.name}
            <span class="filter-close">×</span>
        `;
        filtersContainer.appendChild(filterTag);
    });

    // Add event listeners to filter close buttons
    document.querySelectorAll('.filter-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
}



// Sort products
function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch(sortBy) {
        case 'price-low-high':
            sortedProducts.sort((a, b) => a.currentPrice - b.currentPrice);
            break;
        case 'price-high-low':
            sortedProducts.sort((a, b) => b.currentPrice - a.currentPrice);
            break;
        case 'name-a-z':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-z-a':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            sortedProducts = [...products]; // Default order (as defined in the array)
    }
    
    return sortedProducts;
}

// Handle sort change
document.getElementById('sort-select').addEventListener('change', function() {
    const sortBy = this.value;
    products.splice(0, products.length, ...sortProducts(sortBy));
    renderProducts();
});

// Responsive adjustments
function adjustLayout() {
    const width = window.innerWidth;
    const productCards = document.querySelectorAll('.product-card');
    
    if (width <= 480) {
        productCards.forEach(card => {
            const colorOptions = card.querySelector('.color-options');
            const colorDots = colorOptions.querySelectorAll('.color-dot');
            if (colorDots.length > 3) {
                // Show only first 3 colors on mobile
                for (let i = 3; i < colorDots.length; i++) {
                    colorDots[i].style.display = 'none';
                }
            }
        });
    } else {
        productCards.forEach(card => {
            const colorOptions = card.querySelector('.color-options');
            const colorDots = colorOptions.querySelectorAll('.color-dot');
            for (let i = 0; i < colorDots.length; i++) {
                colorDots[i].style.display = '';
            }
        });
    }
}

// Init
function init() {
    renderFilters();
    renderProducts();
    
    // Setup event listeners
    window.addEventListener('resize', adjustLayout);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
// /////////////////////// product card part  /////////////////////////

// Function to handle filter selection
function handleFilterSelection() {
    const filterOptions = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const selectedFilters = [];

    filterOptions.forEach(option => {
        if (option.checked) {
            selectedFilters.push(option.parentElement.textContent.trim());
        }
    });

    renderSelectedFilters(selectedFilters);
}

// Function to render selected filters
function renderSelectedFilters(selectedFilters) {
    const filtersContainer = document.getElementById('filters-container');
    filtersContainer.innerHTML = '';

    selectedFilters.forEach(filter => {
        const filterTag = document.createElement('div');
        filterTag.className = 'filter-tag';
        filterTag.innerHTML = `
            ${filter}
            <span class="filter-close">×</span>
        `;
        filtersContainer.appendChild(filterTag);
    });

    // Add event listeners to filter close buttons
    document.querySelectorAll('.filter-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
}

// Add event listeners to checkboxes
document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', handleFilterSelection);
});
    


// Function to add/remove products from the wishlist
// async function renderProducts() {
//     const productsContainer = document.getElementById('products-container');
//     productsContainer.innerHTML = '';

//     const userId = localStorage.getItem("userId");
//     let wishlist = [];

//     // Fetch the user's wishlist if logged in
//     if (userId) {
//         try {
//             const response = await fetch(`http://localhost:3000/User/${userId}`);
//             if (response.ok) {
//                 const userData = await response.json();
//                 wishlist = userData.wishlist || [];
//             }
//         } catch (error) {
//             console.error("Error fetching wishlist data:", error);
//         }
//     }

//     products.forEach(product => {
//         const productCard = document.createElement('div');
//         productCard.className = 'product-card';
//         productCard.dataset.id = product.id;

//         // Badge handling
//         let badgeHTML = product.badge ? `<span class="badge ${product.badge.class}">${product.badge.type}</span>` : '';

//         // Color options
//         let colorDotsHTML = product.colors.map((color, index) => `
//             <div class="V_color_border mx-1" data-color-index="${index}" data-color="${color.color}">
//                 <p class="color-dot" style="background-color: ${color.color};"></p>
//             </div>
//         `).join('');

//         let moreColorsHTML = product.moreColors ? `<span class="more-colors">+${product.moreColors}</span>` : '';

//         // Check if product is in wishlist
//         const isWishlisted = wishlist.some(item => item.id == product.id);

//         productCard.innerHTML = `
//             <div class="product-header px-3 pt-3">
//                 ${badgeHTML}
//                 <span class="ms-auto heart-container">
//                     <i class="fa-regular fa-heart wishlist-button ${isWishlisted ? 'd-none' : ''}" data-id="${product.id}"></i>
//                     <i class="fa-solid fa-heart wishlist-button ${isWishlisted ? '' : 'd-none'}" data-id="${product.id}" style="color: #ff0000;"></i>
//                 </span>
//             </div>
//             <div class="product-image">
//                 <img src="${product.image}" alt="${product.brand} ${product.name}">
//             </div>
//             <div class="product-info">
//                 <div class="product-brand">${product.brand}</div>
//                 <div class="product-title">${product.name}</div>
//                 <div class="product-price">
//                     <span class="current-price">$${product.currentPrice.toFixed(2)}</span>
//                     <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
//                     <span class="discount">${product.discount}</span>
//                 </div>
//                 <div class="color-options">
//                     ${colorDotsHTML}
//                     ${moreColorsHTML}
//                 </div>
//                 <button class="add-to-cart">Add to Cart</button>
//             </div>
//         `;
            

//         productsContainer.appendChild(productCard);
//     });

//     document.getElementById('results-number').textContent = products.length;
//     let lastSelectedColor = null; // Store the last selected color element

//     document.querySelectorAll('.V_color_border').forEach(dot => {
//         dot.addEventListener('click', event => {
//             const productCard = event.target.closest('.product-card'); // Get the parent product card
//             if (!productCard) return;
    
//             // Remove border from the previously selected color (if any)
//             if (lastSelectedColor) {
//                 lastSelectedColor.style.border = 'none';
//             }
    
//             // Add border to the selected color
//             dot.style.border = '2px solid black';
    
//             // Store the selected color for this specific product
//             productCard.dataset.selectedColor = dot.dataset.color;
//             localStorage.setItem('selectedColor', dot.dataset.color);
    
//             // Update lastSelectedColor reference
//             lastSelectedColor = dot;
//         });
//     });
    
    

//     // Wishlist button handling
//     document.querySelectorAll('.wishlist-button').forEach(button => {
//         button.addEventListener('click', async event => {
//             event.stopPropagation(); // Prevent page refresh

//             const productId = button.dataset.id;
//             const productCard = button.closest(".product-card");
//             const regularHeart = productCard.querySelector(".fa-regular");
//             const solidHeart = productCard.querySelector(".fa-solid");

//             if (!userId) {
//                 alert("User not logged in!");
//                 return;
//             }

//             const productData = {
//                 id: productId,
//                 image: productCard.querySelector(".product-image img").src,
//                 brand: productCard.querySelector(".product-brand").textContent,
//                 name: productCard.querySelector(".product-title").textContent,
//                 currentPrice: productCard.querySelector(".current-price").textContent,
//                 originalPrice: productCard.querySelector(".original-price").textContent,
//                 discount: productCard.querySelector(".discount").textContent,
//                 badge: productDetails.badge ? true : false, // Store badge as true/false
//                 colors: productDetails.colors.map(c => c.color), // Store all available colors in an array
//                 moreColors: productDetails.moreColors || null, // Store more colors count if available
//                 selectedColor: selectedColor, // Store the selected color (if any)
//             };

//             try {
//                 const response = await fetch(`http://localhost:3000/User/${userId}`);
//                 if (!response.ok) throw new Error("Failed to fetch user data");

//                 const userData = await response.json();
//                 let wishlist = userData.wishlist || [];

//                 const existingIndex = wishlist.findIndex(item => item.id == productId);

//                 if (existingIndex === -1) {
//                     wishlist.push(productData);
//                 } else {
//                     wishlist.splice(existingIndex, 1);
//                 }

//                 const updateResponse = await fetch(`http://localhost:3000/User/${userId}`, {
//                     method: "PATCH",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ wishlist })
//                 });

//                 if (!updateResponse.ok) throw new Error("Failed to update wishlist");

//                 // Toggle heart icon
//                 regularHeart.classList.toggle("d-none");
//                 solidHeart.classList.toggle("d-none");
//             } catch (error) {
//                 console.error("Error updating wishlist:", error);
//                 alert("Something went wrong while updating the wishlist.");
//             }
//         });
//     });

//     // Cart button handling
//     document.querySelectorAll('.add-to-cart').forEach(button => {
//         button.addEventListener('click', function () {
//             this.textContent = 'Added!';
//             this.style.backgroundColor = '#4caf50';
//             this.style.color = '#fff';
//             this.style.borderColor = '#4caf50';

//             setTimeout(() => {
//                 this.textContent = 'Add to Cart';
//                 this.style.backgroundColor = '';
//                 this.style.color = '';
//                 this.style.borderColor = '';
//             }, 1000);
//         });
//     });
// }





// Function to add/remove products from the wishlist
async function renderProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    const userId = localStorage.getItem("userId");
    let wishlist = [];

    // Fetch the user's wishlist if logged in
    if (userId) {
        try {
            const response = await fetch(`http://localhost:3000/User/${userId}`);
            if (response.ok) {
                const userData = await response.json();
                wishlist = userData.wishlist || [];
            }
        } catch (error) {
            console.error("Error fetching wishlist data:", error);
        }
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;

        // Badge handling
        let badgeHTML = product.badge ? `<span class="badge ${product.badge.class}">${product.badge.type}</span>` : '';

        // Color options
        let colorDotsHTML = product.colors.map((color, index) => `
            <div class="V_color_border mx-1" data-color-index="${index}" data-color="${color.color}">
                <p class="color-dot" style="background-color: ${color.color};"></p>
            </div>
        `).join('');

        let moreColorsHTML = product.moreColors ? `<span class="more-colors">+${product.moreColors}</span>` : '';

        // Check if product is in wishlist
        const isWishlisted = wishlist.some(item => item.id == product.id);

        productCard.innerHTML = `
            <div class="product-header px-3 pt-3">
                ${badgeHTML}
                <span class="ms-auto heart-container">
                    <i class="fa-regular fa-heart wishlist-button ${isWishlisted ? 'd-none' : ''}" data-id="${product.id}"></i>
                    <i class="fa-solid fa-heart wishlist-button ${isWishlisted ? '' : 'd-none'}" data-id="${product.id}" style="color: #ff0000;"></i>
                </span>
            </div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.brand} ${product.name}">
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-title">${product.name}</div>
                <div class="product-price">
                    <span class="current-price">$${product.currentPrice.toFixed(2)}</span>
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    <span class="discount">${product.discount}</span>
                </div>
                <div class="color-options">
                    ${colorDotsHTML}
                    ${moreColorsHTML}
                </div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;

        productsContainer.appendChild(productCard);
    });

    document.getElementById('results-number').textContent = products.length;

    let lastSelectedColor = null; // Store reference to the last globally selected color

document.querySelectorAll('.product-card').forEach(productCard => {
    productCard.querySelectorAll('.V_color_border').forEach(dot => {
        dot.addEventListener('click', event => {
            // Reset the previously selected color's border
            if (lastSelectedColor) {
                lastSelectedColor.style.border = '0.6px solid rgba(20, 20, 20, 0.2)';
            } 

            // Add border to the newly selected color
            dot.style.border = '1px solid black';

            // Store the new globally selected color
            lastSelectedColor = dot;

            // Save selected color to localStorage
            localStorage.setItem('selectedColor', dot.dataset.color);
        });
    });
});

    

    // Wishlist button handling
    document.querySelectorAll('.wishlist-button').forEach(button => {
        button.addEventListener('click', async event => {
            event.stopPropagation();

            const productId = button.dataset.id;
            const productCard = button.closest(".product-card");
            const regularHeart = productCard.querySelector(".fa-regular");
            const solidHeart = productCard.querySelector(".fa-solid");

            if (!userId) {
                alert("User not logged in!");
                return;
            }

            // Find product details
            const productDetails = products.find(p => p.id == productId);
            if (!productDetails) return;

            // Get the selected color for this specific product
            const selectedColor = productCard.dataset.selectedColor || null;

            // Prepare product data to be stored in the wishlist
            const productData = {
                id: productId,
                image: productCard.querySelector(".product-image img").src,
                brand: productCard.querySelector(".product-brand").textContent,
                name: productCard.querySelector(".product-title").textContent,
                currentPrice: productCard.querySelector(".current-price").textContent,
                originalPrice: productCard.querySelector(".original-price").textContent,
                discount: productCard.querySelector(".discount").textContent,
                badge: productDetails.badge ? true : false,
                colors: productDetails.colors.map(c => c.color),
                moreColors: productDetails.moreColors || null,
                selectedColor: selectedColor
            };

            try {
                const response = await fetch(`http://localhost:3000/User/${userId}`);
                if (!response.ok) throw new Error("Failed to fetch user data");

                const userData = await response.json();
                let wishlist = userData.wishlist || [];

                const existingIndex = wishlist.findIndex(item => item.id == productId);

                if (existingIndex === -1) {
                    wishlist.push(productData);
                } else {
                    wishlist.splice(existingIndex, 1);
                }

                const updateResponse = await fetch(`http://localhost:3000/User/${userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ wishlist })
                });

                if (!updateResponse.ok) throw new Error("Failed to update wishlist");

                // Toggle heart icon
                regularHeart.classList.toggle("d-none");
                solidHeart.classList.toggle("d-none");
            } catch (error) {
                console.error("Error updating wishlist:", error);
                alert("Something went wrong while updating the wishlist.");
            }
        });
    });

    // Cart button handling
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            this.textContent = 'Added!';
            this.style.backgroundColor = '#4caf50';
            this.style.color = '#fff';
            this.style.borderColor = '#4caf50';

            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
                this.style.color = '';
                this.style.borderColor = '';
            }, 1000);
        });
    });
}
