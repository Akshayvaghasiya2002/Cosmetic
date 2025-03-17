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

    // console.log('cliksss');
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
                                <h6 class="card-title ds_manage_title">${product.name}</h6>
                                <div class="product-price justify-content-center">
                                    <span class="current-price">$${product.price}</span>
                                    <span class="original-price">$${product.originalPrice}</span>
                                    <span class="discount">${product.discount}</span>
                                </div>
                                <div class="color-options  justify-content-center">
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
                margin: 20,
                stagePadding: 10,
                nav: true,
                // navText: ["<span class='owl-prev'>&lsaquo;</span>", "<span class='owl-next'>&rsaquo;</span>"],
                dots: false,
                responsive: {
                    0: { items: 1 },
                    600: { items: 2 },
                    992:{items:3},
                    1200: { items: 4 }
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
        // alert("An error occurred while processing your request.");
    }

}


const ReturnOtpFields = document.querySelectorAll('.ds_return_otp');
            
ReturnOtpFields.forEach((field, index) => {
    field.addEventListener('input', (e) => {
        let value = e.target.value;
        
        // Ensure only a single digit is entered
        e.target.value = value.replace(/\D/g, '').slice(0, 1);

        // Move to next field if a digit is entered
        if (e.target.value && index < ReturnOtpFields.length - 1) {
            ReturnOtpFields[index + 1].focus();
        }
    });

    field.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !field.value && index > 0) {
            ReturnOtpFields[index - 1].focus();
        }
    });
});


// ************* ReturnRefundStatus.html ********************

async function getReturnRefundStatusData () {
    const respose = await fetch(`http://localhost:3000/User/${userId}`)
    const json = await respose.json()
    console.log("json" , json);

    const filter = json?.confirmedOrders?.find((element)=> element?.batchId == batchId)
    console.log('filter' , filter?.returnOrder.returnDate);
    document.getElementById("ds_refund_id").innerHTML = filter?.batchId
    document.getElementById("ds_refund_date").innerHTML = filter?.returnOrder.returnDate
    document.getElementById("ds_refund_date2").innerHTML = filter?.returnOrder.returnDate

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




// ************* TrackRefund.html ********************

async function getTrackRefundData () {
    const respose = await fetch(`http://localhost:3000/User/${userId}`)
    const json = await respose.json()
    // console.log(json);
    
    passwordObj = json

    const filter = json?.confirmedOrders?.find((element)=> element?.batchId == batchId)
    console.log('filter' , filter);

    document.getElementById("ds_refund_id").innerHTML = filter?.batchId
    document.getElementById("ds_track_date").innerHTML = filter?.cancel?.cancelDate
    document.getElementById("ds_track_date2").innerHTML = filter?.cancel?.cancelDate

    document.getElementById("ds_track_miniId").innerHTML = filter?.batchId
    document.getElementById("ds_track_confirm").innerHTML = filter?.orderDate
    document.getElementById("ds_track_come").innerHTML = filter?.deliveryDate

    document.getElementById("ds_track_name").innerHTML = filter?.shippingDetails?.name
    document.getElementById("ds_track_address").innerHTML = filter?.shippingDetails?.address
    document.getElementById("ds_track_num").innerHTML = filter?.shippingDetails?.mobile



    let productData = document.getElementById("ds_track_detail")
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

    document.getElementById("ds_track_length").innerHTML = filter?.orders?.length
    document.getElementById("ds_track_subTotal").innerHTML = filter?.orders?.reduce((x , y)=> x.totalAmount + y.totalAmount)
    document.getElementById("ds_track_discount").innerHTML = parseFloat(filter?.orders?.reduce((x , y)=> x.totalAmount + y.totalAmount) * 20 / 100)
    document.getElementById("ds_track_total").innerHTML = filter?.totalAmount
}

getTrackRefundData()






// ************* MyProfile.html ********************



document.getElementById("calendarIcon").addEventListener("click", function() {
    document.getElementById("datePicker").showPicker();
});


function handleManage(element) {
    
    const value = element.dataset.value;

    let offCanvas = document.getElementById("ds_offcanvasRight");
    if (offCanvas && offCanvas.classList.contains("show")) {
        let offcanvasInstance = bootstrap.Offcanvas.getInstance(offCanvas);
        if (offcanvasInstance) {
            offcanvasInstance.hide();
        }
    }
    
    if (value === "6") {
        // Open the modal if the logout button is clicked
        const modalElement = document.getElementById("logOutModal");
        if (modalElement) {
            let modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            console.error("Logout modal not found.");
        }
        return; // Stop further execution
    }

    // Other menu items handling
    const menuItems = document.querySelectorAll(".ds_func_manage, .ds_func_manage2, .ds_func_manage3, .ds_func_manage4, .ds_func_manage5, .ds_func_manage6");
    const sections = {
        1: document.getElementById("profileSection"),
        2: document.getElementById("orderSection"),
        3: document.getElementById("addressSection"),
        4: document.getElementById("passwordSection"),
        5: document.getElementById("deactivateSection"),
    };

    // Remove active class from all menu items
    menuItems.forEach(item => item.classList.remove("ds_active-border"));

    // Hide all sections
    Object.values(sections).forEach(section => {
        if (section) section.classList.add("d-none");
    });

    // Activate the selected menu item and show the corresponding section
    if (sections[value]) {
        // console.log("bgnrjkbgnrkbgoik " , sections[value]);
        element.classList.add("ds_active-border");
        sections[value].classList.remove("d-none");

        const sectionH4 = sections[value].querySelector("h4");
        if (sectionH4) {
            document.getElementById("ds_above_text").innerHTML = sectionH4.textContent.trim()
            // console.log("Section Title:", sectionH4.textContent.trim()); // Logs the text of the <h4>
        }
    }

   
}




// *********** My Profile **********

// -------- Edit Image
let selectedImage = null; // Variable to store selected image

document.getElementById('cameraIcon').addEventListener('click', function() {
    document.getElementById('fileInput').click(); // Trigger file input
});document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get selected file
    
    if (file) {
        selectedImage = file; // Store in variable        // Preview the selected image
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('userImage').src = e.target.result;
            document.getElementById('ds_mini_img').src = e.target.result;
            document.getElementById('ds_offcan_img').src = e.target.result;

        };
        reader.readAsDataURL(file);
    }
});

