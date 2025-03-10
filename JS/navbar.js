function gotooffer() {
    window.location.href = "../Parth/Offer.html";
}






let userId = localStorage.getItem("userId")

function handleSingUp() {
    if (userId) {
        window.location.href = "/Dhruvin/MyAccount.html"
    } else {
        var myModal = new bootstrap.Modal(document.getElementById('signUpModal'));
        myModal.show();
    }
}

let registerId = localStorage.getItem("registerId")
let handleObj = {}

async function handleApiGetData() {
    if(registerId){
        try{
            const response = await fetch(`http://localhost:3000/User/${registerId}`)
            const json = await response.json()
               handleObj = json
          }catch(error){
             alert(error)
          }
    }
}
handleApiGetData()

const menu = document.querySelector(".menu");
const menuInner = menu.querySelector(".menu-inner");
const menuArrow = menu.querySelector(".menu-arrow");
const burger = document.querySelector(".burger");
const overlay = document.querySelector(".overlay");

// Navbar Menu Toggle Function
function toggleMenu() {
    menu.classList.toggle("is-active");
    overlay.classList.toggle("is-active");

    console.log('cliksss');
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

// *****************************   best seller js************************  //

// const bestSellerData = async () => {
//     try {
//         const response = await fetch("http://localhost:3000/products");
//         const products = await response.json();
//         console.log(products);

//         const container = document.getElementById("product-container");
//         container.innerHTML = ""; // Clear previous content

//         products.forEach(product => {
//             const productElement = document.createElement("div");
//             productElement.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-4");
//             let colorDotsHTML = product.colors ? product.colors.map((color, index) => `
//             <div class="V_color_border mx-1" data-color-index="${index}" data-color="${color.color}">
//                 <p class="color-dot" style="background-color: ${color.color};"></p>
//             </div>
//         `).join('') : "";
//             let moreColorsHTML = product.moreColors ? `<span class="more-colors ">+${product.moreColors}</span>` : '';
//             productElement.innerHTML = `
//                         <div class="card h-100 text-center p-3">
//                             <div class="d-flex justify-content-between align-items-center">
//                                 <div>
//                                    ${product.tags ? `<span class="badge">${product.tags}</span>` : ''}
//                                 </div>
//                                 <span class="ms-auto heart-container" >
//                                     <i class="fa-regular fa-heart"  ></i>
//                                     <i class="fa-solid fa-heart d-none" style=" color: #ff0000; " ></i>
//                                 </span>
//                            </div>
//                             <img src="${product.image}" class="card-img-top A_img_size mx-auto d-block" alt="${product.name}" style="max-width: 100%; height: auto;">
//                             <div class="card-body ">
//                                 <h6 class="card-title">${product.name}</h6>
//                                 <div class="product-price justify-content-center">
//                                     <span class="current-price">$${product.price}</span>
//                                     <span class="original-price">$${product.originalPrice}</span>
//                                     <span class="discount">${product.discount}</span>
//                                 </div>
//                                 <div class="color-options justify-content-center">
//                                     ${colorDotsHTML}
//                                     ${moreColorsHTML}
//                                 </div>
//                                 <div>
//                                        <button class="mt-2 w-100 A_addtocart_hover">Add To Cart</button>
//                                 </div>
                            
//                             </div>
//                         </div>
//                     `;
//             container.appendChild(productElement);
//         });
//     } catch (error) {
//         console.error("Error fetching products:", error.message);
//     }
// };

// window.onload = bestSellerData;

$(document).ready(async function () {
    const userId = localStorage.getItem("userId");
    const userUrl = `http://localhost:3000/User/${userId}`;

    let userData = await fetchUserData(userUrl);
    let wishlist = userData.wishlist || [];

    // Ensure wishlist exists; if not, create it
    if (!userData.hasOwnProperty("wishlist")) {
        await createWishlist(userUrl);
        wishlist = [];
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

    async function createWishlist(url) {
        try {
            await fetch(url, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ wishlist: [] })
            });
        } catch (error) {
            console.error("Error creating wishlist:", error);
        }
    }

    async function updateWishlist(url, updatedWishlist) {
        try {
            await fetch(url, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ wishlist: updatedWishlist })
            });
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    }

    async function fetchProducts() {
        try {
            const response = await fetch("http://localhost:3000/newarrival");
            if (!response.ok) throw new Error("Failed to fetch products");
            const products = await response.json();

            const carousel = $("#product-carousel");
            carousel.empty();

            products.forEach(product => {
                let colorDotsHTML = product.colors ? product.colors.map((color, index) => `
                    <div class="V_color_border" data-color-index="${index}" data-color="${color.color}">
                        <p class="color-dot" style="background-color: ${color.color};"></p>
                    </div>
                `).join('') : "";

                let moreColorsHTML = product.moreColors ? `<span class="more-colors ">+${product.moreColors}</span>` : '';

                const isWishlisted = wishlist.some(item => item.id === product.id);
                const productElement = `
                    <div class="item A_newarrival_slider" data-id="${product.id}">
                        <div class="card h-100 text-center p-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="position-relative">
                                    <div>${product.tags ? `<span class="badge">${product.tags}</span>` : ''}</div>
                                    ${product.tags ?  `<img src="../IMG/Dhruvin/star.png" class="ds_label_star">` : ""}
                                </div>
                                <div class="heart-container">
                                    <i class="fa-regular fa-heart wishlist-btn ${isWishlisted ? 'd-none' : ''}"></i>
                                    <i class="fa-solid fa-heart wishlist-btn ${isWishlisted ? '' : 'd-none'}" style="color: #ff0000;"></i>
                                </div>
                            </div>
                             <a href="../../Akshay/singlepage.html?id=${product.id}&array=newarrival">
                            <img src="${product.image}" class="card-img-top A_img_size mx-auto d-block" alt="${product.name}">
                            </a>
                            <div class="card-body">
                                <h6 class="card-title text-truncate">${product.name}</h6>
                                <div class="product-price justify-content-center">
                                    <span class="current-price">$${product.price}</span>
                                    <span class="original-price">$${product.originalPrice}</span>
                                    <span class="discount">${product.discount}</span>
                                </div>
                                <div class="color-options V_height justify-content-center">
                                    ${colorDotsHTML} ${moreColorsHTML}
                                </div>
                                
                            </div>
                            <button class="mt-2 w-100 A_addtocart_hover">Add To Cart</button>
                        </div>
                    </div>`;

                carousel.append(productElement);
            });

            // Initialize the carousel after appending elements
            carousel.owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                // navText: ["<span class='owl-prev'>&lsaquo;</span>", "<span class='owl-next'>&rsaquo;</span>"],
                dots: false,
                responsive: {
                    0: { items: 1 },
                    600: { items: 2 },
                    1000: { items: 4 }
                }
            });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    let lastSelectedColor = null; // Store the last selected color globally

    $(document).on("click", ".V_color_border", function (event) {
        const selectedElement = event.target.closest(".V_color_border");
        if (!selectedElement) return;
    
        const productElement = $(selectedElement).closest(".item"); // Get the product container
        const selectedColor = selectedElement.getAttribute("data-color");
    
        // Reset the previously selected color's border
        if (lastSelectedColor) {
            lastSelectedColor.style.border = "0.6px solid rgba(20, 20, 20, 0.2)";
        }
    
        // Apply border to the newly selected color
        selectedElement.style.border = "1px solid black"; // Updated border to highlight selected color
        lastSelectedColor = selectedElement; 
    
        // Store the selected color in the product element for wishlist/cart functionality
        productElement.data("selectedColor", selectedColor);
    });
    

    
    async function toggleWishlist(event) {
        event.stopPropagation();
        const heartContainer = $(event.currentTarget).closest(".heart-container");
        const regularHeart = heartContainer.find(".fa-regular.fa-heart");
        const solidHeart = heartContainer.find(".fa-solid.fa-heart");

        const productElement = $(event.currentTarget).closest(".item");
        const productId = productElement.data("id");

        const selectedColor = productElement.data("selectedColor") || null;

        // Fetch product data from JSON server
        const response = await fetch(`http://localhost:3000/newarrival/${productId}`);
        if (!response.ok) return;
        const product = await response.json();

        const existingItemIndex = wishlist.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            wishlist.splice(existingItemIndex, 1);
            await updateWishlist(userUrl, wishlist);
            regularHeart.removeClass("d-none");
            solidHeart.addClass("d-none");
        } else {
            const wishlistItem = {
                id: product.id,
                image: product.image,
                brand: product.brand,
                name: product.name,
                originalPrice: product.originalPrice,
                currentPrice: product.price,
                discount: product.discount,
                colors: product.colors ? product.colors.map(color => color.color) : [], // Extract only color values
                moreColors: product.moreColors || 0,
                selectedColor: selectedColor || null,
                badge: product?.tags ? true : false
            };

            wishlist.push(wishlistItem);
            await updateWishlist(userUrl, wishlist);
            regularHeart.addClass("d-none");
            solidHeart.removeClass("d-none");
        }
    }

    // Delegate event listeners to dynamically loaded elements
    $(document).on("click", ".heart-container", toggleWishlist);

    await fetchProducts();
});

