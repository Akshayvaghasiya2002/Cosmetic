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

//////////////////////////////////////// first part  left side////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
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
document.addEventListener('DOMContentLoaded', function() {
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
      option.addEventListener('click', function() {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
    
    // Quantity buttons
    const minusBtn = document.querySelector('.quantity-btn:first-child');
    const plusBtn = document.querySelector('.quantity-btn:last-child');
    const quantityInput = document.querySelector('.quantity-input');
    
    minusBtn.addEventListener('click', function() {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });
    
    plusBtn.addEventListener('click', function() {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
    });
    
    // Offers dropdown
    const offersSection = document.querySelector('.offers-section');
    const offersHeader = document.querySelector('.offers-header');
    
    offersHeader.addEventListener('click', function() {
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
document.addEventListener('DOMContentLoaded', function() {
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
    viewAllBtn.addEventListener('click', function() {
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
    star.addEventListener('click', function() {
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

        document.addEventListener('DOMContentLoaded', function() {
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
            prevBtn.addEventListener('click', function() {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSliderPosition();
                }
            });
            
            nextBtn.addEventListener('click', function() {
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
            window.addEventListener('resize', function() {
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
$(document).ready(function(){
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
                    colorOptionsHtml += `<div class="color-option" style="background-color: ${color.code};"></div>`;
                }
            });
            
            // Add "more colors" text if applicable
            if (product.colors.length > 3) {
                colorOptionsHtml += `<span class="more-colors">+${product.colors.length - 3}</span>`;
            }
            
            // Calculate discount percentage
            const discountPercentage = Math.round((1 - (product.salePrice / product.originalPrice)) * 100);
            
            // Create product card HTML
            const productHtml = `
                <div class="item A_likeproduct_width">
                    <div class="product-card">
                    <div>
                    ${product.isBestSeller ? '<div class="badge1"><div class="badge ">BEST SELLER</div> </div>' : ''}
                    <button class="wishlist-btn" data-product-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                    </div>
                        <div class="product-image">
                            <img src="${product.imageUrl}" alt="${product.title}">
                        </div>
                        <h3 class="product-title">${product.title}</h3>
                        <div class="price-container">
                            <span class="sale-price">$${product.salePrice}</span>
                            <span class="original-price">$${product.originalPrice}</span>
                            <span class="discount">${discountPercentage}% OFF</span>
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
            navText: ['<span>&lt;</span>','<span>&gt;</span>'],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });
        
        // Add event listeners to dynamically created elements
        
        // Wishlist button functionality
        $(document).on('click', '.wishlist-btn', function() {
            const productId = $(this).data('product-id');
            console.log(`Adding product ID ${productId} to wishlist`);
            $(this).find('i').toggleClass('far fas');
        });
        
        // Add to cart button functionality
        $(document).on('click', '.add-to-cart-btn', function() {
            const productId = $(this).data('product-id');
            console.log(`Adding product ID ${productId} to cart`);
            
            // Provide visual feedback
            const originalText = $(this).text();
            $(this).text('Added!').prop('disabled', true);
            
            setTimeout(() => {
                $(this).text(originalText).prop('disabled', false);
            }, 2000);
        });
        
        // Color option functionality
        $(document).on('click', '.color-option', function() {
            $(this).closest('.color-options').find('.color-option').css('border-color', '#ddd');
            $(this).css('border-color', '#333');
        });
    }
});
// //////////////////////////////////// like product slider /////////////////////////////////////////////