// ----- Edit Profile 
function handleEditSubmit(event) {
    event.preventDefault();

    let firstName = document.getElementById("ds_edit_first").value.trim();
    let lastName = document.getElementById("ds_edit_last").value.trim();
    let mobile = document.getElementById("ds_edit_mobile").value.trim();
    let email = document.getElementById("ds_edit_email").value.trim();
    let dob = document.getElementById("datePicker").value.trim();
    let femaleChecked = document.getElementById("female").checked;
    let maleChecked = document.getElementById("male").checked;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/; // Assumes a 10-digit mobile number

    if (firstName === "") {
        alert("First Name is required");
        return;
    }
    if (lastName === "") {
        alert("Last Name is required");
        return;
    }
    if (!mobilePattern.test(mobile)) {
        alert("Enter a valid 10-digit Mobile Number");
        return;
    }
    if (!emailPattern.test(email)) {
        alert("Enter a valid Email Address");
        return;
    }
    if (dob === "") {
        alert("Date of Birth is required");
        return;
    }
    if (!femaleChecked && !maleChecked) {
        alert("Please select a gender");
        return;
    }

    alert("Form submitted successfully!");
}

let userID = localStorage.getItem("userId")

function handleSelectFilter () {
    const select = document.getElementById('ds_order_select').value.trim()
    getUserProfileData(select)
}