$(document).on("click", ".A_addtocart_hover", async function (event) {
    event.stopPropagation();

    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("User not logged in.");
        return;
    }

    const userUrl = `http://localhost:3000/User/${userId}`;
    const productElement = $(this).closest(".item");
    const productId = productElement.data("id");

     // Get the selected color
     const selectedColor = productElement.data("selectedColor") || null;


    try {
        // Fetch product details
        const response = await fetch(`http://localhost:3000/newarrival/${productId}`);
        if (!response.ok) throw new Error("Product not found");
        const product = await response.json();

        // Fetch user data
        let userResponse = await fetch(userUrl);
        if (!userResponse.ok) throw new Error("User not found");
        let userData = await userResponse.json();

        let cart = userData.orders || []; // Get existing cart items

        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            // If product exists, increase quantity
            cart[existingItemIndex].quantity += 1;
        } else {
            // If product does not exist, add it to cart
            const cartItem = {
                id: Date.now(),
                image: product.image,
                brand: product.brand,
                name: product.name,
                currentPrice: product.price,
                quantity: 1,
                selectedColor: selectedColor || null // Default color selection
            };
            cart.push(cartItem);
        }

        // Update the orders array in the JSON server
        await fetch(userUrl, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orders: cart })
        });

        console.log("Cart updated successfully:", cart);
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
});




