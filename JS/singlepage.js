function gotooffer() {
    window.location.href = "../Parth/Offer.html";
}

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



// password

// function displayPwd() {

//     const displayPassword = document.querySelector(".fa-eye-slash");
//     displayPassword.classList.toggle("d-none");
//     const hidePassword = document.querySelector(".fa-eye");
//     hidePassword.classList.toggle('d-none');

//     const fieldtype = document.getElementById("pwd");
//     if (fieldtype.type === "password") {
//         fieldtype.type = "text";
//     } else {
//         fieldtype.type = "password";
//     }

// }

// function displayPwd1() {

//     const displayNewPassword = document.getElementById("closeeye1");
//     displayNewPassword.classList.toggle("d-none");
//     const hideNewPassword = document.getElementById("openeye1");
//     hideNewPassword.classList.toggle('d-none');

//     const newPassword = document.getElementById("pwd1");
//     if (newPassword.type === "password") {
//         newPassword.type = "text";
//     } else {
//         newPassword.type = "password";
//     }

// }

// function displayPwd2() {

//     const displayConfirmPassword = document.getElementById("closeeye2");
//     displayConfirmPassword.classList.toggle("d-none");
//     const hideConfirmPassword = document.getElementById("openeye2");
//     hideConfirmPassword.classList.toggle('d-none');

//     const confirmPassword = document.getElementById("pwd2");
//     if (confirmPassword.type === "password") {
//         confirmPassword.type = "text";
//     } else {
//         confirmPassword.type = "password";
//     }

// }

// function displayPwd3() {

//     const displayConfirmPassword = document.getElementById("closeeye3");
//     displayConfirmPassword.classList.toggle("d-none");
//     const hideConfirmPassword = document.getElementById("openeye3");
//     hideConfirmPassword.classList.toggle('d-none');

//     const confirmPassword = document.getElementById("pwd3");
//     if (confirmPassword.type === "password") {
//         confirmPassword.type = "text";
//     } else {
//         confirmPassword.type = "password";
//     }

// }

// function displayLogin() {
//     const displayLogin = document.querySelector(".V_login_section");
//     displayLogin.classList.toggle("d-none");
//     const displaySignUp = document.querySelector(".V_sign_section");
//     displaySignUp.classList.toggle('d-none');
// }

// function verifyEmail() {
//     const hideResister = document.querySelector('.V_sign_section');
//     hideResister.classList.add('d-none');
//     const displaySignUp = document.querySelector(".V_520");
//     displaySignUp.classList.remove('d-none');
//     const displayEmail = document.querySelector(".V_verify_email_section");
//     displayEmail.classList.remove("d-none");
//     const displayOtp = document.querySelector(".V_verify_section");
//     displayOtp.classList.add('d-none');
//     const displayResetPwd = document.querySelector(".V_reset_section");
//     displayResetPwd.classList.add('d-none');
//     const hideforPwd = document.querySelector(".V_Forgot_section");
//     hideforPwd.classList.add("d-none");
// }

// function displayForgetPwd() {
//     const displayLogin = document.querySelector(".V_login_section");
//     displayLogin.classList.add("d-none");
//     const displaySignUp = document.querySelector(".V_520");
//     displaySignUp.classList.remove('d-none');
//     const displayOtp = document.querySelector(".V_verify_section");
//     displayOtp.classList.add('d-none');
//     const displayResetPwd = document.querySelector(".V_reset_section");
//     displayResetPwd.classList.add('d-none');
//     const displayEmail = document.querySelector(".V_verify_email_section");
//     displayEmail.classList.add("d-none");
// }

// function loginClose() {
//     const displayLogin = document.querySelector(".V_login_section");
//     displayLogin.classList.add("d-none");
//     const displaySignUp = document.querySelector(".V_sign_section");
//     displaySignUp.classList.remove('d-none');
// }

// function asItIs() {
//     const displaySignUp = document.querySelector(".V_sign_section");
//     displaySignUp.classList.remove("d-none");
//     const displayLogin = document.querySelector(".V_520");
//     displayLogin.classList.add('d-none');
//     const hideforPwd = document.querySelector(".V_Forgot_section");
//     hideforPwd.classList.remove("d-none");
// }

// function verifyOtp() {
//     const hideforPwd = document.querySelector(".V_Forgot_section");
//     hideforPwd.classList.add("d-none");
//     const displayOtp = document.querySelector(".V_verify_section");
//     displayOtp.classList.remove('d-none');
// }