function getUserProfileData(select = "all") {
    fetch("http://localhost:3000/User")
        .then((response) => response.json())
        .then((data) => {
            
            let user = data?.find((element) => element?.id == userID);             
            console.log("zzzzzzzzzzzz" , user );
            let deactiveInput = document.getElementById("ds_deactive_input");
if (deactiveInput) {
    deactiveInput.value = user?.phoneNumber || "";
}


            passwordObj = user      
            
            if (user) {
                document.getElementById("ds_edit_first").value = user?.fullName.split(" ")[0] || "";
                document.getElementById("ds_edit_last").value = user?.fullName.split(" ")[1] || "";
                document.getElementById("ds_edit_mobile").value = user?.phoneNumber || "";
                document.getElementById("ds_edit_email").value = user?.email || "";
                document.getElementById("datePicker").value = user?.dateOfBirth || "";
                document.getElementById("ds_mini_img").src = `${user?.selectedImage ? user?.selectedImage : '/IMG/Dhruvin/myPerson.png'}` ;
                document.getElementById("userImage").src = `${user?.selectedImage ? user?.selectedImage : '/IMG/Dhruvin/myPerson.png'}` ;
                document.getElementById("ds_offcan_img").src = `${user?.selectedImage ? user?.selectedImage : '/IMG/Dhruvin/myPerson.png'}` ;
                document.getElementById("ds_person_name").innerHTML = user?.fullName.split(" ")[0] || "";
                document.getElementById("ds_offcan_name").innerHTML = user?.fullName.split(" ")[0] || "";
                document.getElementById("ds_person_email").innerHTML = user?.email || "";
                document.getElementById("ds_offcan_email").innerHTML = user?.email || "";
                document.getElementById("ds_person_num").innerHTML = user?.phoneNumber || "";
                document.getElementById("ds_offcan_num").innerHTML = user?.phoneNumber || "";
                // Set gender correctly
                if (user?.gender == "Female") {
                    document.getElementById("female").checked = true;
                    selectGender("female"); 
                } else if (user?.gender == "Male") {
                    document.getElementById("male").checked = true;
                    selectGender("male");
                }


                const OrderId = document.getElementById("ds_Order")

                let FinalMap = [];
                if (select === "") {
                     FinalMap = user?.confirmedOrders || [];
                }
                else if (select == "all") {
                    FinalMap = user?.confirmedOrders
                }
                else {
                    FinalMap = user?.confirmedOrders?.filter((element) => element?.orderStatus == select) || [];
                }
                
                if(FinalMap?.length == 0) {
                    document.getElementById("ds_no_order").classList.remove("d-none")
                }
                else{
                    document.getElementById("ds_no_order").classList.add("d-none")
                }
                
                const html = FinalMap?.map((element)=>{
                      return `<div class="d-flex justify-content-between mt-4">
                                                    <div class="d-flex  justify-content-between w-100 align-items-center">
                                                        <div class="d-flex flex-wrap align-items-center">
                                                           <div class="${element?.orderStatus == 'pending' ? 'ds_order_round' : ''} ${element?.orderStatus == 'delivered' ? 'ds_order_round2' : ''} ${element?.orderStatus == 'cancelled' ? 'ds_order_round3' : ''} ${element?.orderStatus == 'return order' ? 'ds_order_round3' : ''} ds_order_round me-2"></div>
                                                               ${element?.orderStatus == 'pending' ? '<h5 class="mb-0 me-2 ds_order_text" style="color:#F8A120;">Order arriving</h5>' : ''}
                                                               ${element?.orderStatus == 'delivered' ? '<h5 class="mb-0 me-2 ds_order_color2 ds_order_text" >Order Delivered</h5>' : ''}
                                                               ${element?.orderStatus == 'cancelled' ? '<h5 class="mb-0 me-2 ds_order_color3 ds_order_text" >Order Cancelled</h5>' : ''}
                                                               ${element?.orderStatus == 'return order' ? '<h5 class="mb-0 me-2 ds_order_color3 ds_order_text" >Return Order</h5>' : ''}
                                                           <p class="mb-0 ds_muted align-self-end" style="font-size: 14px;">${element?.orderDate}</p>
                                                         </div>  
                                                               ${element?.orderStatus == 'pending' ? `<a href="/Dhruvin/OrderStatus(Processing).html" class="ds_color ds_order_anker ds_600" style="white-space: nowrap;" onclick="handleTrackOrderManageId('${element?.batchId}')">Track Order</a>` : ''}
                                                               ${element?.orderStatus == 'delivered' ? `<button class="ds_color text-decoration-underline ds_600 ds_order_anker "  style="white-space: nowrap;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="handleTrackOrderManageId('${element?.batchId}')"  >Submit Review</button>` : ''}
                                                               ${element?.orderStatus == 'cancelled' ? `<a href="./TrackRefund.html" class="ds_color ds_order_anker ds_600" style="white-space: nowrap;"  onclick="handleTrackOrderManageId('${element?.batchId}')">View refund status</a>` : ''}
                                                               ${element?.orderStatus == 'return order' ? `<button class="ds_color text-decoration-underline ds_600 ds_order_anker "  style="white-space: nowrap;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="handleTrackOrderManageId('${element?.batchId}')">Submit Review</button>` : ''}
                                                       </div>
                                                </div>
                                                ${element?.orders?.map((item)=>{
                                                    return  `<a href="${element?.orderStatus == 'delivered' ? '/Dhruvin/OrderStatus(Delivered).html' :'#'}" onclick="handleTrackOrderManageId('${element?.batchId}')" class="row align-items-center text-decoration-none ${element?.orderStatus == 'delivered' ? 'ds_cursor' :'ds_cur_text'}" >
                                                                 <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 mt-3">
                                                                    <div>
                                                                      <img src="${item?.image}" alt="" class="ds_order_img">
                                                                    </div>
                                                                 </div>
                                                                 <div class="col-xl-10 col-lg-9 col-md-12 col-sm-8 mt-lg-4 mt-3">
                                                                    <div class="row justify-content-between">
                                                                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                                                                          <div>
                                                                              <div class="d-flex justify-content-between">
                                                                                  <p class="ds_color ds_lh ds_order_txt">${item?.brand ? item?.brand : ''} ${item?.name}</p>
                                                                              </div>
                                                                              <p class="ds_muted ds_order_txt">Shade : <span class="ds_color">${item?.selectedColor ?  item?.selectedColor : 'No Color'}</span></p>
                                                                              <div class="d-flex justify-content-between">
                                                                                  <p class="ds_muted ds_order_txt">Qty : <span class="ds_color">X1</span></p>
                                                                                  <h5 class="text-md-end ds_color">$ ${item?.currentPrice}</h5>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                        
                                                                    </div>
                                                                </div>
                                                         </a>
                                                           <div class="ds_border mt-3"></div>
                                                         `
                                                }).join(" ")
                                            } `
                        }).join("")

                        OrderId.innerHTML = html ? html : ""
            }
        })
        .catch((error) => console.error("Error fetching user data:", error));
}

// Call function to load user data into form
getUserProfileData();



function handleImageUpload(event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(e) {
        let imageUrl = e.target.result; // Base64 format
        document.getElementById("profileImage").src = imageUrl;

        // If uploading to a real server, you need to send the image via a fetch request
        uploadImageToServer(file).then(url => {
            if (url) {
                imageUrl = url; // Use the uploaded image URL
            }
        });
    };
    reader.readAsDataURL(file);
}

function handleUpdateProfile(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    let First = document.getElementById("ds_edit_first").value.trim();
    let Last = document.getElementById("ds_edit_last").value.trim();
    let Mobile = document.getElementById("ds_edit_mobile").value.trim();
    let Email = document.getElementById("ds_edit_email").value.trim();
    let Date = document.getElementById("datePicker").value.trim();

    // Determine selected gender
    let gender = document.getElementById("female").checked ? "Female" : 
                 document.getElementById("male").checked ? "Male" : "Male";

                 console.log(gender);
                 

    function convertImageToBase64(imageFile, callback) {
        const reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result); // Get Base64 string
        };
        reader.readAsDataURL(imageFile);
    }

    if (selectedImage) {
        convertImageToBase64(selectedImage, function (base64String) {
            let updatedUserData = {
                id:passwordObj?.id,
                fullName: `${First} ${Last}`,
                email: Email,
                password: passwordObj?.password,
                dateOfBirth: Date,
                gender: gender,
                phoneNumber: Mobile,
                selectedImage: base64String, // Store Base64 image string
                addresses: passwordObj?.addresses ? passwordObj?.addresses : [],
                carddetails: passwordObj?.carddetails ? passwordObj?.carddetails : [],
                confirmedOrders:passwordObj?.confirmedOrders ? passwordObj?.confirmedOrders : [],
                orders:passwordObj?.orders ? passwordObj?.orders : [],
                wishlist:passwordObj?.wishlist ? passwordObj?.wishlist : []
            };

            

            // Send JSON data to JSON Server
            fetch(`http://localhost:3000/User/${userID}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUserData)
            })
            .then(response => response.json())
            .then(data => {
                alert("Profile updated successfully!");
                console.log("Updated User:", data);
            })
            .catch(error => console.error("Error updating profile:", error));
            
            getUserProfileData();
        });
    } else {
        // If no new image is selected, update profile without changing image
        let updatedUserData = {
            id:passwordObj?.id,
            fullName: `${First} ${Last}`,
            email: Email,
            password: passwordObj?.password,
            dateOfBirth: Date,
            gender: gender,
            phoneNumber: Mobile,
            selectedImage: passwordObj?.selectedImage ? passwordObj?.selectedImage : null, 
            addresses: passwordObj?.addresses ? passwordObj?.addresses : [],
            carddetails: passwordObj?.carddetails ? passwordObj?.carddetails : [],
            confirmedOrders:passwordObj?.confirmedOrders ? passwordObj?.confirmedOrders : [],
            orders:passwordObj?.orders ? passwordObj?.orders : [],
            wishlist:passwordObj?.wishlist ? passwordObj?.wishlist : []
        };

        fetch(`http://localhost:3000/User/${userID}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUserData)
        })
        .then(response => response.json())
        .then(data => {
            alert("Profile updated successfully!");
            console.log("Updated User:", data);
        })
        .catch(error => console.error("Error updating profile:", error));

        getUserProfileData();
    }
}


// **************** My Order **********
function handleTrackOrderManageId (id) {
    
   localStorage.setItem("MyBatchId" , id)
} 

////////// Submit Review ////////////
document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".ds_review_star");
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener("click", function () {
            selectedRating = this.getAttribute("data-value");
            highlightStars(selectedRating);
        });

        star.addEventListener("mouseover", function () {
            highlightStars(this.getAttribute("data-value"));
        });

        star.addEventListener("mouseleave", function () {
            highlightStars(selectedRating);
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute("data-value") <= rating) {
                star.classList.add("text-warning"); // Add active class
            } else {
                star.classList.remove("text-warning");
            }
        });
    }
});

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

function previewFile(event) {
    const file = event.target.files[0];
    if (file) {
        const preview = document.getElementById('preview');
        if (file.type.startsWith('image')) {
            preview.src = URL.createObjectURL(file);
            uploadFile(file);
        } else if (file.type.startsWith('video')) {
            preview.outerHTML = `<video controls width="100%"><source src="${URL.createObjectURL(file)}" type="${file.type}"></video>`;
        }
    }
}

async function uploadFile(file) {
    if (!file) return null;
    try {
        const base64String = await fileToBase64(file);
        return base64String;
    } catch (error) {
        console.error("Error converting file to Base64:", error);
        return null;
    }
}

async function handleSubmitReview() {
    const rating = document.querySelectorAll(".ds_review_star.text-warning").length;
    const title = document.querySelector("#ds_review_title").value.trim();
    const reviewText = document.querySelector("#ds_review_textarea").value.trim();
    const fileInput = document.querySelector("#ds_fileInput");
    const file = fileInput.files[0];

    // Validation checks
    if (rating === 0) {
        alert("Please select a rating.");
        return;
    }

    if (title.length < 5) {
        alert("Review title must be at least 5 characters long.");
        return;
    }

    if (reviewText.length < 20) {
        alert("Review text must be at least 20 characters long.");
        return;
    }

    if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm"];
        if (!validTypes.includes(file.type)) {
            alert("Invalid file format. Please upload an image (JPEG, PNG, GIF) or a video (MP4, WEBM).");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert("File size must be less than 5MB.");
            return;
        }
    }

    const BatchId = localStorage.getItem("MyBatchId")
    // Convert file to Base64
    const fileBase64 = file ? await uploadFile(file) : null;


    const confirmedOrders = Array.isArray(passwordObj?.confirmedOrders)
    ? [...passwordObj.confirmedOrders] 
    : [];

// Find the order with the matching batchId
const orderIndex = confirmedOrders.findIndex(order => order?.batchId === BatchId);

if (orderIndex !== -1) {
    // Update the review for the found order
    confirmedOrders[orderIndex].review = {
        rating: rating,
        title: title,
        reviewText: reviewText,
        image: fileBase64 || null
    };
} 


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
        confirmedOrders:confirmedOrders ? confirmedOrders : passwordObj?.confirmedOrders,
        orders:passwordObj?.orders ? passwordObj?.orders : [],
        wishlist:passwordObj?.wishlist ? passwordObj?.wishlist : []
    }

    fetch(`http://localhost:3000/User/${userID}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Review updated successfully!");
        console.log("Updated User:", data);
    })
    .catch(error => console.error("Error updating profile:", error));

    
}