// document.addEventListener("DOMContentLoaded", async function () {
//     const userId = localStorage.getItem("userId"); // Get user ID from localStorage
//     const userUrl = `http://localhost:3000/users/${userId}`; // JSON Server User API

//     let userData = await fetchUserData(userUrl);
    
//     // Ensure wishlist exists; if not, create an empty array
//     let wishlist = userData.wishlist || [];
//     if (!userData.hasOwnProperty("wishlist")) {
//         await createWishlist(userUrl);
//         wishlist = [];
//     }

//     // Function to fetch user data
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

//     // Function to create an empty wishlist if not present
//     async function createWishlist(url) {
//         try {
//             await fetch(url, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ wishlist: [] })
//             });
//         } catch (error) {
//             console.error("Error creating wishlist:", error);
//         }
//     }

//     // Function to update the wishlist in JSON server
//     async function updateWishlist(url, updatedWishlist) {
//         try {
//             await fetch(url, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ wishlist: updatedWishlist })
//             });
//         } catch (error) {
//             console.error("Error updating wishlist:", error);
//         }
//     }

//     // Function to toggle wishlist
//     async function toggleWishlist(event, product) {
//         event.stopPropagation();
//         const heartContainer = event.currentTarget.closest(".heart-container");
//         const regularHeart = heartContainer.querySelector(".fa-regular.fa-heart");
//         const solidHeart = heartContainer.querySelector(".fa-solid.fa-heart");

//         const existingItemIndex = wishlist.findIndex(item => item.id === product.id);

//         if (existingItemIndex !== -1) {
//             // Remove from wishlist
//             wishlist.splice(existingItemIndex, 1);
//             await updateWishlist(userUrl, wishlist);
//             regularHeart.classList.remove("d-none");
//             solidHeart.classList.add("d-none");
//         } else {
//             // Add to wishlist
//             const wishlistItem = {
//                 id: product.id,
//                 image: product.image,
//                 brand: product.brand,
//                 name: product.name,
//                 actualPrice: product.originalPrice,
//                 currentPrice: product.price,
//                 discount: product.discount,
//                 colors: product.colors || [],
//                 moreColors: product.moreColors || 0,
//                 selectedColor: product.selectedColor || null,
//                 hasTag: product.tags ? true : false
//             };

//             wishlist.push(wishlistItem);
//             await updateWishlist(userUrl, wishlist);
//             regularHeart.classList.add("d-none");
//             solidHeart.classList.remove("d-none");
//         }
//     }

//     // Attach event listeners to wishlist buttons
//     document.querySelectorAll(".heart-container").forEach((heartContainer, index) => {
//         const regularHeart = heartContainer.querySelector(".fa-regular.fa-heart");
//         const solidHeart = heartContainer.querySelector(".fa-solid.fa-heart");

//         // Get corresponding product data
//         const product = products[index];

//         // Check if the product is already in the wishlist
//         if (wishlist.some(item => item.id === product.id)) {
//             regularHeart.classList.add("d-none");
//             solidHeart.classList.remove("d-none");
//         }

