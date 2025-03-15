function gotooffer() {
    window.location.href = "../Parth/Offer.html";
}
//////////////////////////////////////////  combo offers /////////////////////////////////////////////
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
    emptyNavbar.classList.add("d-none");
    
    const displaySearch = document.querySelector(".V_search");
    displaySearch.classList.remove("d-none");

    addBackdrop(); // Ensure backdrop is added when the function is called
}

function addBackdrop() {
    let backdrop = document.querySelector(".ds_modal_backdrop");

    if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.className = "ds_modal_backdrop";
        document.body.appendChild(backdrop);
        // document.body.style.overflow = "hidden"; // Prevent scrolling

        // Click outside to close
        backdrop.addEventListener("click", emptyNav53);
    }
}

function removeBackdrop() {
    const backdrop = document.querySelector(".ds_modal_backdrop");
    if (backdrop) {
        backdrop.remove();
        // document.body.style.overflow = ""; // Restore scrolling
    }
}

const searchInput = document.querySelector(".V_input");
const searchResult = document.querySelector(".V_result");
const emptyResult = document.querySelector(".V_empty_result");

// Function to toggle display based on input value
searchInput.addEventListener("input", function () {
    const inputValue = searchInput.value.trim();

    if (inputValue !== "") {
        searchResult.classList.remove("d-none"); // Show results
        emptyResult.classList.add("d-none"); // Hide empty result
        addBackdrop(); // Ensure backdrop is added while typing
    } else {
        searchResult.classList.add("d-none"); // Hide results
        // removeBackdrop(); // Remove backdrop only when input is empty
    }

    if (inputValue === "lorem") {
        emptyResult.classList.remove("d-none"); // Show empty result
        searchResult.classList.add("d-none"); // Hide regular results
    } else {
        emptyResult.classList.add("d-none"); // Hide empty result
    }
});

// Redirect when clicking the arrow icon
document.querySelector(".fa-arrow-right-long").addEventListener("click", function () {
    window.location.href = "/Akshay/multiproduct.html";
});

// Function to close the search and restore navbar
function emptyNav53() {
    const emptyNavbar = document.querySelector("nav");
    emptyNavbar.classList.remove("d-none");

    const displaySearch = document.querySelector(".V_search");
    displaySearch.classList.add("d-none");

    removeBackdrop(); // Ensure backdrop is removed when closing
}













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



// Add this script to your JS file
// const minPriceInput = document.getElementById('minPrice');
// const maxPriceInput = document.getElementById('maxPrice');
// const minPriceDisplay = document.getElementById('minPriceInput');
// const maxPriceDisplay = document.getElementById('maxPriceInput');

// minPriceInput.addEventListener('input', function() {
//     if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
//         minPriceInput.value = maxPriceInput.value;
//     }
//     minPriceDisplay.value = '$' + minPriceInput.value;
// });

// maxPriceInput.addEventListener('input', function() {
//     if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
//         maxPriceInput.value = minPriceInput.value;
//     }
//     maxPriceDisplay.value = '$' + maxPriceInput.value;
// });
// /////////////////////// multiproduct filter part /////////////////////////