// *********** My Address **********
var editId = "";

async function toggleDropdown(icon, id) {
    editId = id;
    console.log("sfwefgwefgwefgweg",editId);
    
    
    // Hide all other dropdowns
    document.querySelectorAll(".ds_add_dropdown").forEach(d => {
        d.classList.add("d-none");
    });

    // Select the dropdown related to the clicked icon
    let dropdown = icon.closest(".ds_pro_main").querySelector(".ds_add_dropdown");

    // Toggle the clicked dropdown
    if (dropdown) {
        dropdown.classList.toggle("d-none");
    }

    const response = await fetch(`http://localhost:3000/User/${userID}`,)
    const json = await response.json()
    const data = json?.addresses?.find((element)=> element.id == id)
    // console.log(data);

     document.getElementById("ds_add_edit_first").value = data?.firstName
     document.getElementById("ds_add_edit_last").value = data?.lastName
     document.getElementById("ds_add_edit_mobile").value = data?.mobileNumber
     document.getElementById("ds_add_edit_email").value = data?.email
     document.getElementById("ds_add_edit_zip").value = data?.zipCode
     document.getElementById("ds_add_edit_bilding").value = data?.address1
     document.getElementById("ds_add_edit_street").value = data?.address2
     document.getElementById("ds_add_edit_city").value = data?.city
     document.querySelector("select.ds_pro_input[name='ds_state']").value = data?.state || "";
     document.querySelector("select.ds_pro_input[name='ds_country']").value = data?.country || "";
     
    
}