// function resetPassword() {
//     const hideforPwd = document.querySelector(".V_Forgot_section");
//     hideforPwd.classList.add("d-none");
//     const hideOtp = document.querySelector(".V_verify_section");
//     hideOtp.classList.add('d-none');
//     const displayResetPwd = document.querySelector(".V_reset_section");
//     displayResetPwd.classList.remove('d-none');
// }



// const otpFields = document.querySelectorAll('.V_otp_6');

// otpFields.forEach((field, index) => {
//     field.addEventListener('input', (e) => {
//         let value = e.target.value;

//         // Ensure only a single digit is entered
//         e.target.value = value.replace(/\D/g, '').slice(0, 1);

//         // Move to next field if a digit is entered
//         if (e.target.value && index < otpFields.length - 1) {
//             otpFields[index + 1].focus();
//         }
//     });

//     field.addEventListener('keydown', (e) => {
//         if (e.key === 'Backspace' && !field.value && index > 0) {
//             otpFields[index - 1].focus();
//         }
//     });
// });

//////////////////////////////////////// first part  left side////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0;
    const slideHeight = slides[0].offsetHeight;
    const maxIndex = slides.length - 5; // Show 5 slides at once

    function updateSlider() {
        wrapper.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Optional: Auto-slide
    setInterval(() => {
        if (currentIndex < maxIndex) {
            nextSlide();
        } else {
            currentIndex = 0;
            updateSlider();
        }
    }, 3000);
});

///////////////////////////////////// first part right side //////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // // Quantity buttons
    // const minusBtn = document.querySelector('.quantity-btn:first-child');
    // const plusBtn = document.querySelector('.quantity-btn:last-child');
    // const quantityInput = document.querySelector('.quantity-input');

    // minusBtn.addEventListener('click', function() {
    //   let value = parseInt(quantityInput.value);
    //   if (value > 1) {
    //     quantityInput.value = value - 1;
    //   }
    // });

    // plusBtn.addEventListener('click', function() {
    //   let value = parseInt(quantityInput.value);
    //   quantityInput.value = value + 1;
    // });

    // Offers dropdown
    const offersSection = document.querySelector('.offers-section');
    const offersHeader = document.querySelector('.offers-header');

    offersHeader.addEventListener('click', function () {
        offersSection.classList.toggle('expanded');
        // Ensure the offers content is toggled
        const offersContent = offersSection.querySelector('.offers-content');
        if (offersSection.classList.contains('expanded')) {
            offersContent.style.maxHeight = offersContent.scrollHeight + "px"; // Set max-height to the scroll height
        } else {
            offersContent.style.maxHeight = "0"; // Collapse
        }
    });
});