//         // Attach event listener to toggle wishlist
//         heartContainer.addEventListener("click", (event) => toggleWishlist(event, product));
//     });
// });





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

    const backdrop = document.querySelector(".ds_modal_backdrop");
    if (backdrop) {
        document.querySelector(".V_input").value = "";
        backdrop.remove();

        // document.body.style.overflow = ""; // Restore scrolling
    } // Ensure backdrop is removed when closing
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
    const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) {
                backdrop.remove(); 
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









































document.addEventListener('DOMContentLoaded', function() {
    let products = [];
    const productContainer = document.getElementById('product-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log(filterButtons);
    

    // Fetch products from JSON server
    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:3000/products');
            products = await response.json();
            console.log(products);
            
            // Initially filter by Skincare (first category)
            filterProducts('Skincare');
        } catch (error) {
            console.error('Error fetching products:', error);
            productContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    }

    // Display products
    function displayProducts(productsToShow) {
        const productsHTML = productsToShow.map(product => `
            <div class="d-flex align-items-center A_care_margin " data-category="${product.category}">
                <div>
                    <img src="${product.image}" alt="${product.name}" class="A_filter_size">
                </div>
                <div class=" A_filter_text">
                    <h6>${product.name}</h6>
                    <h5>$${product.price} ${product.oldPrice ? `<span class="text-decoration-line-through">$${product.oldPrice}</span>` : ''}</h5>
                </div>
            </div>
        `).join('');

        productContainer.innerHTML = `
            <div class="d-flex align-items-center ">
                <div>${productsHTML}</div>
            </div>
        `;
    }

    // Filter products
    function filterProducts(category) {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter products
            filterProducts(button.dataset.category);
        });
    });

    // Initial fetch
    fetchProducts();
});


//////////////////////////////////////// filter product btn //////////////////////////////////// 
 
document.addEventListener('DOMContentLoaded', function() {
    let products = [];
    const productContainer = document.getElementById('productcontainer');
    const filterButtons = document.querySelectorAll('.filter-btn');

    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:3000/products');
            if (!response.ok) throw new Error('Failed to fetch products');

            products = await response.json();
            console.log('Fetched products:', products);

            if (products.length === 0) {
                console.warn('No products found in the API response.');
            }

            filterProducts('Skincare'); // Change if Skincare is not available
        } catch (error) {
            console.error('Error fetching products:', error);
            productContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    }

    function displayProducts(productsToShow) {
        console.log('Displaying products:', productsToShow);

        if (!productContainer) {
            console.error('Product container not found!');
            return;
        }

        if (productsToShow.length === 0) {
            productContainer.innerHTML = '<p>No products found in this category.</p>';
            return;
        }

        let leftColumn = [];
        let rightColumn = [];

        productsToShow.forEach((product, index) => {
            const productHTML = `
                <div class="d-flex align-items-center A_care_margin " data-category="${product.category}">
                    <div class="align-self-center">
                        <img src="${product.image}" alt="${product.name}" class="A_filter_size">
                    </div>
                    <div class=" A_filter_text">
                        <h6>${product.name}</h6>
                        <h5>$${product.price} ${product.oldPrice ? `<span class="text-decoration-line-through">$${product.oldPrice}</span>` : ''}</h5>
                    </div>
                </div>
            `;

            if (index % 2 === 0) {
                leftColumn.push(productHTML);
            } else {
                rightColumn.push(productHTML);
            }
        });

        productContainer.innerHTML = `
            <div class="d-sm-flex  justify-content-around">
                <div class="mx-auto">${leftColumn.join('')}</div>
                <div class=" mx-auto ">${rightColumn.join('')}</div>
            </div>
        `;
    }

    function filterProducts(category) {
        console.log('Filtering for category:', category);
        
        if (!products || products.length === 0) {
            console.error("Products array is empty or undefined.");
            return;
        }

        const filteredProducts = products.filter(product => product.category === category);
        console.log('Filtered products:', filteredProducts);

        displayProducts(filteredProducts);
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            console.log('Button clicked:', category);

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            filterProducts(category);
        });
    });

    fetchProducts();
});










// ************* Cancel Order ********************
const batchId = localStorage.getItem("MyBatchId")
let passwordObj = {}

async function getOrderData () {
    const respose = await fetch(`http://localhost:3000/User/${userId}`)
    const json = await respose.json()
    console.log(json);
    
    passwordObj = json

    const filter = json?.confirmedOrders?.find((element)=> element?.batchId == batchId)
    // console.log('filter' , filter);
}

getOrderData()