// --- Gender Selection 
function selectGender(gender) {
    // Remove 'active' class from all gender options
    document.querySelectorAll('.gender-option').forEach(el => el.classList.remove('active'));

    // Get selected gender div
    let selectedDiv = document.getElementById(gender + "Option");

    if (selectedDiv) {
        selectedDiv.classList.add('active');

        // Set the corresponding input as checked
        let selectedInput = document.getElementById(gender);
        if (selectedInput) {
            selectedInput.checked = true;
        }
    }
}


let selectedAddressType = 'Home';

function selectAddressType(button, type, event) {
        event.preventDefault();

        // Reset button states
        document.querySelectorAll('.ds_add_popup_btn, .ds_add_non_select').forEach(btn => {
            btn.classList.remove('ds_add_popup_btn');
            btn.classList.add('ds_add_non_select');
        });

        // Highlight the selected button
        button.classList.remove('ds_add_non_select');
        button.classList.add('ds_add_popup_btn');

        // Set selected address type
        selectedAddressType = type;

        // Show or hide input field based on the selected address type
        const inputContainer = document.getElementById('ds_address_type');
        if (type === 'Other') {
            inputContainer.style.display = 'block'; // Show input field for 'Other'
        } else {
            inputContainer.style.display = 'none'; // Hide input field for other types
        }
}

// ---- get address
const addressId = localStorage.getItem("selectedAddressId")

async function getAddressData () {
   const response = await fetch('http://localhost:3000/User')
   const json = await response.json()
   if(json){
       const address = json.find((element)=> element.id == userID)       
       console.log("addreess" ,address);

       const noAddress = address?.addresses
       if(noAddress?.length == 0 || noAddress == undefined){
          document.querySelector("#ds_no_address").classList.add("d-block")
          document.querySelector("#ds_no_address").classList.remove("d-none")
       }
       else{
         document.querySelector("#ds_no_address").classList.add("d-none")
         document.querySelector("#ds_no_address").classList.remove("d-block")
       }

       const noOrder = address.confirmedOrders
       if(noOrder?.length == 0 || noOrder == undefined){
          document.querySelector("#ds_no_order").classList.add("d-block")
          document.querySelector("#ds_no_order").classList.remove("d-none")
       }
       else{
          document.querySelector("#ds_no_order").classList.add("d-none")
          document.querySelector("#ds_no_order").classList.remove("d-block")
       }

   
    //    console.log(noAddress.length);
       

      const html = address?.addresses?.map((element)=>{
        
        
        return (
            `<div class="col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 mt-3">
            <div class=" ${element.id == addressId ? "ds_active_border" : "ds_pro_inner"} ds_pro_main p-4 position-relative address-card" 
                 id="address_${element?.id}">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="ds_add_type ds_color ds_600">${element?.addressType}</div>
                    <i class="fa-solid fa-ellipsis-vertical" onclick="toggleDropdown(this, ${element?.id})" style="cursor: pointer;"></i>
                </div>
                <div class="ds_border mt-3 mb-3"></div>
                <div id="ds_add_dropdown" class="ds_add_dropdown d-none">
                    <p data-bs-toggle="modal" data-bs-target="#editModal" style="cursor: pointer;">Edit</p>
                    <p class="mb-0" data-bs-toggle="modal" data-bs-target="#deleteModal" style="cursor: pointer;">Delete</p>
                </div>
                <div class="ds_cursor" onclick="handleSelectAddress(${element?.id})">
                    <h5 class="mb-3">${element?.firstName} ${element?.lastName}</h5>
                    <h6 class="mb-3">+1 ${element?.mobileNumber}</h6>
                    <p class="mb-0 ds_lh">${element?.address2} , ${element?.address1} , ${element?.city} , ${element?.state} , ${element?.country}</p>
                </div>
            </div>
          </div>`
        )
      }).join("")

     document.getElementById("ds_show_address").innerHTML = html ? html : ""
    
       
   }   
}
 getAddressData()

 function handleSelectAddress(id) {
    // Remove border from all address cards
    document.querySelectorAll(".address-card").forEach(card => {
        card.classList.remove("ds_active_border");
        card.classList.add("ds_pro_inner");
    });

    // Add border to the selected address
    const selectedCard = document.getElementById(`address_${id}`);
    if (selectedCard) {
        selectedCard.classList.add("ds_active_border");
        selectedCard.classList.remove("ds_pro_inner");
    }

    // Store selected address ID in localStorage
    localStorage.setItem("selectedAddressId", id);
}