//   //////////////////////////////// review all ////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    // Get the button and review elements
    const viewAllBtn = document.getElementById('viewAllBtn');
    const thirdReview = document.getElementById('thirdReview');

    // Add CSS for hidden class if not already in your CSS
    const style = document.createElement('style');
    style.textContent = `
        .hidden {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    // Track if reviews are expanded
    let isExpanded = false;

    // Add click event listener to the button
    viewAllBtn.addEventListener('click', function () {
        // Toggle the expanded state
        isExpanded = !isExpanded;

        // Toggle the hidden class on the third review
        thirdReview.classList.toggle('hidden');

        // Update button text
        viewAllBtn.textContent = isExpanded ? 'Show Less' : 'View All';
    });
});
// ////////////////////////////////// review model /////////////////////////////////////
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function () {
        const rating = this.dataset.rating;
        document.querySelectorAll('.star').forEach(s => {
            s.classList.remove('active');
            if (s.dataset.rating <= rating) {
                s.classList.add('active');
            }
        });
    });
});

// Submit review function
function submitReview() {
    const title = document.getElementById('reviewTitle').value;
    const text = document.getElementById('reviewText').value;
    const rating = document.querySelectorAll('.star.active').length;

    if (title && text && rating) {
        alert('Review submitted successfully!');
        // Here you would typically send the data to your backend

        // Close modal and reset form
        const modal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
        modal.hide();
        document.getElementById('reviewForm').reset();
        document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
    } else {
        alert('Please fill in all fields and provide a rating.');
    }
}
////////////////////////////////////// share model //////////////////////////////////////////////
function copyLink() {
    const input = document.querySelector('.input-group input');
    input.select();
    document.execCommand('copy');

    const button = document.querySelector('.input-group button');
    const originalText = button.textContent;
    button.textContent = 'Copied!';

    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}
/////////////////////////// horizontle slider //////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const slideItems = document.querySelectorAll('.slide-item');

    // Calculate variables for slider movement
    const slideWidth = slideItems[0].offsetWidth;
    const visibleSlides = Math.floor(sliderWrapper.offsetWidth / slideWidth);
    const totalSlides = slideItems.length;
    let currentIndex = 0;

    // Initialize slider
    updateSliderPosition();

    // Add event listeners for buttons
    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentIndex < totalSlides - visibleSlides) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    // Function to update slider position
    function updateSliderPosition() {
        const translateX = -currentIndex * slideWidth;
        sliderWrapper.style.transform = `translateX(${translateX}px)`;

        // Update button states (optional)
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= totalSlides - visibleSlides ? '0.5' : '1';
    }

    // Handle window resize (recalculate visible slides)
    window.addEventListener('resize', function () {
        const newVisibleSlides = Math.floor(sliderWrapper.offsetWidth / slideItems[0].offsetWidth);

        // Adjust current index if needed
        if (currentIndex > totalSlides - newVisibleSlides) {
            currentIndex = totalSlides - newVisibleSlides;
            if (currentIndex < 0) currentIndex = 0;
            updateSliderPosition();
        }
    });
});
// //////////////////////////////////// like product slider /////////////////////////////////////////////



$(document).ready(function () {
    // API endpoint for json-server
    const API_URL = 'http://localhost:3000/likeproduct';

    // Fetch products from JSON server
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            // Hide loading indicator
            $('#loading').hide();

            // Populate carousel with products
            populateProductCarousel(products);

            // Show carousel
            $('#productCarousel').show();

            // Initialize Owl Carousel
            initializeOwlCarousel();
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            $('#loading').hide();
            $('#error').show();
        });

    // Function to populate carousel with products
    function populateProductCarousel(products) {
        const carousel = $('#productCarousel');

        products.forEach(product => {
            let colorOptionsHtml = '';

            // Generate color options
            product.colors.forEach((color, index) => {
                if (index < 3) {
                    colorOptionsHtml += `
                    <div class="more-colors V_color_border">
                    <div class="color-option" style="background-color: ${color.color};"></div>
                    </div>`;
                }
            });

            // Add "more colors" text if applicable
            if (product.colors.length > 3) {
                colorOptionsHtml += `<span class="more-colors">+${product.colors.length - 3}</span>`;
            }

            // Calculate discount percentage
            const discountPercentage = Math.round((1 - (product.price / product.originalPrice)) * 100);

            // Create product card HTML
            const productHtml = `
                <div class="item A_likeproduct_width">
                    <div class="product-card">
                    <div>
                    <div class="position-relative">
                                    <div>${product.tags ? `<span class="badge">${product.tags}</span>` : ''}</div>
                                    ${product.tags ?  `<img src="../IMG/Dhruvin/star.png" class="ds_label_star">` : ""}
                      </div>
                    <button class="wishlist-btn" data-product-id="${product.id}">
                        <i class="fa-regular fa-heart" ></i>
                         <i class="fa-solid fa-heart d-none" style="color: #ff0000;"></i>
                    </button>
                    </div>
                    <a href="../../Akshay/singlepage.html?id=${product.id}&array=likeproduct">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        </a>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="price-container">
                            <span class="sale-price">$${product.price}</span>
                            <span class="original-price">$${product.originalPrice}</span>
                            <span class="discount">${product.discount}</span>
                        </div>
                        <div class="color-options">
                            ${colorOptionsHtml}
                        </div>
                        <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;

            // Append to carousel
            carousel.append(productHtml);
        });
    }

    // Initialize Owl Carousel
    function initializeOwlCarousel() {
        $('#productCarousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            navText: ['<span>&lt;</span>', '<span>&gt;</span>'],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });

        // Add event listeners to dynamically created elements

        // Wishlist button functionality
        $(document).on('click', '.wishlist-btn', function () {
            const productId = $(this).data('product-id');
            console.log(`Adding product ID ${productId} to wishlist`);
            $(this).find('i').toggleClass('far fas');
        });

        // Add to cart button functionality
        $(document).on('click', '.add-to-cart-btn', function () {
            const productId = $(this).data('product-id');
            console.log(`Adding product ID ${productId} to cart`);

            // Provide visual feedback
            const originalText = $(this).text();
            $(this).text('Added!').prop('disabled', true);

            setTimeout(() => {
                $(this).text(originalText).prop('disabled', false);
            }, 2000);
        });

      
        
        $(document).on('click', '.color-option', function () {
            const selectedColor = $(this).css('background-color'); // Get clicked color
            const colorContainer = $(this).closest('.more-colors'); // Get the parent div
        
            // Retrieve the last selected color from localStorage
            let lastSelectedColor = localStorage.getItem("YouMayLikeSelectedColor");
        
            // Reset the border of the previously selected color globally
            if (lastSelectedColor) {
                $('.V_color_border').each(function () {
                    if ($(this).find('.color-option').css('background-color') === lastSelectedColor) {
                        $(this).css('border-color', '#ddd'); // Reset border
                    }
                });
            }
        
            // Store only the selected color globally
            localStorage.setItem("YouMayLikeSelectedColor", selectedColor);
        
            // Update border for the newly selected color globally
            $('.V_color_border').css('border-color', '#ddd'); // Reset all borders
            colorContainer.css('border-color', '#333'); // Highlight selected color
        
            console.log(`Stored globally selected color: ${selectedColor}`);
        });    
    }




    $(document).on("click", ".wishlist-btn", async function () {
        const productId = String($(this).data("product-id")); // Ensure ID is stored as string
        const userId = localStorage.getItem("userId");
    
        if (!userId) {
            alert("User not logged in!");
            return;
        }
    
        const wishlistBtn = $(this);
        const emptyHeart = wishlistBtn.find(".fa-regular.fa-heart");
        const redHeart = wishlistBtn.find(".fa-solid.fa-heart");
    
        try {
            let userResponse = await fetch(`http://localhost:3000/User/${userId}`);
            if (!userResponse.ok) throw new Error("User not found");
    
            let userData = await userResponse.json();
            if (!userData.wishlist) userData.wishlist = []; // Ensure wishlist array exists
    
            let existingItemIndex = userData.wishlist.findIndex(item => item.id === productId);
    
            if (existingItemIndex === -1) {
                // Product not in wishlist, add it
                let productResponse = await fetch(`http://localhost:3000/likeproduct/${productId}`);
                if (!productResponse.ok) throw new Error("Product not found");
    
                let productDetails = await productResponse.json();
                const selectedColor = productDetails.colors.length > 0 ? productDetails.colors[0].color : null;
    
                userData.wishlist.push({
                    id: productId,
                    image: productDetails.image,
                    name: productDetails.name,
                    currentPrice: productDetails.price,
                    originalPrice: productDetails.originalPrice,
                    discount: productDetails.discount,
                    colors: productDetails.colors.map(c => c.color),
                    moreColors: productDetails.moreColors || null,
                    selectedColor: selectedColor
                });
    
                await fetch(`http://localhost:3000/User/${userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ wishlist: userData.wishlist })
                });
    
                // Show red heart, hide empty heart
                emptyHeart.addClass("d-none");
                redHeart.removeClass("d-none");
    
            } else {
                // Product is in wishlist, remove it
                userData.wishlist.splice(existingItemIndex, 1);
    
                await fetch(`http://localhost:3000/User/${userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ wishlist: userData.wishlist })
                });
    
                // Show empty heart, hide red heart
                emptyHeart.removeClass("d-none"); // Explicitly show empty heart
                redHeart.addClass("d-none");
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    });
    
    // Ensure wishlist state persists on page load
    async function updateWishlistIcons() {
        const userId = localStorage.getItem("userId");
    
        if (!userId) return;
    
        try {
            let userResponse = await fetch(`http://localhost:3000/User/${userId}`);
            if (!userResponse.ok) throw new Error("User not found");
    
            let userData = await userResponse.json();
            if (!userData.wishlist) userData.wishlist = []; // Ensure wishlist exists
    
            $(".wishlist-btn").each(function () {
                const productId = String($(this).data("product-id"));
                const emptyHeart = $(this).find(".fa-regular.fa-heart");
                const redHeart = $(this).find(".fa-solid.fa-heart");
    
                if (userData.wishlist.some(item => item.id === productId)) {
                    emptyHeart.addClass("d-none");
                    redHeart.removeClass("d-none");
                } else {
                    emptyHeart.removeClass("d-none"); // Explicitly show empty heart
                    redHeart.addClass("d-none");
                }
            });
    
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    }
    
    // Run on page load
    $(document).ready(updateWishlistIcons);
    


$(document).on('click', '.add-to-cart-btn', async function () {
    const productId = String($(this).data("product-id")); // Ensure ID is string
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("User not logged in!");
        return;
    }

    try {
        // Fetch user data
        let userResponse = await fetch(`http://localhost:3000/User/${userId}`);
        if (!userResponse.ok) throw new Error("User not found");

        let userData = await userResponse.json();

        // Fetch product details
        let productResponse = await fetch(`http://localhost:3000/likeproduct/${productId}`);
        if (!productResponse.ok) throw new Error("Product not found");

        let productDetails = await productResponse.json();

        // Get selected color from localStorage
        let selectedColor = localStorage.getItem("YouMayLikeSelectedColor") || null;

        // Check if product is already in cart
        let existingCartItemIndex = userData.orders.findIndex(item => item.id === productId);

        if (existingCartItemIndex === -1) {
            // If not in cart, add new item
            let newCartItem = {
                id: Date.now(), // Use actual product ID
                image: productDetails.image,
                name: productDetails.name,
                currentPrice: productDetails.price,
                quantity: 1,
                selectedColor: selectedColor // Use selected color from localStorage
            };

            userData.orders.push(newCartItem);

            // Update JSON Server
            await fetch(`http://localhost:3000/User/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orders: userData.orders })
            });

            console.log("Added to cart:", newCartItem);
        } else {
            // If product is already in cart, increase quantity
            userData.orders[existingCartItemIndex].quantity++;

            await fetch(`http://localhost:3000/User/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orders: userData.orders })
            });

            console.log("Updated cart quantity:", userData.orders[existingCartItemIndex]);
        }

        // Provide visual feedback
        const originalText = $(this).text();
        $(this).text('Added!').prop('disabled', true);
        setTimeout(() => {
            $(this).text(originalText).prop('disabled', false);
        }, 2000);
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
});


});
// //////////////////////////////////// like product slider /////////////////////////////////////////////


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
    const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) {
                // backdrop.remove(); 
            }
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
    const RegisterModal = document.querySelector(".V_sign_login");
    RegisterModal.classList.add("d-none");

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