// // Initialize filters array
let filters = [];
let Product = [];
let FilterMyProduct = []

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
    document.querySelectorAll('.remove-all').forEach(button => {
        button.addEventListener('click', function () {
            filters = []; // Clear all filters
            renderFilters(); // Re-render UI
        });
    });
    
    
    // Show more buttons
    document.querySelectorAll('.show-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const parent = this.closest('.filter-container');
            const hiddenSection = parent.querySelector('.ds_show_hide');

            if (hiddenSection.classList.contains('d-none')) {
                hiddenSection.classList.remove('d-none');
                this.textContent = 'Show Less';
            } else {
                hiddenSection.classList.add('d-none');
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




// Function to add filter
function addFilter(name, filterClass = '') {
    // Check if filter already exists
    const filterExists = filters.some(filter => filter.name === name);
    
    if (!filterExists) {
        filters.push({ name: name, class: filterClass });
        renderFilters();
    }
}

// Function to remove filter
function removeFilter(filterName) {
    // Remove from filters array
    filters = filters.filter(filter => filter.name !== filterName);
    
    // Uncheck corresponding checkbox
    const filterOptions = document.querySelectorAll('.filter-option input[type="checkbox"], .color-option input[type="checkbox"]');
    filterOptions.forEach(option => {
        const label = option.closest('.filter-option') || option.closest('.color-option');
        const labelText = label.textContent.trim();
        if (labelText === filterName) {
            option.checked = false;
        }
    });
    
    renderFilters();
    renderProducts();
}

// Function to render filters
function renderFilters() {
    const filtersContainer = document.getElementById('filters-container');
    if (!filtersContainer) {
        console.error("Filters container element not found!");
        return;
    }
    
    // Clear existing filters display
    const filtersDisplay = document.createElement('div');
    filtersDisplay.className = 'selected-filters';
    
    if (filters.length > 0) {
        filters.forEach(filter => {
            const filterTag = document.createElement('div');
            filterTag.className = `filter-tag ${filter.class || ''}`;
            filterTag.dataset.filterName = filter.name;
            filterTag.innerHTML = `
                <span class="filter-name">${filter.name}</span>
                <span class="filter-close">×</span>
            `;
            filtersDisplay.appendChild(filterTag);
        });
    } else {
        filtersDisplay.innerHTML = '<p>No filters applied</p>';
    }
    
    // Replace existing filters display or append new one
    const existingDisplay = filtersContainer.querySelector('.selected-filters');
    if (existingDisplay) {
        filtersContainer.replaceChild(filtersDisplay, existingDisplay);
    } else {
        filtersContainer.insertBefore(filtersDisplay, filtersContainer.firstChild);
    }
    
    // Add event listeners to filter close buttons
    document.querySelectorAll('.filter-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const filterName = this.parentElement.dataset.filterName;
            removeFilter(filterName);
        });
    });
}

// Initialize event listeners for filter checkboxes
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all filter checkboxes
    const allCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"], .color-option input[type="checkbox"]');
    
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.filter-option') || this.closest('.color-option');
            const filterName = label.textContent.trim();
            
            if (this.checked) {
                addFilter(filterName);
                renderFilters();
                renderProducts();
                // Add filter when checkbox is checked
            } else {
                // Remove filter when checkbox is unchecked
                removeFilter(filterName);
            }
        });
    });
    
    // Handle "Remove All" button
    document.querySelectorAll('.remove-all').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-option input[type="checkbox"], .color-option input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            renderProducts();
        });
    });
    
    // Initial render
    renderFilters();
});

// Sort products
function sortProducts(sortBy) {
    let sortedProducts = [...Product];
    
    
    switch(sortBy) {
        case 'price-low-high':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high-low':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-a-z':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-z-a':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            sortedProducts = [...Product]; // Default order (as defined in the array)

    }
    FilterMyProduct = sortedProducts
    // console.log("zzzzzzzzzzzzzzz",sortProducts);
    
    renderProducts()
    // return sortedProducts;
}