async function handleCancelOrder() {
    let select = document.querySelector("select[name='reason']")?.value;
    let comments = document.querySelector("#ds_textarea").value.trim();

    if (!select) {
        alert("Please select a reason for cancellation.");
        return;
    }

    if (comments === "") {
        alert("Please provide additional comments for your reason.");
        return;
    }

    let myDate =  new Date().toISOString()?.split("T")[0]
    // Find the specific order using batchId
    let updatedOrders = passwordObj?.confirmedOrders?.map(order => {
        if (order.batchId === batchId) {
            return {
                ...order,
                orderStatus:"cancelled",
                cancel: {
                    reason: select,
                    comment: comments,
                    cancelDate:myDate
                }
            };
        }
        return order;
    });



    const userData = {
        id:passwordObj?.id,
        fullName:passwordObj?.fullName,
        email:passwordObj?.email,
        password:passwordObj?.password,
        dateOfBirth:passwordObj?.dateOfBirth,
        gender:passwordObj?.gender,
        phoneNumber:passwordObj?.phoneNumber,
        selectedImage:passwordObj?.selectedImage,
        addresses: passwordObj?.addresses,
        carddetails: passwordObj?.carddetails,
        confirmedOrders: updatedOrders,
        orders:passwordObj?.orders,
        wishlist:passwordObj?.wishlist
    };

    try {
        const response = await fetch(`http://localhost:3000/User/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (response) {
            alert("Order cancellation request submitted successfully!");
            localStorage.setItem("cancelSuccess", "true");
        } else {
            alert("Failed to update order. Please try again.");
        }
    } catch (error) {
        console.error("Error updating order:", error);
        alert("An error occurred. Please try again later.");
    }
}

function hello() {
    let modal = new bootstrap.Modal(document.getElementById('cancelOrder'));
    modal.show();
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cancelSuccess") === "true") {
        localStorage.removeItem("cancelSuccess"); 
        hello(); 
    }
});






// ************* OrderStatus Delivered.html ********************

async function getOrderData () {
    const respose = await fetch(`http://localhost:3000/User/${userId}`)
    const json = await respose.json()
    console.log("json" , json);

    const filter = json?.confirmedOrders?.find((element)=> element?.batchId == batchId)
    console.log('filter' , filter);
    document.getElementById("ds_deliverOrder_id").innerHTML = filter?.batchId
    document.getElementById("ds_deliverOrder_date").innerHTML = filter?.orderDate
    document.getElementById("ds_deliverOrder_date2").innerHTML = filter?.orderDate

    const shipDate = new Date(filter?.orderDate)
    shipDate.setDate(shipDate.getDate() + 3);
    document.getElementById("ds_deliverOrder_ship").innerHTML = shipDate?.toISOString()?.split("T")[0]; 
    document.getElementById("ds_deliverOrder_ship2").innerHTML = shipDate?.toISOString()?.split("T")[0]; 

    const expectedDate = new Date(filter?.orderDate)
    expectedDate.setDate(expectedDate.getDate() + 5);
    document.getElementById("ds_deliverOrder_out").innerHTML = expectedDate?.toISOString()?.split("T")[0]; 
    document.getElementById("ds_deliverOrder_out2").innerHTML = expectedDate?.toISOString()?.split("T")[0]; 

    const deliverDate = new Date(filter?.orderDate)
    deliverDate.setDate(deliverDate.getDate() + 10);
    document.getElementById("ds_deliverOrder_come").innerHTML = deliverDate?.toISOString()?.split("T")[0]; 
    document.getElementById("ds_deliverOrder_come2").innerHTML = deliverDate?.toISOString()?.split("T")[0]; 

    document.getElementById("ds_deliverOrder_miniId").innerHTML = filter?.batchId
    document.getElementById("ds_deliverOrder_confirm").innerHTML = filter?.orderDate
    document.getElementById("ds_deliverOrder_come").innerHTML = filter?.deliveryDate

    document.getElementById("ds_deliverOrder_name").innerHTML = filter?.shippingDetails?.name
    document.getElementById("ds_deliverOrder_address").innerHTML = filter?.shippingDetails?.address
    document.getElementById("ds_deliverOrder_num").innerHTML = filter?.shippingDetails?.mobile

    let productData = document.getElementById("ds_deliverProduct_detail")
    let html = filter?.orders?.map((element)=>{
          return `<div class="row align-items-center">
                                <div class="col-xl-2 col-lg-4 col-md-5 col-sm-4 col-6  mt-3">
                                  <div>
                                    <img src="${element?.image}" alt="">
                                  </div>
                                </div>
                                <div class="col-xl-10 col-lg-8 col-md-7 col-sm-8 col-12 mt-3">
                                  <div>
                                     <p class="ds_color">${element?.brand ? element?.brand : ''} ${element?.name}</p>
                                     <p class="ds_muted">Shade : <span class="ds_color">${element?.selectedColor ? element?.selectedColor : 'No Color'}</span></p>
                                     <div class="d-flex justify-content-between">
                                        <p class="ds_muted">Qty : <span class="ds_color">X1</span></p>
                                        <h5 class="ds_color ds_600">$${element?.currentPrice}</h5>
                                     </div>
                                  </div>
                                </div>
                               </div>
                               <div class="ds_order_border mt-3"></div>
                               `
    }).join("")
    productData.innerHTML = html

    document.getElementById("ds_deliverItem_length").innerHTML = filter?.orders?.length
    document.getElementById("ds_deliverSub_total").innerHTML = filter?.orders?.reduce((x , y)=> x.totalAmount + y.totalAmount)
    document.getElementById("ds_deliverItem_discount").innerHTML = parseFloat(filter?.orders?.reduce((x , y)=> x.totalAmount + y.totalAmount) * 20 / 100)
    document.getElementById("ds_deliverItem_total").innerHTML = filter?.totalAmount

}

getOrderData()




// ************* OrderStatus Processing.html ********************

async function getOrderDataProccessing () {
    const respose = await fetch(`http://localhost:3000/User/${userId}`)
    const json = await respose.json()
    console.log("json" , json);

    const filter = json?.confirmedOrders?.find((element)=> element?.batchId == batchId)
    console.log('filter' , filter);
    document.getElementById("ds_order_id").innerHTML = filter?.batchId
    document.getElementById("ds_order_date").innerHTML = filter?.orderDate
    document.getElementById("ds_order_date2").innerHTML = filter?.orderDate

    const shipDate = new Date(filter?.orderDate)
    shipDate.setDate(shipDate.getDate() + 3);
    document.getElementById("ds_order_ship").innerHTML = shipDate?.toISOString()?.split("T")[0]; 
    document.getElementById("ds_order_ship2").innerHTML = shipDate?.toISOString()?.split("T")[0]; 

    const expectedDate = new Date(filter?.orderDate)
    expectedDate.setDate(expectedDate.getDate() + 5);
    document.getElementById("ds_order_expected").innerHTML = expectedDate?.toISOString()?.split("T")[0]; 
    document.getElementById("ds_order_expected2").innerHTML = expectedDate?.toISOString()?.split("T")[0]; 

    const deliverDate = new Date(filter?.orderDate)
    deliverDate.setDate(deliverDate.getDate() + 10);
    document.getElementById("ds_order_deliver").innerHTML = deliverDate?.toISOString()?.split("T")[0]; 
    document.getElementById("ds_order_deliver2").innerHTML = deliverDate?.toISOString()?.split("T")[0]; 

    document.getElementById("ds_order_miniId").innerHTML = filter?.batchId
    document.getElementById("ds_order_confirm").innerHTML = filter?.orderDate
    document.getElementById("ds_order_come").innerHTML = filter?.deliveryDate

    document.getElementById("ds_order_name").innerHTML = filter?.shippingDetails?.name
    document.getElementById("ds_order_address").innerHTML = filter?.shippingDetails?.address
    document.getElementById("ds_order_num").innerHTML = filter?.shippingDetails?.mobile

    let productData = document.getElementById("ds_product_detail")
    let html = filter?.orders?.map((element)=>{
          return `<div class="row align-items-center">
                                <div class="col-xl-2 col-lg-4 col-md-5 col-sm-4 col-6  mt-3">
                                  <div>
                                    <img src="${element?.image}" alt="">
                                  </div>
                                </div>
                                <div class="col-xl-10 col-lg-8 col-md-7 col-sm-8 col-12 mt-3">
                                  <div>
                                     <p class="ds_color">${element?.brand ? element?.brand : ''} ${element?.name}</p>
                                     <p class="ds_muted">Shade : <span class="ds_color">${element?.selectedColor ? element?.selectedColor : 'No Color'}</span></p>
                                     <div class="d-flex justify-content-between">
                                        <p class="ds_muted">Qty : <span class="ds_color">X1</span></p>
                                        <h5 class="ds_color ds_600">$${element?.currentPrice}</h5>
                                     </div>
                                  </div>
                                </div>
                               </div>
                               <div class="ds_order_border mt-3"></div>
                               `
    }).join("")
    productData.innerHTML = html

    document.getElementById("ds_item_length").innerHTML = filter?.orders?.length
    document.getElementById("ds_sub_total").innerHTML = filter?.orders?.reduce((x , y)=> x.totalAmount + y.totalAmount)
    document.getElementById("ds_item_discount").innerHTML = parseFloat(filter?.orders?.reduce((x , y)=> x.totalAmount + y.totalAmount) * 20 / 100)
    document.getElementById("ds_item_total").innerHTML = filter?.totalAmount

}

getOrderDataProccessing()



// ************* ReturnOrder.html ********************
var ds_MainId 
var ds_json

async function getReturnOrderData () {
    const respose = await fetch(`http://localhost:3000/User/${userId}`)
    ds_json = await respose?.json()
    passwordObj = ds_json
    console.log("json" , ds_json);
    const finalId = ds_json?.confirmedOrders?.filter((element)=> element?.batchId == batchId)
    ds_MainId = finalId?.find((element)=> element?.batchId)    
    console.log(ds_MainId?.batchId);
}

getReturnOrderData()


async function handleRequestOtp () {
    const orderId = document.getElementById("ds_order_input").value.trim()
    const phone = document.getElementById("ds_order_phone").value.trim()
    const reason = document.querySelector("select[name='reason']")?.value;

    if (!orderId) {
        alert("Please enter your order ID.");
        return;
    }
    if (!phone) {
        alert("Please enter your phone number.");
        return;
    }
    if (!reason) {
        alert("Please select a reason for return.");
        return;
    }
    if (orderId !== ds_MainId?.batchId) {
        alert("Invalid order ID. Please check and try again.");
        return;
    }
    if (phone !== ds_json?.phoneNumber) {
        alert("Invalid phone number. Please check and try again.");
        return;
    }

    
    document.getElementById("ds_all_otp").classList.remove("d-none");
    document.getElementById("ds_confirm_btn").classList.remove("d-none");
    alert("Your Otp Is -: 123456")
    document.getElementById("ds_order_request").classList.add("d-none");

    
}

async function handleConfirmReturn(event) {
    // event.preventDefault();
    const orderId = document.getElementById("ds_order_input").value.trim();
    const phone = document.getElementById("ds_order_phone").value.trim();
    const reason = document.querySelector("select[name='reason']")?.value;
    const otpInputs = document.querySelectorAll(".ds_return_otp");

    if (!orderId) {
        alert("Please enter your order ID.");
        return;
    }
    if (!phone) {
        alert("Please enter your phone number.");
        return;
    }
    if (!reason) {
        alert("Please select a reason for return.");
        return;
    }
    if (orderId !== ds_MainId?.batchId) {
        alert("Invalid order ID. Please check and try again.");
        return;
    }
    if (phone !== ds_json?.phoneNumber) {
        alert("Invalid phone number. Please check and try again.");
        return;
    }

    let enteredOtp = "";
    let finalOtp = "123456"
    otpInputs.forEach(input => {
        enteredOtp += input.value.trim();
    });

    if (enteredOtp.length !== 6 || isNaN(enteredOtp)) {
        alert("Please enter a valid 6-digit OTP.");
        return;
    }

    // Assuming expectedOtp is stored somewhere (Fix the incorrect condition)
    if (enteredOtp !== finalOtp) {
        alert("Incorrect OTP. Please try again.");
        return;
    }

    document.getElementById("ds_all_otp").classList.add("d-none");
    document.getElementById("ds_confirm_btn").classList.add("d-none");
    document.getElementById("ds_order_request").classList.remove("d-none");

    try {
        // Ensure batchId is properly defined
        const batchId = ds_MainId?.batchId;

        // Check if the order exists in confirmedOrders
        const orderIndex = ds_json?.confirmedOrders?.findIndex(order => order.batchId === batchId);

        if (orderIndex === -1) {
            alert("Order not found.");
            return;
        }

        // Add returnOrder key to the matched order
        ds_json.confirmedOrders[orderIndex].orderStatus = "return order";
        ds_json.confirmedOrders[orderIndex].returnOrder = {
            reason: reason,
            returnDate: new Date().toISOString()?.split("T")[0],
        };

        const userData = {
            id:passwordObj?.id,
            fullName:passwordObj?.fullName,
            email: passwordObj?.email,
            password: passwordObj?.password,
            dateOfBirth: passwordObj?.dateOfBirth || "",
            gender: passwordObj?.gender || "",
            phoneNumber: passwordObj?.phoneNumber,
            selectedImage: passwordObj?.selectedImage || "", // Store Base64 image string
            addresses: passwordObj?.addresses ? passwordObj?.addresses : [],
            carddetails: passwordObj?.carddetails ? passwordObj?.carddetails : [],
            confirmedOrders:ds_json?.confirmedOrders,
            orders:passwordObj?.orders ? passwordObj?.orders : [],
            wishlist:passwordObj?.wishlist ? passwordObj?.wishlist : []
        }

        // Send the updated data to the server using fetch
        const response = await fetch(`http://localhost:3000/User/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert("Return request submitted successfully.");
            
        } else {
            alert("Failed to submit return request. Try again.");
        }
    } catch (error) {
        console.error("Error updating order:", error);
        alert("An error occurred while processing your request.");
    }

}



// ************* ReturnRefundStatus.html ********************

async function getReturnRefundStatusData () {
    const respose = await fetch(`http://localhost:3000/User/${userId}`)
    const json = await respose.json()
    console.log("json" , json);

    const filter = json?.confirmedOrders?.find((element)=> element?.batchId == batchId)
    console.log('filter' , filter);
    document.getElementById("ds_refund_id").innerHTML = filter?.batchId
    document.getElementById("ds_refund_date").innerHTML = filter?.returnOrder?.returnDate
    document.getElementById("ds_refund_date2").innerHTML = filter?.returnOrder?.returnDate

    const shipDate = new Date(filter?.returnOrder?.returnDate)
    shipDate.setDate(shipDate.getDate() + 3);
    document.getElementById("ds_refund_picke").innerHTML = shipDate?.toISOString()?.split("T")[0]; 
    document.getElementById("ds_refund_picke2").innerHTML = shipDate?.toISOString()?.split("T")[0]; 

    // const expectedDate = new Date(filter?.orderDate)
    // expectedDate.setDate(expectedDate.getDate() + 5);
    // document.getElementById("ds_order_expected").innerHTML = expectedDate?.toISOString()?.split("T")[0]; 
    // document.getElementById("ds_order_expected2").innerHTML = expectedDate?.toISOString()?.split("T")[0]; 

    // const deliverDate = new Date(filter?.orderDate)
    // deliverDate.setDate(deliverDate.getDate() + 10);
    // document.getElementById("ds_order_deliver").innerHTML = deliverDate?.toISOString()?.split("T")[0]; 
    // document.getElementById("ds_order_deliver2").innerHTML = deliverDate?.toISOString()?.split("T")[0]; 

    document.getElementById("ds_refund_miniId").innerHTML = filter?.batchId
    document.getElementById("ds_refund_confirm").innerHTML = filter?.orderDate
    document.getElementById("ds_refund_come").innerHTML = filter?.deliveryDate

    document.getElementById("ds_refund_name").innerHTML = filter?.shippingDetails?.name
    document.getElementById("ds_refund_address").innerHTML = filter?.shippingDetails?.address
    document.getElementById("ds_refund_num").innerHTML = filter?.shippingDetails?.mobile

    let productData = document.getElementById("ds_refund_details")
    let html = filter?.orders?.map((element)=>{
          return `<div class="row align-items-center">
                                <div class="col-xl-2 col-lg-4 col-md-5 col-sm-4 col-6  mt-3">
                                  <div>
                                    <img src="${element?.image}" alt="">
                                  </div>
                                </div>
                                <div class="col-xl-10 col-lg-8 col-md-7 col-sm-8 col-12 mt-3">
                                  <div>
                                     <p class="ds_color">${element?.brand ? element?.brand : ''} ${element?.name}</p>
                                     <p class="ds_muted">Shade : <span class="ds_color">${element?.selectedColor ? element?.selectedColor : 'No Color'}</span></p>
                                     <div class="d-flex justify-content-between">
                                        <p class="ds_muted">Qty : <span class="ds_color">X1</span></p>
                                        <h5 class="ds_color ds_600">$${element?.currentPrice}</h5>
                                     </div>
                                  </div>
                                </div>
                               </div>
                               <div class="ds_order_border mt-3"></div>
                               `
    }).join("")
    productData.innerHTML = html

    document.getElementById("ds_item_length").innerHTML = filter?.orders?.length
    document.getElementById("ds_sub_total").innerHTML = filter?.orders?.reduce((x , y)=> x.totalAmount + y.totalAmount)
    document.getElementById("ds_item_discount").innerHTML = parseFloat(filter?.orders?.reduce((x , y)=> x.totalAmount + y.totalAmount) * 20 / 100)
    document.getElementById("ds_item_total").innerHTML = filter?.totalAmount

}

getReturnRefundStatusData()


// ************* TrackOrder.html ********************


let ds_AllBatchId = [];
let ds_PendingId = [];
let ds_DeliverId = [];
let ds_PhoneNumber;

async function getTrackOrderData() {
    try {
        const response = await fetch(`http://localhost:3000/User/${userId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const json = await response.json();
        console.log(json);

        passwordObj = json;
        ds_DeliverId = json?.phoneNumber;

        ds_AllBatchId = json?.confirmedOrders?.filter(order => order?.batchId)?.map(order => order?.batchId) || [];
        console.log("All Batch IDs:", ds_AllBatchId);

        ds_PendingId = json?.confirmedOrders?.filter(order => order?.orderStatus === "pending")?.map(order => order?.batchId) || [];

        ds_DeliverId = json?.confirmedOrders?.filter(order => order?.orderStatus === "delivered")?.map(order => order?.batchId) || [];
        console.log("Delivered Order Batch IDs:", ds_DeliverId);
        
    } catch (error) {
        console.error("Error fetching order data:", error);
    }
}

getTrackOrderData();

function handleTrackOrder() {
    let orderId = document.getElementById("ds_track_input").value.trim();
    let phone = document.getElementById("ds_track_phone").value.trim();

    if (!ds_AllBatchId.includes(orderId)) {
        alert("Your Order ID does not match any existing orders.");
        return;
    }

    if (phone !== ds_DeliverId) {
        alert("Your Phone Number does not match.");
        return;
    }

    localStorage.setItem("MyBatchId", orderId);

    if (ds_PendingId.includes(orderId)) {
        window.location.href = "/Dhruvin/OrderStatus(Processing).html";
    } else if (ds_DeliverId.includes(orderId)) {
        window.location.href = "/Dhruvin/OrderStatus(Delivered).html";
    }
    else{
        alert("Your Order Is Not Match")
    }
}