function verifyOtp1() {
    
    
    const veriEmail = document.getElementById("ds_verify_email").value.trim()
    
    if(registerId){
        if(handleObj?.email == veriEmail){
            const displayOtp = document.querySelector(".V_verify_section");
            displayOtp.classList.remove('d-none'); 
            const hideforPwd = document.querySelector(".V_Forgot_section");
            hideforPwd.classList.add("d-none");
            setTimeout(()=>{
               alert("Your Otp Is -: 123456")
            }, 500)
        }
        else{
            alert("Your Emil Is Wrong!")
        }
    }
}

function resetPassword() {
    let otpInputs = document.querySelectorAll(".ds_verify_otp");
    let enteredOtp = Array.from(otpInputs).map(input => input.value.trim()).join('');
    
    // Check if OTP fields are empty
    if (!enteredOtp || enteredOtp.length !== 6) {
        alert("Please enter a valid 6-digit OTP.");
        return;
    }
    
    // Simulate API call for OTP verification (Replace this with actual API request)
    dsVerifyOtp(enteredOtp).then(isValid => {
        if (!isValid) {
            alert("Invalid OTP. Please try again.");
            return;
        }
        
        // Hide OTP section and show reset password section
        document.querySelector(".V_verify_section").classList.add("d-none");
        document.querySelector(".V_reset_section").classList.remove("d-none");
    }).catch(error => {
        alert("Error verifying OTP. Please try again later.");
        console.error("OTP Verification Error:", error);
    });
}