// ------ add address popup

// const form = document.querySelector('#ds_add_new'); 
 
// form.addEventListener('submit', async function(event) { 
//   event.preventDefault(); 
//   // Your form submission logic here 

//   let firstName = document.getElementById("ds_add_first")?.value.trim();
//   let lastName = document.getElementById("ds_add_last")?.value.trim();
//   let mobile = document.getElementById("ds_add_mobile")?.value.trim();
//   let email = document.getElementById("ds_add_email")?.value.trim();
//   let zip = document.getElementById("ds_add_zip")?.value.trim();
//   let address = document.getElementById("ds_add_bilding")?.value.trim();
//   let address2 = document.getElementById("ds_add_street")?.value.trim();
//   let city = document.getElementById("ds_add_city")?.value.trim();
//   let state = document.querySelector("select.ds_pro_input[name='state']")?.value;
//   let country = document.querySelector("select.ds_pro_input[name='country']")?.value;
//   let otherAddress = document.getElementById("ds_address_type_input")?.value.trim();

//   let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   let mobilePattern = /^\d{10}$/;
//   let zipPattern = /^\d{5,}$/;


//   // Validation checks
//   if (!firstName || !lastName || !mobilePattern.test(mobile) || !emailPattern.test(email) ||
//       !zipPattern.test(zip) || !address || !city || !state || !country || !selectedAddressType) {
//       alert("Please fill all required fields correctly.");
//       return;
//   }

//   if (selectedAddressType === "Other" && !otherAddress) {
//       alert("Please enter an Address Type for 'Other'");
//       return;
//   }

//   // Collect the address data
//   const addressData = {
//       id: Date.now(), 
//       firstName: firstName,
//       lastName: lastName,
//       mobileNumber: mobile,
//       email: email,
//       zipCode: zip,
//       address1: address,
//       address2: address2 || "",
//       city: city,
//       state: state,
//       country: country,
//       addressType: selectedAddressType,
//       otherType: otherAddress || ""
//   };

//   // Send the address data to the backend
//   try {
//       // This should be dynamically fetched based on the logged-in user
//       const userResponse = await fetch(`http://localhost:3000/User/${userID}`);
//       const userData = await userResponse.json();

//       if (!userData.addresses) {
//           userData.addresses = []; // Initialize addresses array if not already present
//       }

//       // Add the new address to the user's addresses
//       userData.addresses.push(addressData);

//       // Update the user data in the database (db.json)
//       await fetch(`http://localhost:3000/User/${userID}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(userData)
//       });

//       alert("Address saved successfully!");

//       // Close the modal 
//       $('#addressModal').hide();
//       $('.modal-backdrop').remove(); // Remove the backdrop

//   } catch (error) {
//       console.error("Error while saving address: ", error);
//       alert("Failed to save address.");
//   }

//   getAddressData()
// }); 