// Handle sort change
document.getElementById('sort-select').addEventListener('change', function() {
    const sortBy = this.value;
    // Replace the products array with the sorted results
    products = sortProducts(sortBy);
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

// Function to filter products based on selected filters
function filterProducts(products) {
    const selectedFilters = [];
console.log("hihihi" , products);
    // console.log("value" ,ds_inputMin , ds_inputMax);
    
    // Get selected filters from checkboxes
    document.querySelectorAll('.filter-option input[type="checkbox"], .color-option input[type="checkbox"]').forEach(option => {
        if (option.checked) {
            selectedFilters.push(option.parentElement.textContent.trim().toLowerCase());
        }
    });
   
    

    return products.filter(product => {
        const productPrice = product?.price;
        const matchesPrice = productPrice >= ds_inputMin && productPrice <= ds_inputMax;

        // Check if the product matches selected filters
        const matchesFilters = selectedFilters.length === 0 || selectedFilters.some(filter => {
            return (
                product.brand.toLowerCase().includes(filter) ||         
                (product.brands && product.brands.toLowerCase().includes(filter)) ||
                product.name.toLowerCase().includes(filter) ||          
                (product.product && product.product.toLowerCase().includes(filter)) ||
                (product.discount && product.discount.toLowerCase().includes(filter)) ||
                (product.finish && product.finish.toLowerCase().includes(filter)) ||
                (product.formulation && product.formulation.toLowerCase().includes(filter)) 
            );
        });
        return  matchesFilters;
    
    });
}

// ******** Range Input **********
document.querySelectorAll('.slider-container').forEach(container => {
    const rangeMin = container.querySelector('.range-min');
    const rangeMax = container.querySelector('.range-max');
    const rangeSelected = container.querySelector('.range-selected');
    const minValue = container.querySelector('.min-value');
    const maxValue = container.querySelector('.max-value');

    function updateSlider() {
        let min = parseInt(rangeMin.value) || 0;
        let max = parseInt(rangeMax.value) || 300;
    
        if (min > max) {
            [min, max] = [max, min]; // Swap values if min > max
        }
        rangeMin.value = min;
        rangeMax.value = max;
        minValue.value = min;
        maxValue.value = max;
        ds_inputMin = min
        ds_inputMax = max
    
        rangeSelected.style.width = `${((max - min) / 300) * 100}%`;
        rangeSelected.style.left = `${(min / 300) * 100}%`;
    
        renderProducts(); // Trigger filtering
    }

    rangeMin.addEventListener('input', updateSlider);
    rangeMax.addEventListener('input', updateSlider);

    minValue.addEventListener('change', () => {
        const min = Math.max(0, Math.min(parseInt(minValue.value), 300));
        rangeMin.value = min;
        updateSlider();
    });

    maxValue.addEventListener('change', () => {
        const max = Math.max(0, Math.min(parseInt(maxValue.value), 300));
        rangeMax.value = max;
        updateSlider();
    });

    updateSlider();
});



// // Function to render products, handle wishlist and cart functionality
// async function renderProducts() {
//     const productsContainer = document.getElementById('products-container');
//     productsContainer.innerHTML = '';

//     const userId = localStorage.getItem("userId");
//     let wishlist = [];
//     let cart = [];

//     // Fetch the user's wishlist and cart if logged in
//     if (userId) {
//         try {
//             const response = await fetch(`http://localhost:3000/User/${userId}`);
//             if (response.ok) {
//                 const userData = await response.json();
//                 wishlist = userData.wishlist || [];
//                 cart = userData.orders || [];
//             }
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//         }
//     }

//     // Get filtered products
//     const filteredProducts = filterProducts();

//     productsContainer.innerHTML = filteredProducts.map(product => {
//         const isWishlisted = wishlist.some(item => item.id == product.id);
//         let badgeHTML = product.badge ? `<span class="badge ${product.badge.class}">${product.badge.type}</span>` : '';
//         let colorDotsHTML = product.colors.map((color, index) => `
//             <div class="V_color_border mx-1" data-color-index="${index}" data-color="${color.color}">
//                 <p class="color-dot" style="background-color: ${color.color };"></p>
//             </div>
//         `).join('');
//         let moreColorsHTML = product.moreColors ? `<span class="more-colors">+${product.moreColors}</span>` : '';

//         return `
//             <div class="product-card" data-id="${product.id}">
//                 <div class="product-header px-3 pt-3">
//                     ${badgeHTML}
//                     <span class="ms-auto heart-container">
//                         <i class="fa-regular fa-heart wishlist-button ${isWishlisted ? 'd-none' : ''}" data-id="${product.id}"></i>
//                         <i class="fa-solid fa-heart wishlist-button ${isWishlisted ? '' : 'd-none'}" data-id="${product.id}" style="color: #ff0000;"></i>
//                     </span>
//                 </div>
//                 <div class="product-image">
//                     <img src="${product.image}" alt="${product.brand} ${product.name}">
//                 </div>
//                 <div class="product-info">
//                     <div class="product-brand">${product.brand}</div>
//                     <div class="product-title">${product.name}</div>
//                     <div class="product-price">
//                         <span class="current-price">$${product.currentPrice.toFixed(2)}</span>
//                         <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
//                         <span class="discount">${product.discount}</span>
//                     </div>
//                     <div class="color-options">
//                         ${colorDotsHTML}
//                         ${moreColorsHTML}
//                     </div>
//                     <button class="add-to-cart V_add_cart" data-id="${product.id}">Add to Cart</button>
//                 </div>
//             </div>
//         `;
//     }).join('');

//     document.getElementById('results-number').textContent = filteredProducts.length;

//     // Event delegation for better performance
//     document.getElementById('products-container').addEventListener('click', async (event) => {
//         const target = event.target;

//         // Handle Color Selection
//         if (target.closest('.V_color_border')) {
//             const colorDot = target.closest('.V_color_border');
//             const productCard = colorDot.closest('.product-card');
//             productCard.querySelectorAll('.V_color_border').forEach(dot => dot.style.border = '0.6px solid rgba(20, 20, 20, 0.2)');
//             colorDot.style.border = '1px solid black';
//             localStorage.setItem(`selectedColor_${productCard.dataset.id}`, colorDot.dataset.color);
//         }

//         // Handle Wishlist Button Click
//         if (target.classList.contains('wishlist-button')) {
//             event.stopPropagation();
//             const productId = target.dataset.id;
//             const productCard = target.closest(".product-card");

//             if (!userId) {
//                 alert("User not logged in!");
//                 return;
//             }

//             const productDetails = filteredProducts.find(p => p.id == productId);
//             if (!productDetails) return;

//             const selectedColor = localStorage.getItem(`selectedColor_${productId}`) || null;

//             const productData = {
//                 id: productId,
//                 image: productCard.querySelector(".product-image img").src,
//                 brand: productCard.querySelector(".product-brand").textContent,
//                 name: productCard.querySelector(".product-title").textContent,
//                 currentPrice: productCard.querySelector(".current-price").textContent,
//                 originalPrice: productCard.querySelector(".original-price").textContent,
//                 discount: productCard.querySelector(".discount").textContent,
//                 colors: productDetails.colors.map(color => color.color), // Store all colors
//                 moreColors: productDetails.moreColors || null, // Store moreColors value if present
//                 selectedColor: selectedColor
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

//                 await fetch(`http://localhost:3000/User/${userId}`, {
//                     method: "PATCH",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ wishlist })
//                 });

//                 productCard.querySelector(".fa-regular").classList.toggle("d-none");
//                 productCard.querySelector(".fa-solid").classList.toggle("d-none");
//             } catch (error) {
//                 console.error("Error updating wishlist:", error);
//             }
//         }

//         // Handle Add to Cart
//         if (target.classList.contains('V_add_cart')) {
//             const productCard = target.closest(".product-card");
//             const productId = productCard.dataset.id;
//             const selectedColor = localStorage.getItem(`selectedColor_${productId}`) || null;

//             if (!userId) {
//                 alert("User not logged in!");
//                 return;
//             }

//             let existingItem = cart.find(item => item.id == productId && item.selectedColor == selectedColor);

//             if (existingItem) {
//                 existingItem.quantity += 1;
//             } else {
//                 const cartItem = {
//                     id: Date.now(),
//                     image: productCard.querySelector(".product-image img").src,
//                     brand: productCard.querySelector(".product-brand").textContent,
//                     name: productCard.querySelector(".product-title").textContent,
//                     currentPrice: parseFloat(productCard.querySelector(".current-price").textContent.replace("$", "")),
//                     quantity: 1,
//                     selectedColor: selectedColor
//                 };
//                 cart.push(cartItem);
//                 alert("product added to cart.")
//             }

//             // Update JSON Server
//             try {
//                 await fetch(`http://localhost:3000/User/${userId}`, {
//                     method: "PATCH",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ orders: cart })
//                 });
//             } catch (error) {
//                 console.error("Error updating cart:", error);
//             }

//             target.textContent = 'Added!';
//             setTimeout(() => target.textContent = 'Add to Cart', 1000);
//         }
//     });
// }






// Function to fetch products and render them



async function renderProducts() {
    // alert('')


    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    const userId = localStorage.getItem("userId");
    let wishlist = [], cart = [];

    // Fetch user data (wishlist & cart) if logged in
    if (userId) {
        try {
            const response = await fetch(`http://localhost:3000/User/${userId}`);
            if (response.ok) {
                const userData = await response.json();
                wishlist = userData.wishlist || [];
                cart = userData.orders || [];
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    // Fetch products from the JSON server
    let products = [];
    try {
        const response = await fetch(`http://localhost:3000/combooffers`);
        if (!response.ok) throw new Error("Failed to fetch products");
        let json = await response.json();
        products = json
        Product = json

        
    } catch (error) {
        console.error("Error fetching products:", error);
    }

    // Apply filters
     products = filterProducts(products);
    // Validate unique product IDs
    const uniqueProducts = new Map();
    products.forEach(product => {
        if (!uniqueProducts.has(product.id)) {
            uniqueProducts.set(product.id, product);
        }
    });
    products = Array.from(uniqueProducts.values());
  console.log("hello" ,products);
  
    // Render filtered product cards
    
    products = FilterMyProduct.length > 0 ? FilterMyProduct : products;



    productsContainer.innerHTML = products?.map(product => {
        const isWishlisted = wishlist.some(item => item.id == product.id);
        const badgeHTML = product.badge ? `<div class="position-relative">
                                             <span class="badge ${product.badge.class}">${product.badge.type}</span>
                                               ${product.badge.type ?  `<img src="../IMG/Dhruvin/star.png" class="ds_label_star">` : ""}
                                               </div>
                                              ` : '';
                                              const colorDotsHTML = product?.images?.map((IMAGEObj, index) => `
                                              <div class="V_color_border mx-1" data-color-index="${index}" data-color="${IMAGEObj.image}">
                                                  <img class="color-dot" src="${IMAGEObj.image}"></img>
                                              </div>
                                          `).join('');
        const moreColorsHTML = product.moreColors ? `<span class="more-colors">+${product.moreColors}</span>` : '';

        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-header px-3 ">
                    ${badgeHTML}
                    <span class="ms-auto heart-container">
                        <i class="fa-regular fa-heart wishlist-button ${isWishlisted ? 'd-none' : ''}" data-id="${product.id}"></i>
                        <i class="fa-solid fa-heart wishlist-button ${isWishlisted ? '' : 'd-none'}" data-id="${product.id}" style="color: #ff0000;"></i>
                    </span>
                </div>
                <a href="../../Akshay/singlepage.html?id=${product.id}&array=multiproducts">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.brand} ${product.name}">
                </div>
                </a>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <div class="product-title text-truncate">${product.name}</div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        <span class="discount">${product.discount}</span>
                    </div>
                    <div class="color-options V_height justify-content-center">
                        ${colorDotsHTML}
                        ${moreColorsHTML}
                    </div>
                    <button class="add-to-cart V_add_cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('results-number').textContent = products.length;

    setupEventListeners(products, wishlist, cart, userId);
}


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.filter-option input[type="checkbox"], .color-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            renderProducts();
        });
    });

    document.querySelector('.remove-all').addEventListener('click', function() {
        document.querySelectorAll('.filter-option input[type="checkbox"], .color-option input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        renderProducts();
    });

    renderProducts();
});

function setupEventListeners(products, wishlist, cart, userId) {
    let lastSelectedColor = null; // Store the last selected color globally

    document.getElementById('products-container').addEventListener('click', async (event) => {
        const target = event.target;
        const productCard = target.closest('.product-card');
        if (!productCard) return;
        const productId = productCard.dataset.id;
        let selectedColor = localStorage.getItem("selectedColor") || null;
        const productDetails = products.find(p => p.id == productId);

        // ✅ Handle Color Selection Globally
        if (target.closest('.V_color_border')) {
            const selectedElement = target.closest('.V_color_border');
            selectedColor = selectedElement.dataset.color;

            // Store the selected color in localStorage
            localStorage.setItem("selectedColor", selectedColor);

            // Reset the previous selection globally
            if (lastSelectedColor && lastSelectedColor !== selectedElement) {
                lastSelectedColor.style.border = "0.6px solid rgba(20, 20, 20, 0.2)";
            }

            // Highlight the newly selected color
            selectedElement.style.border = "1px solid black";
            lastSelectedColor = selectedElement;

            return;
        }

        // ✅ Handle Wishlist
        if (target.classList.contains('wishlist-button')) {
            event.stopPropagation();
            if (!userId) return alert("User not logged in!");

            const existingIndex = wishlist.findIndex(item => item.id == productId);
            if (existingIndex === -1) {
                wishlist.push({
                    id: productId,
                    image: productDetails.image,
                    name: productDetails.name,
                    currentPrice: productDetails.price,
                    originalPrice: productDetails.originalPrice,
                    discount: productDetails.discount,
                    images: productDetails.images.map(c => c.image),
                    moreImages: productDetails.moreImages || null,
                    selectedColor: selectedColor
                });
            } else {
                wishlist.splice(existingIndex, 1);
            }

            await updateUserData(userId, { wishlist });
            target.classList.toggle('d-none');
            target.nextElementSibling.classList.toggle('d-none');
            return;
        }

        // ✅ Handle Add to Cart
        if (target.classList.contains('V_add_cart')) {
            if (!userId) return alert("User not logged in!");

            const existingItem = cart.find(item => item.id == productId && item.selectedColor == selectedColor);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: Date.now(),  // ✅ Use actual product ID
                    image: productDetails.image,
                    name: productDetails.name,
                    currentPrice: productDetails.price,
                    quantity: 1,
                    selectedColor: selectedColor
                });
            }

            await updateUserData(userId, { orders: cart });
            target.textContent = 'Added!';
            setTimeout(() => target.textContent = 'Add to Cart', 1000);
        }
    });
}


async function updateUserData(userId, updateData) {
    try {
        await fetch(`http://localhost:3000/User/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData)
        });
    } catch (error) {
        console.error("Error updating user data:", error);
    }
}

// Call render function
renderProducts();

// Add event listeners to checkboxes
document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        renderProducts(); // Re-render products when filters change
    });
});