// Simulated API function (Replace with real API request)
function dsVerifyOtp(otp) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(otp === "123456"); // Replace with actual API logic
        }, 1000);
    });
}


async function handleResetPassword() {
    let newPass = document.getElementById("pwd1").value.trim();
    let conPass = document.getElementById("pwd2").value.trim();
 
    // Password validation regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 
    if (!newPass || !conPass) {
       alert("Both password fields are required.");
       return;
    }
 
    if (!passwordRegex.test(newPass)) {
       alert("Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
       return;
    }
 
    if (newPass !== conPass) {
       alert("Passwords do not match.");
       return;
    }
 
    let obj = {
       fullName: `${handleObj.fullName}`,
       phoneNumber: handleObj?.phoneNumber,
       email: handleObj?.email,
       dateOfBirth: handleObj?.dateOfBirth,
       gender: handleObj?.gender,
       password: conPass,
       addresses: handleObj?.addresses ? handleObj?.addresses : []
    };
 
    try {
       const response = await fetch(`http://localhost:3000/User/${registerId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
       });
 
       console.log("Response:", response);
       alert("Password changed successfully!");
    } catch (error) {
       alert("Error: " + error.message);
    }
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



function addWishList(event) {
    // Get the clicked heart icon
    const clickedHeart = event.target;

    // Find the container (parent) that holds both hearts
    const heartContainer = clickedHeart.closest(".heart-container");

    // Select the hearts inside the same container
    const regularHeart = heartContainer.querySelector(".fa-regular");
    const solidHeart = heartContainer.querySelector(".fa-solid");

    // Toggle visibility
    regularHeart.classList.toggle("d-none");
    solidHeart.classList.toggle("d-none");
}