async function handleAddress(event) {
    // event.stopPropagation();
    event.preventDefault();

    let firstName = document.getElementById("ds_add_first")?.value.trim();
    let lastName = document.getElementById("ds_add_last")?.value.trim();
    let mobile = document.getElementById("ds_add_mobile")?.value.trim();
    let email = document.getElementById("ds_add_email")?.value.trim();
    let zip = document.getElementById("ds_add_zip")?.value.trim();
    let address = document.getElementById("ds_add_bilding")?.value.trim();
    let address2 = document.getElementById("ds_add_street")?.value.trim();
    let city = document.getElementById("ds_add_city")?.value.trim();
    let state = document.querySelector("select[name='state']")?.value;
    let country = document.querySelector("select[name='country']")?.value;
    let otherAddress = document.getElementById("ds_address_type_input")?.value.trim();

    // Ensure the selected address type is captured
    let selectedAddressType = document.querySelector(".ds_add_popup_btn, .ds_add_non_select.active")?.innerText || "";
    
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/;
    let zipPattern = /^\d{5,}$/;


    // Validation checks
    if (!firstName || !lastName || !mobilePattern.test(mobile) || !emailPattern.test(email) ||
      !zipPattern.test(zip) || !address || !city || !state || !country || !selectedAddressType) {
      alert("Please fill all required fields correctly.");
      return;
    }

    if (selectedAddressType === "Other" && !otherAddress) {
      alert("Please enter an Address Type for 'Other'");
      return;
    }


    // Collect the address data
    const addressData = {
      id: Date.now(),
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobile,
      email: email,
      zipCode: zip,
      address1: address,
      address2: address2 || "",
      city: city,
      state: state,
      country: country,
      addressType: selectedAddressType,
      otherType: otherAddress || ""
    };

    try {
        // Fetch current user data
        const userResponse = await fetch(`http://localhost:3000/User/${userID}`);
        const userData = await userResponse.json();

      if (!userData.addresses) {
        userData.addresses = []; // Initialize addresses array if not already present
      }

        // Add new address
        userData.addresses.push(addressData);

        // Update user data in the backend
        await fetch(`http://localhost:3000/User/${userID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        $('#addressModal').modal('hide');

      alert("Address saved successfully!");

        // Close the modal properly

        // Refresh address list
        getAddressData();
    } catch (error) {
      console.error("Error while saving address: ", error);
      alert("Failed to save address.");
    }

    
}


// ------ Edit address popup
async function handleEditAddress(event) {
    event.preventDefault();
    // event.stopPropagation();

    let firstName = document.getElementById("ds_add_edit_first")?.value.trim();
    let lastName = document.getElementById("ds_add_edit_last")?.value.trim();
    let mobile = document.getElementById("ds_add_edit_mobile")?.value.trim();
    let email = document.getElementById("ds_add_edit_email")?.value.trim();
    let zip = document.getElementById("ds_add_edit_zip")?.value.trim();
    let address = document.getElementById("ds_add_edit_bilding")?.value.trim();
    let address2 = document.getElementById("ds_add_edit_street")?.value.trim();
    let city = document.getElementById("ds_add_edit_city")?.value.trim();
    let state = document.querySelector("select.ds_pro_input[name='ds_state']")?.value;
    let country = document.querySelector("select.ds_pro_input[name='ds_country']")?.value;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/;
    let zipPattern = /^\d{5,}$/;

    if (!firstName) return alert("First Name is required");
    if (!lastName) return alert("Last Name is required");
    if (!mobilePattern.test(mobile)) return alert("Enter a valid 10-digit Mobile Number");
    if (!emailPattern.test(email)) return alert("Enter a valid Email Address");
    if (!zipPattern.test(zip)) return alert("Enter a valid ZIP / Postal Code (at least 5 digits)");
    if (!address) return alert("Address is required");
    if (!city) return alert("City is required");
    if (!state || state === "State") return alert("Please select a State");
    if (!country || country === "Country") return alert("Please select a Country");

    const addressData = {
        id: editId,
        firstName,
        lastName,
        mobileNumber: mobile,
        email,
        zipCode: zip,
        address1: address,
        address2: address2 || "",
        city,
        state,
        country,
        addressType: selectedAddressType
    };

    try {
        const response = await fetch(`http://localhost:3000/User/${userID}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        userData.addresses = userData.addresses || []; 

        const existingIndex = userData.addresses.findIndex(addr => addr.id === editId);
        if (existingIndex !== -1) {
            userData.addresses[existingIndex] = addressData;
        } else {
            userData.addresses.push(addressData);
        }

        await fetch(`http://localhost:3000/User/${userID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        // Close the modal
        $('#editModal').modal('hide'); 
        $('.modal-backdrop').remove();

        // Dynamically update the UI
        await getAddressData(); 

    } catch (error) {
        console.error("Error while saving address: ", error);
        alert("Failed to save address.");
    }
    
}


// ---- Delete Address Popup
async function handleDeleteAddress (event) {
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:3000/User/${userID}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        
        const userData = await response.json();
        userData.addresses = userData.addresses || []; // Ensure addresses array exists
        
        // Find the address to delete
        const existingIndex = userData.addresses.findIndex(addr => addr.id == editId);
        if (existingIndex !== -1) {
            // Remove the address from the array
            userData.addresses.splice(existingIndex, 1);
        } else {
            return alert("Address not found");
        }

        // Update the user data
        await fetch(`http://localhost:3000/User/${userID}`, {
            method: 'PUT',  // We use 'PUT' because we are updating the user's data
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        alert("Address deleted successfully!");
        $('#deleteModal').modal('hide');
        $('.modal-backdrop').remove();

    } catch (error) {
        console.error("Error while deleting address: ", error);
        alert("Failed to delete address.");
    }

    getAddressData()

}


// *********** Change Password **********
function togglePasswordVisibility(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }    
}

function handlePasswordCancel () {
     document.getElementById("oldPassword").value = ""
     document.getElementById("newPassword").value = ""
     document.getElementById("confirmPassword").value = ""
}

async function handleResetPasswordFunction() {
    let oldPass = document.getElementById("oldPassword").value.trim();
    let newPass = document.getElementById("newPassword").value.trim();
    let confirmPass = document.getElementById("confirmPassword").value.trim();

    // Assume passwordObj contains user data
    if (!passwordObj || !passwordObj.password) {
        alert("User data not found. Please log in again.");
        return;
    }

    // Check if old password is correct
    if (oldPass !== passwordObj.password) {
        alert("Old password is incorrect!");
        return;
    }

    // Password strength check
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPass)) {
        alert("New password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.");
        return;
    }

    // Check if new password and confirm password match
    if (newPass !== confirmPass) {
        alert("New password and confirm password do not match!");
        return;
    }

    // Prevent setting the same password again
    if (newPass === oldPass) {
        alert("New password cannot be the same as the old password!");
        return;
    }

    // Ensure user ID is available
    let userID = passwordObj.id;
    if (!userID) {
        alert("User ID is missing. Please log in again.");
        return;
    }

    try {
        let updatedUserData = {
            id: passwordObj?.id,
            fullName: passwordObj?.fullName,
            email: passwordObj?.email,
            password: newPass,
            dateOfBirth:passwordObj?.dateOfBirth,
            gender:passwordObj?.gender,
            phoneNumber: passwordObj?.phoneNumber,
            selectedImage:passwordObj?.selectedImage,
            addresses:passwordObj?.addresses ? passwordObj?.addresses : [],
            carddetails: passwordObj?.carddetails ? passwordObj?.carddetails : [],
            confirmedOrders: passwordObj?.confirmedOrders ? passwordObj?.confirmedOrders : [],
            orders:passwordObj?.orders ? passwordObj?.orders : [],
            wishlist:passwordObj?.wishlist ? passwordObj?.wishlist : []
        };
        
        const response = await fetch(`http://localhost:3000/User/${userID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUserData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        alert("Password changed successfully!");
        console.log("Password updated for user:", userID);
        
        // Optionally, update local user data (if stored in passwordObj)
        passwordObj.password = newPass;
    } catch (error) {
        alert("Failed to update password. " + error.message);
    }
}


// Hide dropdowns when clicking outside
document.addEventListener("click", function (event) {
    if (!event.target.closest(".fa-ellipsis-vertical")) {
        document.querySelectorAll(".ds_add_dropdown").forEach(d => d.classList.add("d-none"));
    }
});


// <!-- -------------- Deactivate  Account Popup  -------------- -->

const otpField2 = document.querySelectorAll('.ds_deactivate_otp');

otpField2.forEach((field, index) => {
    field.addEventListener('input', (e) => {
        let value = e.target.value;
        
        // Ensure only a single digit is entered
        e.target.value = value.replace(/\D/g, '').slice(0, 1);

        // Move to next field if a digit is entered
        if (e.target.value && index < otpField2.length - 1) {  // Fix here
            otpField2[index + 1].focus();
        }
    });

    field.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !field.value && index > 0) {
            otpField2[index - 1].focus();  // Fix here
        }
    });
});



function handleDeactiveSendOtp() {
    
    let mobileInput = document.getElementById("ds_deactive_input")?.value
    // console.log(passwordObj?.phoneNumber == mobileInput);
    // console.log("zzzzzzzzzzzz" ,passwordObj);

    
    let mobilePattern = /^\+?[1-9]\d{9,14}$/; // Ensures at least 10 digits

    // Check if the input is valid
    if (!mobilePattern.test(mobileInput)) {
        return alert("Please enter a valid mobile number with at least 10 digits.");
    }

    // Check if the input matches the stored phone number
    if (passwordObj?.phoneNumber == mobileInput) {
        return alert("Your OTP is: 123456");
    }

    alert("Your Number Is Wrong !")

    // Proceed with sending OTP logic...
}

async function handleDeactive(event) {
    event.preventDefault();
    let otpInputs = document.querySelectorAll(".ds_deactivate_otp");
    let enteredOtp = Array.from(otpInputs).map(input => input.value).join('');

    if (enteredOtp !== "123456") {  // Simulate OTP validation (replace with actual API)
        alert("Invalid OTP. Please try again.");
        return;
    }

    // Clear OTP input fields
    document.getElementById("ds_deactive_input").value = "";
    otpInputs.forEach(input => input.value = "");

    let userID = localStorage.getItem("userId");  // Ensure userID is defined
    console.log("UserID:", userID);

    try {
        let response = await fetch(`http://localhost:3000/User/${userID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        window.location.href = "../Akshay/home.html"
        alert("Account deactivated successfully!"); 

        $('#deactivateModal').modal('hide'); 
        $('.modal-backdrop').remove();

        localStorage.removeItem("userId");

        localStorage.clear()

    } catch (error) {
        alert(error);
    }
}



// ************ Log Out ***********

function handleLogOut () {
    localStorage.removeItem("userId")
    window.location.href = "/Akshay/home.html"
}


function setupAddressSelection() {
    const addressDivs = document.querySelectorAll(".V_select_add1");
    const changeButtons = document.querySelectorAll(".V_change");

    // Function to handle selection
    function selectAddress(element) {
        // Remove "selected_border" class from all addresses
        addressDivs.forEach(item => item.classList.remove("selected_border"));

        // Find the closest address div
        const addressDiv = element.closest(".V_select_add1");
        if (!addressDiv) return;

        // Add "selected_border" class to the clicked address
        addressDiv.classList.add("selected_border");

        // Store the selected address ID in localStorage
        const selectedAddressId = addressDiv.getAttribute("data-address-id");
        localStorage.setItem("selectedAddressId", selectedAddressId);
        console.log("Selected Address ID stored:", selectedAddressId);
    }

    // Attach event listener to all address divs
    addressDivs.forEach(div => {
        div.addEventListener("click", function () {
            selectAddress(this);
        });
    });

    // Attach event listener to all change buttons
    changeButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent the event from bubbling to parent
            selectAddress(this);
        });
    });
}